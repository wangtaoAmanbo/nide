const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const goods = await this.model('goods')
    const banner = await this.model('ad').where({ad_position_id: 1,ad_position_id: 1,enabled:1}).select();
    const channel = await this.model('channel').order({sort_order: 'asc'}).select();
    //const newGoods = await goods.field(['id', 'name', 'list_pic_url', 'retail_price']).where({is_new: 1}).limit(4).select();
    const newGoods = await goods.field(['id', 'name', 'list_pic_url', 'retail_price']).where({is_new: 1,is_on_sale:1}).order({id:'desc'}).limit(4).select();
    //.order({id:'desc',sort_order: 'desc'})

    const hotGoods = await goods.field(['id', 'name', 'list_pic_url', 'retail_price', 'goods_brief']).where({is_hot: 1,is_on_sale:1}).limit(3).select();
    const brandList = await this.model('brand').where({is_new: 1,is_show:1}).order({new_sort_order: 'asc'}).limit(4).select();
   // const topicList = await this.model('topic').limit(3).select();
    const topicList = await this.model('topic').where({is_show:1}).order({sort_order:'desc'}).limit(3).select();

    const categoryList = await this.model('category').where({parent_id: 0, name: ['<>', '推荐'],is_show:1}).select();
    const newCategoryList = [];
    /*console.log(categoryList);
    [{
      banner_url: "http://yanxuan.nosdn.127.net/92357337378cce650797444bc107b0f7.jpg",
      front_desc: "回家，放松身心",
      front_name: "回家，放松身心。",
      icon_url: "http://yanxuan.nosdn.127.net/a45c2c262a476fea0b9fc684fed91ef5.png",
      id: 1005000,
      img_url: "//nos.netease.com/yanxuan/f0d0e1a542e2095861b42bf789d948ce.jpg",
      is_show: 1,
      keywords: "",
      level: "L1",
      name: "居家",
      parent_id: 0,
      show_index: 1,
      sort_order: 2,
      type: 0,
      wap_banner_url: "http://127.0.0.1:8360/static/upload/category/a36637c9-cfd5-43c1-b66c-bae7a305e1e3.jpg"
    },
    {
      banner_url: "http://yanxuan.nosdn.127.net/f4ff8b3d5b0767d4e578575c1fd6b921.jpg",
      front_desc: "厨房",
      front_name: "爱，囿于厨房",
      icon_url: "http://yanxuan.nosdn.127.net/ad8b00d084cb7d0958998edb5fee9c0a.png",
      id: 1005001,
      img_url: "//nos.netease.com/yanxuan/88855173a0cfcfd889ee6394a3259c4f.jpg",
      is_show: 1,
      keywords: "",
      level: "L1",
      name: "餐厨",
      parent_id: 0,
      show_index: 2,
      sort_order: 3,
      type: 0,
      wap_banner_url: "http://yanxuan.nosdn.127.net/3708dbcb35ad5abf9e001500f73db615.png"}
    ]*/
    for (const categoryItem of categoryList) {
      const childCategoryIds = await this.model('category').where({parent_id: categoryItem.id}).getField('id', 100);
      //console.log(childCategoryIds);

      //当childCategoryIds 无数据时候将报错(即顶级分类下无2级分类)
      if(childCategoryIds.length >0){
         const categoryGoods = await goods.field(['id', 'name', 'list_pic_url', 'retail_price']).where({category_id: ['IN', childCategoryIds]}).limit(6).select();
        newCategoryList.push({
          id: categoryItem.id,
          name: categoryItem.name,
          goodsList: categoryGoods
        });
      }
     

    }

    return this.success({
      banner: banner,
      channel: channel,
      newGoodsList: newGoods,
      hotGoodsList: hotGoods,
      brandList: brandList,
      topicList: topicList,
      categoryList: newCategoryList
    });
  }
};
