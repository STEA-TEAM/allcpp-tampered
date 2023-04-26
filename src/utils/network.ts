import CryptoJS from 'crypto-js';
import { v4 as uuid } from 'uuid';

declare function GM_xmlhttpRequest(details: {
  fetch?: boolean;
  method: string;
  responseType: 'json' | 'text';
  url: string;
  onload: (response: { response: any }) => void;
  onerror: (error: any) => void;
}): void;

function o() {
  for (
    // eslint-disable-next-line prefer-rest-params,no-var
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 32,
      t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
      n = t.length,
      r = '',
      a = 0;
    a < e;
    a++
  )
    r += t.charAt(Math.floor(Math.random() * n));
  return r;
}

function getCrypto() {
  // eslint-disable-next-line prefer-rest-params,prefer-const
  let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    t = 'MngwNTJBMEExdTIyMg==',
    n = 'MnNGUnM=',
    r,
    // eslint-disable-next-line prefer-const
    i = o();
  try {
    // @ts-ignore
    r = Math.round(new Date() / 1e3);
  } catch (c) {
    r = Math.round(new Date().getTime() / 1e3);
  }
  t = atob(t);
  n = atob(n);
  return { nonce: i, timeStamp: r, sign: CryptoJS.MD5(t + r + i + e + n) };
}

function htmlToElement(html: string) {
  const template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild as HTMLElement;
}

const buyTicketAlipay = (ticketTypeId: number, purchaserIds: number[]) => {
  // @ts-ignore
  const { nonce, timeStamp, sign } = getCrypto(ticketTypeId);
  const url =
    `https://www.allcpp.cn/allcpp/ticket/buyTicketAlipay.do?` +
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
        if (response.result && response.result.body) {
          resolve(undefined);
          const form = htmlToElement(response.result.body);
          form.id = uuid();
          document.body.appendChild(form);
          (document.getElementById(form.id) as HTMLFormElement)!.submit();
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
          response.map((purchaser: { id: number; realname: string }) => ({
            id: purchaser.id,
            label: purchaser.realname,
          }))
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
          response['ticketTypeList'].map(
            (ticketType: {
              id: number;
              ticketName: string;
              purchaseNum: number;
              ticketPrice: number;
              remainderNum: number;
              realnameAuth: boolean;
            }) => ({
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
