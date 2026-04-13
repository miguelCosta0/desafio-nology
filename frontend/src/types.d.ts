export type TClientType = 'common' | 'vip';

export type TCalculationsHistory = {
    user_ip: string,
    vip_customer: boolean,
    price: number,
    cashback: number,
    calc_date: string,
}