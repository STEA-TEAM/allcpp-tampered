import type { BuyFailure, ErrorResponse } from '@/components/models';

export const getErrorMessage = (error: BuyFailure | ErrorResponse | string) => {
  let errorMessage = '未知错误';
  errorMessage = (<BuyFailure>error).message ?? errorMessage;
  errorMessage = (<ErrorResponse>error).statusText ? '请求失败' : errorMessage;
  errorMessage =
    typeof error === 'string' &&
    error.includes('由于访问人数太多导致服务器压力过大')
      ? '服务器压力过大，请您稍后再试。'
      : errorMessage;
  return errorMessage;
};
