import request from '../utils/http'

export function initShopcarData(){
    return request('/shopcardata')
}