const Base = require('./base.js');
const fs = require('fs');

module.exports = class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    const page = this.get('page') || 1;
    const size = this.get('size') || 10;
    const name = this.get('name') || '';

    const model = this.model('brand');
    const data = await model.field(['id', 'name', 'floor_price', 'app_list_pic_url', 'is_new', 'sort_order', 'is_show']).where({name: ['like', `%${name}%`]}).order(['id DESC']).page(page, size).countSelect();

    return this.success(data);
  }

  async allBrandAction() {
    const model = await this.model('brand')
    const data = await model.order('id ASC').select();
                                      //this.order('id DESC, name ASC').select();
    data.unshift({id: 0, name: "自有品牌"})
    //console.log(data)
    return this.success(data);
  }


  async infoAction() {
    const id = this.get('id');
    const model = this.model('brand');
    const data = await model.where({id: id}).find();
    data.list_pic_url_array = [{'url':data.list_pic_url}]
    data.new_pic_url_array = [{'url':data.new_pic_url}]
    data.imgRemove= []
    console.log(data)

    return this.success(data);
  }

  async storeAction() {
    if (!this.isPost) {
      return false;
    }
    /*let a = parseInt(Date.now() / 1000)

    console.log(a)

    let n = Date.now()
    console.log(n )
    //let ymd = think.datetime(1567406552000, 'YYYY-MM-DD HH-mm-ss')
    let ymd = think.datetime(n, 'YYYY-MM-DD HH-mm-ss')
    console.log(ymd)
      return

    */

    /*let oldPath = "F:\/nideshop-master\/www\/static\/upload\/brand\/aa"   //需转义
    let newPath = "F:\/nideshop-master\/www\/static\/upload\/brand\/tt"
    if(think.isExist(oldPath)){
      try { 
        fs.renameSync(oldPath, newPath);
        console.log("重命名成功"); 
      }catch (e) {
        fs.renameSync(oldPath, newPath);
        console.log(e); 
      }
    }*
    return
    /
    
   /* try { 
      fs.renameSync(
        "F:\nideshop-master\www\static\upload\brand\vv",
        "F:\nideshop-master\www\static\upload\brand\aa"
      );
    }catch (e) { 
      fs.renameSync(
        "F:\nideshop-master\www\static\upload\brand\vv", 
        "F:\nideshop-master\www\static\upload\brand\aa"
      );
    }*/
    
    const values = this.post();
    const id = this.post('id');

    const model = this.model('brand');
    values.is_show = values.is_show ? 1 : 0;
    values.is_new = values.is_new ? 1 : 0;
    if (id > 0) {
      await model.where({id: id}).update(values);
    } else {
      delete values.id;
      await model.add(values);
    }

    
    const imgRemove = this.post('imgRemove');
    //console.log(imgRemove)
    if( !think.isEmpty(imgRemove) ){
      const utils =this.service('utils', 'admin');
        for(let item of imgRemove){
          utils.imgdelete(item) 
        }

    }
    

    /*let goodsId='';
    if( id > 0 ){
      await model.where({id: id}).update(values);
    }else{
        delete values.id;
        goodsId = await model.where({id: id}).update(values);
        id = goodsId; 
    }
    const utils =this.service('utils', 'admin');
    utils.imgCollateTwo(values.list_pic_url,id,'brandTemp','brand')
    utils.imgCollateTwo(values.new_pic_url,id,'brandTemp','brand') 
    console.log(values)*/
    return this.success(values);
  }

  async destoryAction() {
    const id = this.post('id');
    await this.model('brand').where({id: id}).limit(1).delete();
    // TODO 删除图片

    return this.success();
  }
};
