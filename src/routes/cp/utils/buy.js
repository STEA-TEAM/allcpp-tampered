import CryptoJS from 'crypto-js';
import { v4 as uuid } from 'uuid';

function o() {
  // noinspection ES6ConvertVarToLetConst
  for (
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

function getMd5(e) {
  return CryptoJS.MD5(e);
}

function getCrypto() {
  let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    t = 'MngwNTJBMEExdTIyMg==',
    n = 'MnNGUnM=',
    r,
    i = o();
  try {
    r = Math.round(new Date() / 1e3);
  } catch (c) {
    r = Math.round(new Date().getTime() / 1e3);
  }
  t = atob(t);
  n = atob(n);
  return { nonce: i, timeStamp: r, sign: getMd5(t + r + i + e + n) };
}

function htmlToElement(html) {
  const template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

const buyTicketAlipay = (ticketTypeId, purchaserIds) => {
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
        if (
          response.hasOwnProperty('result') &&
          response.result.hasOwnProperty('body')
        ) {
          resolve();
          const form = htmlToElement(response.result.body);
          form.id = uuid();
          document.body.appendChild(form);
          document.getElementById(form.id).submit();
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

export { buyTicketAlipay };
