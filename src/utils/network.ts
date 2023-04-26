import CryptoJS from 'crypto-js';
import { v4 as uuid } from 'uuid';
import type {
  BuySuccess,
  ErrorResponse,
  LoadResponse,
  Purchaser,
  TicketType,
} from '@/components/models';

declare function GM_xmlhttpRequest(details: {
  fetch?: boolean;
  method: string;
  responseType: 'json' | 'text';
  url: string;
  onload: (res: LoadResponse) => void;
  onerror: (error: ErrorResponse) => void;
}): void;

function getCrypto(ticketTypeId: number) {
  const keyStart = atob('MngwNTJBMEExdTIyMg==');
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
  const KeyEnd = atob('MnNGUnM=');
  return {
    nonce: randomStr,
    timeStamp: seconds,
    sign: CryptoJS.MD5(keyStart + seconds + randomStr + ticketTypeId + KeyEnd),
  };
}

function htmlToElement(html: string) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild as HTMLElement;
}

const buyTicketAlipay = (ticketTypeId: number, purchaserIds: number[]) => {
  const { nonce, timeStamp, sign } = getCrypto(ticketTypeId);
  const url =
    'https://www.allcpp.cn/allcpp/ticket/buyTicketAlipay.do?' +
    `ticketTypeId=${ticketTypeId}&` +
    `count=${purchaserIds.length}&` +
    `nonce=${nonce}&` +
    `timeStamp=${timeStamp}&` +
    `sign=${sign}&` +
    `purchaserIds=${purchaserIds.join()}`;
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
          (<{ ticketTypeList: TicketType[] }>response).ticketTypeList.map(
            (ticketType: TicketType) => ({
              id: ticketType.id,
              name: ticketType.ticketName,
              limit: ticketType.purchaseNum,
              price: (ticketType.ticketPrice / 100).toFixed(2),
              remain: ticketType.remainderNum,
              validate: ticketType.realnameAuth,
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

export { buyTicketAlipay, getPurchaserList, getTicketList };
