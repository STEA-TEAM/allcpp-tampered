import { MD5 } from 'crypto-js';
import { v4 as uuid } from 'uuid';
import type {
  BuySuccess,
  ErrorResponse,
  LoadResponse,
  Purchaser,
  Ticket,
  TicketType,
} from '@/components/models';
import { htmlToElement } from '@/utils/dom';

declare function GM_xmlhttpRequest(details: {
  fetch?: boolean;
  method: string;
  responseType: 'json' | 'text';
  url: string;
  onload: (res: LoadResponse) => void;
  onerror: (error: ErrorResponse) => void;
}): void;

const keyStart = atob('MngwNTJBMEExdTIyMg==');
const KeyEnd = atob('MnNGUnM=');

function getCrypto(ticketTypeId: number) {
  const seconds = Math.round(new Date().getTime() / 1e3);
  const randomStr = (() => {
    const stringList = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let result = '';
    for (let a = 0; a < 32; a++) {
      result += stringList.charAt(
        Math.floor(Math.random() * stringList.length)
      );
    }
    return result;
  })();
  return {
    nonce: randomStr,
    timeStamp: seconds,
    sign: MD5(keyStart + seconds + randomStr + ticketTypeId + KeyEnd),
  };
}

const buyTicketAlipay = (
  ticketTypeId: number,
  ticketCount?: number,
  purchaserIds?: number[]
) => {
  const { nonce, timeStamp, sign } = getCrypto(ticketTypeId);
  let url =
    'https://www.allcpp.cn/allcpp/ticket/buyTicketAlipay.do?' +
    `ticketTypeId=${ticketTypeId}&` +
    `count=${ticketCount ?? purchaserIds?.length}&` +
    `nonce=${nonce}&` +
    `timeStamp=${timeStamp}&` +
    `sign=${sign}`;
  if (!ticketCount && purchaserIds && purchaserIds.length > 0) {
    url += `&purchaserIds=${purchaserIds.join()}`;
  }
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      fetch: true,
      method: 'POST',
      responseType: 'json',
      url: url,
      onload: ({ response }) => {
        if ((<BuySuccess>response)?.result?.body) {
          response = <BuySuccess>response;
          resolve(undefined);
          const form = htmlToElement(response.result.body);
          form.id = uuid();
          document.body.appendChild(form);
          (document.getElementById(form.id) as HTMLFormElement)?.submit();
        } else {
          reject(response);
        }
      },
      onerror: (error) => {
        reject(error);
      },
    });
  });
};

const getPurchaserList = () => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      fetch: true,
      method: 'GET',
      responseType: 'json',
      url: 'https://www.allcpp.cn/allcpp/user/purchaser/getList.do',
      onload: ({ response }) => {
        resolve(
          (<Purchaser[]>response).map(
            (purchaser: { id: number; realname: string }) => ({
              id: purchaser.id,
              label: purchaser.realname,
            })
          )
        );
      },
      onerror: (error) => {
        reject(error);
      },
    });
  });
};

const getTicketList = (eventMainId: number) => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      fetch: true,
      method: 'GET',
      responseType: 'json',
      url: `https://www.allcpp.cn/allcpp/ticket/getTicketTypeList.do?eventMainId=${eventMainId}`,
      onload: ({ response }) => {
        resolve(
          <Ticket[]>(<{ ticketTypeList: TicketType[] }>(
            response
          )).ticketTypeList.map((ticketType: TicketType) => ({
            id: ticketType.id,
            name: ticketType.ticketName,
            limit: ticketType.purchaseNum,
            price: ticketType.ticketPrice / 100,
            remain: ticketType.remainderNum,
            validate: ticketType.realnameAuth,
          }))
        );
      },
      onerror: (error) => {
        reject(error);
      },
    });
  });
};

export { buyTicketAlipay, getPurchaserList, getTicketList };
