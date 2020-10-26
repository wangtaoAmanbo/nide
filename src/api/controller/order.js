const Base = require('./base.js');
const moment = require('moment');

module.exports = class extends Base {
  /**
   * 获取订单列表
   * @return {Promise} []
   */
  async listAction() {
    const model = this.model('order')
    const orderList = await model.where({ user_id: this.getLoginUserId() }).order({id:'desc'}).page(1, 10).countSelect();
    //console.log(orderList);
    const newOrderList = [];
    for (const item of orderList.data) {
      // 订单的商品
      item.goodsList = await this.model('order_goods').where({ order_id: item.id }).select();
      item.goodsCount = 0;
      item.goodsList.forEach(v => {
        item.goodsCount += v.number;
      });

      if (item.order_status === 0) {
        //const currentTime = parseInt(this.getTime() / 1000); 
        const currentTime = this.getTime()
        const final_pay_time = item.add_time+1800

        if (currentTime > final_pay_time ) {
          item.order_status = 101
          await model.where({  id: item.id }).update({order_status:101})
        } 
      
      }

      // 订单状态的处理
      item.order_status_text = await this.model('order').getOrderStatusText(item.id);

      // 可操作的选项
      item.handleOption = await this.model('order').getOrderHandleOption(item.id);
      item.cc = 'wt1';

      newOrderList.push(item);

    }
    orderList.data = newOrderList;
   // let dn = Date.now(),ymd = think.datetime(dn, 'YYYY-MM-DD HH:mm:ss'); 
    //console.log(dn);  // 1568946568127   2019-09-20 10:29:28

    //let ymd = think.datetime(1568946568127, 'YYYY-MM-DD HH:mm:ss')
    //console.log(ymd);   //2019-09-20 10:29:28

    //let ymd = think.datetime(1568946568127+1800*1000, 'YYYY-MM-DD HH:mm:ss')
    //console.log(ymd);    // 2019-09-20 10:59:28

    return this.success(orderList);
  }

  async detailAction() {
    const orderId = this.get('orderId');
    const model = this.model('order')
    const orderInfo = await model.where({ user_id: this.getLoginUserId(), id: orderId }).find();

    if (think.isEmpty(orderInfo)) {
      return this.fail('订单不存在');
    }

    orderInfo.province_name = await this.model('region').where({ id: orderInfo.province }).getField('name', true);
    orderInfo.city_name = await this.model('region').where({ id: orderInfo.city }).getField('name', true);
    orderInfo.district_name = await this.model('region').where({ id: orderInfo.district }).getField('name', true);
    orderInfo.full_region = orderInfo.province_name + orderInfo.city_name + orderInfo.district_name;

    // const latestExpressInfo = await this.model('order_express').getLatestOrderExpress(orderId);
    // orderInfo.express = latestExpressInfo;

    const orderGoods = await this.model('order_goods').where({ order_id: orderId }).select();

    // 订单状态的处理
    orderInfo.order_status_text = await this.model('order').getOrderStatusText(orderId);
     /*orderInfo.add_time = moment.unix(orderInfo.add_time).format('YYYY-MM-DD HH:mm:ss');
    orderInfo.final_pay_time = moment('001234', 'Hmmss').format('mm:ss');
    // 订单最后支付时间
   if (orderInfo.order_status === 0) {
      // if (moment().subtract(60, 'minutes') < moment(orderInfo.add_time)) {
      orderInfo.final_pay_time = moment('001234', 'Hmmss').format('mm:ss');
      // } else {
      //     //超过时间不支付，更新订单状态为取消
      // }
    }*/

    //console.log(Date.now());      //1568971343376  
    //console.log(think.datetime(Date.now(), 'YYYY-MM-DD HH:mm:ss'))      //2019-09-20 17:22:23
  
    /*if (orderInfo.order_status === 0) {
      //const currentTime = parseInt(this.getTime() / 1000); 
      const currentTime = this.getTime()
      const final_pay_time = orderInfo.add_time+1800
      //const final_pay_time = think.datetime(orderInfo.add_time*1000+1800*1000, 'YYYY-MM-DD HH:mm:ss')
      //let ymd = think.datetime(1568946568127+1800*1000, 'YYYY-MM-DD HH:mm:ss')
      if (currentTime < final_pay_time) {
        orderInfo.final_pay_time = think.datetime(final_pay_time*1000, 'YYYY-MM-DD HH:mm:ss')
      } else {
           //超过时间不支付，更新订单状态为取消
           orderInfo.order_status = 101
           await model.where({  id: orderId }).update({order_status:101})
      }
      //console.log(orderInfo.add_time)
      //console.log(final_pay_time*1000)

      //console.log(think.datetime(orderInfo.add_time*1000, 'YYYY-MM-DD HH:mm:ss'))
      //console.log(think.datetime(final_pay_time*1000, 'YYYY-MM-DD HH:mm:ss'))
      //console.log(orderInfo.final_pay_time)

    }*/
    orderInfo.add_time = moment.unix(orderInfo.add_time).format('YYYY-MM-DD HH:mm:ss');

    // 订单可操作的选择,删除，支付，收货，评论，退换货
    const handleOption = await this.model('order').getOrderHandleOption(orderId);

    return this.success({
      orderInfo: orderInfo,
      orderGoods: orderGoods,
      handleOption: handleOption
    });
  }

  async cancelAction() {
    const model = this.model('order')
    const orderId = this.get('orderId');
    const orderInfo = await model.where({ user_id: this.getLoginUserId(), id: orderId }).find();
    orderInfo.order_status = 101
    //console.log(orderInfo);
    await model.where({  id: orderId }).update(orderInfo)
    //let status = ''
    let data ={orderStatus:101,message:'已取消订单'}
    return this.success(data);
  }

  async receiptAction() {
    const model = this.model('order')
    const orderId = this.get('orderId');
    await model.where({  user_id: this.getLoginUserId(),id: orderId }).update({order_status:301})
    let data ={orderStatus:301,message:'已收货'}
    return this.success(data);
  }

  async statuschangeAction() {
    const model = this.model('order')
    const orderId = this.post('orderId');
    await model.where({  user_id: this.getLoginUserId(),id: orderId }).update({order_status:201})
    let data ={orderStatus:201,message:'已付款'}
    return this.success(data);
  }

  /**
   * 提交订单
   * @returns {Promise.<void>}
   */
  async submitAction() {
    // 获取收货地址信息和计算运费
    const addressId = this.post('addressId');
    const checkedAddress = await this.model('address').where({ id: addressId }).find();
    if (think.isEmpty(checkedAddress)) {
      return this.fail('请选择收货地址');
    }
    //const freightPrice = 0.00;

   
    if (!think.isEmpty(checkedAddress)) {
      checkedAddress.province_name = await this.model('region').getRegionName(checkedAddress.province_id);
      checkedAddress.city_name = await this.model('region').getRegionName(checkedAddress.city_id);
      checkedAddress.district_name = await this.model('region').getRegionName(checkedAddress.district_id);
      checkedAddress.full_region = checkedAddress.province_name + checkedAddress.city_name + checkedAddress.district_name;
    }

    // 获取要购买的商品
    const cartData = await this.controller('cart').getCart();

    // 根据收货地址计算运费
    //const freightPrice = 0.00;
    let freightPrice = 0.00,arr=[2,3,4,5,6,7,8,9,10,16,22,27,28,29,30,31,32],checkedGoodsCount = cartData.cartTotal.checkedGoodsCount;
    /*if(checkedAddress.city_id == 233 || checkedAddress.city_name == '深圳市'){
      freightPrice = 6+(checkedGoodsCount-1)*1;      //市内 基础运费6元
      if(freightPrice > 20){
        freightPrice = 20
      }  

    }else if( arr.indexOf(checkedAddress.province_id) >-1 ){
      freightPrice = 10+(checkedGoodsCount-1)*1;     //市外较远 基础运费10元
      if(freightPrice > 40){
        freightPrice = 40
      }
    }else{
      freightPrice = 8+(checkedGoodsCount-1)*1;     //市外较近 基础运费8元
      if(freightPrice > 30){
        freightPrice =30
      }
    }*/




    // 获取要购买的商品
    const checkedGoodsList = await this.model('cart').where({ user_id: this.getLoginUserId(), session_id: 1, checked: 1 }).select();
    if (think.isEmpty(checkedGoodsList)) {
      return this.fail('请选择商品');
    }

    // 统计商品总价
    let goodsTotalPrice = 0.00;
    for (const cartItem of checkedGoodsList) {
      goodsTotalPrice += cartItem.number * cartItem.retail_price;
    }

    // 获取订单使用的优惠券
    const couponId = this.post('couponId');
    const couponPrice = 0.00;
    if (!think.isEmpty(couponId)) {

    }

    // 订单价格计算
    const orderTotalPrice = goodsTotalPrice + freightPrice - couponPrice; // 订单的总价
    const actualPrice = orderTotalPrice - 0.00; // 减去其它支付的金额后，要实际支付的金额
    //const currentTime = parseInt(this.getTime() / 1000);   //orig
    //const currentTime = Date.now();     //new add
    const currentTime = this.getTime();     //new add

    const orderInfo = {
      order_sn: this.model('order').generateOrderNumber(),
      user_id: this.getLoginUserId(),

      // 收货地址和运费
      consignee: checkedAddress.name,
      mobile: checkedAddress.mobile,
      province: checkedAddress.province_id,
      city: checkedAddress.city_id,
      district: checkedAddress.district_id,
      address: checkedAddress.address,
      //freight_price: 0.00,
      freight_price: freightPrice,  //new add

      // 留言
      postscript: this.post('postscript'),

      // 使用的优惠券
      coupon_id: 0,
      coupon_price: couponPrice,

      add_time: currentTime,
      goods_price: goodsTotalPrice,
      order_price: orderTotalPrice,
      actual_price: actualPrice
    };

    // 开启事务，插入订单信息和订单商品
    const orderId = await this.model('order').add(orderInfo);
    orderInfo.id = orderId;
    if (!orderId) {
      return this.fail('订单提交失败');
    }

    // 统计商品总价
    const orderGoodsData = [];
    for (const goodsItem of checkedGoodsList) {
      orderGoodsData.push({
        order_id: orderId,
        goods_id: goodsItem.goods_id,
        goods_sn: goodsItem.goods_sn,
        product_id: goodsItem.product_id,
        goods_name: goodsItem.goods_name,
        list_pic_url: goodsItem.list_pic_url,
        market_price: goodsItem.market_price,
        retail_price: goodsItem.retail_price,
        freight_price:freightPrice, //new add
        number: goodsItem.number,
        goods_specifition_name_value: goodsItem.goods_specifition_name_value,
        goods_specifition_ids: goodsItem.goods_specifition_ids
      });
    }

    await this.model('order_goods').addMany(orderGoodsData);
    await this.model('cart').clearBuyGoods(this.getLoginUserId());

    return this.success({ orderInfo: orderInfo });
  }

  /**
   * 查询物流信息
   * @returns {Promise.<void>}
   */
  /*async expressAction() {
    const orderId = this.get('orderId');
    if (think.isEmpty(orderId)) {
      return this.fail('订单不存在');
    }
    const latestExpressInfo = await this.model('order_express').getLatestOrderExpress(orderId);
    return this.success(latestExpressInfo);
  }*/


  async expressAction() {
    const orderId = this.get('orderId');
    if (think.isEmpty(orderId)) {
      return this.fail('订单不存在');
    }
    const latestExpressInfo = await this.model('order_express').where({order_id:orderId}).find();
    latestExpressInfo.add_time = think.datetime(latestExpressInfo.add_time*1000, 'YYYY-MM-DD HH:mm:ss')
    return this.success(latestExpressInfo);
  }

};
