const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    const page = this.get('page') || 1;
    const size = this.get('size') || 10;
    const orderSn = this.get('orderSn') || '';
    const consignee = this.get('consignee') || '';

    const model = this.model('order');
    const data = await model.where({order_sn: ['like', `%${orderSn}%`], consignee: ['like', `%${consignee}%`]}).order(['id DESC']).page(page, size).countSelect();
    //console.log(data);
    /*
      count: 7,
      currentPage: 1,
      data: (7) [
      {
        actual_price: 981,add_time: "2019-08-23 10:10:05",address: "人民路374号2单元205室", callback_status: "true",city: 37,
        confirm_time: 0,consignee: "李四",country: 0,coupon_id: 0,coupon_price: 0,district: 403,freight_price: 12,goods_price: 969,
        id: 37,integral: 0,integral_money: 0,mobile: "17322315896",order_price: 981,order_sn: "20190605175522185022", order_status: 0,
        order_status_text: "未付款", parent_id: 0,pay_id: 0,pay_name: "", pay_status: 0,pay_time: 0,postscript: "", province: 2,
        shipping_fee: 0,shipping_status: 0,user_id: 2
      }, 
      RowDataPacket, RowDataPacket, RowDataPacket, RowDataPacket, RowDataPacket, RowDataPacket
      ],
      pageSize: 10,
      totalPages: 1

    */

    //let dn = Date.now(),ymd = think.datetime(dn, 'YYYY-MM-DD HH:mm:ss')
    //console.log(dn);  //1566526205971



    const newList = [];
    for (const item of data.data) {

      if (item.order_status === 0) {
        //const currentTime = parseInt(this.getTime() / 1000); 
        const currentTime = this.getTime()
        const final_pay_time = item.add_time+1800

        if (currentTime > final_pay_time ) {
          item.order_status = 101
          await model.where({  id: item.id }).update({order_status:101})
        } 
      
      }


      item.order_status_text = await this.model('order').getOrderStatusText(item.id);
      item.add_time = think.datetime(item.add_time*1000, 'YYYY-MM-DD HH:mm:ss')
      //item.add_time =  ymd
      newList.push(item);
    }
    data.data = newList;
    return this.success(data);
  }

  async infoAction() {
    const id = this.get('id');
    const model = this.model('order');
    const data = await model.where({id: id}).find();
    //const data = await model.where({order_id: id}).find();

    return this.success(data);
  }

  async storeAction() {
    if (!this.isPost) {
      return false;
    }

    const values = this.post();
    const id = this.post('id');

    const model = this.model('order');
    values.is_show = values.is_show ? 1 : 0;
    values.is_new = values.is_new ? 1 : 0;
    if (id > 0) {
      await model.where({id: id}).update(values);
    } else {
      delete values.id;
      await model.add(values);
    }
    return this.success(values);
  }

  async destoryAction() {
    const id = this.post('id');
    await this.model('order').where({id: id}).limit(1).delete();

    // 删除订单商品
    await this.model('order_goods').where({order_id: id}).delete();

    // TODO 事务，验证订单是否可删除（只有失效的订单才可以删除）

    return this.success();
  }

  async logisticsAction() {
    let data = await this.model('shipper').select();
    return this.success(data);
  }

  async logisticsDetailAction() {
    const order_id = this.get('order_id');
    let data = await this.model('order_express').where({order_id: order_id}).find();
    data.add_time =think.datetime(data.add_time*1000, 'YYYY-MM-DD HH:mm:ss')
    return this.success(data);
  }

  async deliverGoodsAction() {
    //const id = this.get('orderId');
    const infoForm = this.post();
    //console.log(infoForm)
    //return
    let order_id = infoForm.order_id;
    //return
    await this.model('order').where({id: order_id}).update({order_status:300});
    let model = this.model('order_express')
    let obj = await model.where({order_id: order_id}).find()  

    let time = this.getTime()
    if( think.isEmpty(obj) ){
      infoForm.add_time = time
      await model.where({order_id:order_id}).add(infoForm);
    }else{
      delete infoForm.add_time;
      infoForm.update_time = time
      await model.where({order_id:order_id}).update(infoForm);
    }


    return this.success();
  }


};
