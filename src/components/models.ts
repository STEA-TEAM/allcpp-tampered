export interface Purchaser {
  id: number;
  realname: string;
  idcard: string;
  mobile: string;
  validType: number;
}

export interface TicketMain {
  id: number;
  name: string;
  eventName: string;
  description: string;
  eventDescription: string;
  coverPicId: number;
  coverPicUrl: string;
  picId: number;
  priority: number;
  enabled: number;
  eventMainId: number;
  type: number;
  createTime: number;
  updateTime: number;
  confirmableVO?: string;
}

export interface Ticket {
  id: number;
  name: string;
  limit: number;
  price: number;
  remain: number;
  validate: boolean;
}

export interface TicketType {
  id: number;
  ticketName: string;
  purchaseNum: number;
  ticketPrice: number;
  remainderNum: number;
  realnameAuth: boolean;
}

export interface BuyFailure {
  errorCode: number;
  message: string;
  isSuccess: boolean;
}

export interface BuySuccess {
  result: {
    body: string;
  };
}

export type LoadResponse = {
  response:
    | BuyFailure
    | BuySuccess
    | Purchaser[]
    | { ticketTypeList: TicketType[] };
};

export type ErrorResponse = {
  statusText: string;
};
