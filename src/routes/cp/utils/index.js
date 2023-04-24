const getPurchaserList = () => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      fetch: true,
      method: 'GET',
      responseType: 'json',
      url: 'https://www.allcpp.cn/allcpp/user/purchaser/getList.do',
      onload: ({ response }) => {
        resolve(
          response.map((purchaser) => ({
            id: purchaser['id'],
            label: purchaser['realname'],
          }))
        );
      },
      onerror: (error) => {
        reject(error);
      },
    });
  });
};

const getTicketList = (eventMainId) => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      fetch: true,
      method: 'GET',
      responseType: 'json',
      url: `https://www.allcpp.cn/allcpp/ticket/getTicketTypeList.do?eventMainId=${eventMainId}`,
      onload: ({ response }) => {
        resolve(
          response['ticketTypeList'].map((ticketType) => ({
            id: ticketType['id'],
            name: ticketType['ticketName'],
            limit: ticketType['purchaseNum'],
            price: (ticketType['ticketPrice'] / 100).toFixed(2),
            remain: ticketType['remainderNum'],
            validate: ticketType['realnameAuth'],
          }))
        );
      },
      onerror: (error) => {
        reject(error);
      },
    });
  });
};

export { getPurchaserList, getTicketList };
