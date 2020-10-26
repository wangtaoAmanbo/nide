const rp = require('request-promise');
const _ = require('lodash');

module.exports = class extends think.Service {
  async getFreight(addressId,userId) {
    let checkedAddress = null;
  

    //先查询默认地址
    if (addressId > 0) {
      checkedAddress = await this.model('address').where({is_default: 1, user_id: userId}).find();
    } 
    //无默认地址，再查询非默认地址
    if (think.isEmpty(checkedAddress)) {
      checkedAddress = await this.model('address').where({id: addressId, user_id: userId}).find();
    }

    if (!think.isEmpty(checkedAddress)) {
      checkedAddress.province_name = await this.model('region').getRegionName(checkedAddress.province_id);
      checkedAddress.city_name = await this.model('region').getRegionName(checkedAddress.city_id);
      checkedAddress.district_name = await this.model('region').getRegionName(checkedAddress.district_id);
      //checkedAddress.full_region = checkedAddress.province_name + checkedAddress.city_name + checkedAddress.district_name;
    }

    //const cartData = await think.app.Controller.cart.getCart();
    const cartData = await this.controller('cart').getCart();


    let freightPrice = 0.00,arr=[2,3,4,5,6,7,8,9,10,16,22,27,28,29,30,31,32],checkedGoodsCount = cartData.cartTotal.checkedGoodsCount;
    if(checkedAddress.city_id == 233 || checkedAddress.city_name == '深圳市'){
      freightPrice = 6+(checkedGoodsCount-1)*4;      //市内 基础运费6元
      if(freightPrice > 40){
        freightPrice = 40
      }
    }else if( arr.indexOf(checkedAddress.province_id) >-1 ){
      freightPrice = 12+(checkedGoodsCount-1)*6;     //市外较远 基础运费12元
      if(freightPrice > 60){
        freightPrice = 70
      }
    }else{
      freightPrice = 10+(checkedGoodsCount-1)*5;     //市外较近 基础运费10元
      if(freightPrice > 60){
        freightPrice = 60
      }
    }
    return freightPrice
  }



};
