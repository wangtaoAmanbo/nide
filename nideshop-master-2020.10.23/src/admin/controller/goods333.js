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

    const model = this.model('goods');
    const data = await model.where({name: ['like', `%${name}%`]}).order(['id DESC']).page(page, size).countSelect();

    return this.success(data);
  }

  /*async specificationAction() {
    const model = this.model('specification');
    const data = await model.order(['id ASC']).select();

    return this.success(data);
  }*/

  

  async infoAction() {
    const id = this.get('id');
    const model = this.model('goods');
    const data = await model.where({id: id}).find();
    
   // let firstLevel = await this.model('category').getCategoryfirst();
    // data.firstLevel = firstLevel;

    /*let ms = think.ms(Date.now() / 1000);
    data.aa = ms;*/

    //return this.success(data);

    const res = await this.model('category').where({id: data.category_id}).find();
    if(res.parent_id != 0){
       data.categoryL1 = res.parent_id 
    }

    //let list_pic_gallery = await this.model('goods_gallery').where({goods_id: id,is_delete :0}).select()
    //let list_pic_gallery = await this.model('goods_gallery').where({goods_id: id,is_delete :0}).getField('img_url')
    let fileList = await this.model('goods_gallery').field('img_url as url').where({goods_id: id,enabled :1}).select()
    //console.log(fileList)
    // [{url: "http://127.0.0.1:8360/static/upload/goods/2982dc43-5f06-4763-ab04-50f1c64a2e13.jpg"}]
    data.fileList= fileList
    let list_pic_gallery = []
    for( let i of fileList){
       list_pic_gallery.push(i.url)
    }

    data.list_pic_gallery= list_pic_gallery
    
   let obj = {}
   //console.log(data.is_specification == 1)
   if(data.is_specification == 1){
      /*let goods_specification = this.model('goods_specification'),spe = await goods_specification.where({goods_id: id}).select();
      console.log(spe)
      for (let item of spe){
        arr.push(item.value)
      }*/
      let arr = []
      let resultName = [], o= [];
      let m1 = [
        [{c1:''},{c1:''},{c1:''},{c1:''},{c1:''},{c1:''}],
        [{c1:''},{c1:''},{c1:''},{c1:''},{c1:''},{c1:''}],
        [{c1:''},{c1:''},{c1:''},{c1:''},{c1:''},{c1:''}],
        [{c1:''},{c1:''},{c1:''},{c1:''},{c1:''},{c1:''}],
        [{c1:''},{c1:''},{c1:''},{c1:''},{c1:''},{c1:''}]
      ]

      let goods_specification = this.model('goods_specification');
      let spe = await goods_specification.field(['nideshop_goods_specification.*', 'nideshop_specification.name']).join({
        specification: {
          on: ['specification_id', 'id']
        }
        /*,group_tag: {
          on: ['id', 'group_id']
        }*/
      }).where({'nideshop_goods_specification.goods_id': id}).select();
      //console.log(spe)
      /*
      [
        {goods_id: 1181007,id: 12name: "颜色",pic_url: "",specification_id: 1,value: "红茶"},
        {goods_id: 1181007,id: 13,name: "颜色",pic_url: "",specification_id: 1,value: "绿茶"},
        {goods_id: 1181007,id: 14,name: "规格",pic_url: "",specification_id: 2,value: "1两"},
        {goods_id: 1181007,id: 15,name: "规格",pic_url: "",specification_id: 2,value: "2两"}
      ]
      */

      /*let resultName = []

      let o = {}*/
      //for (let s = 0; s < spe.length; s++) {  
      // let name = spe[s].name    
      /*for (let i of spe) {
          let name = i.name
          if (!o[name]) {
              resultName.push(name)
              o[name] = 1
          }
      }*/
      for (let i of spe) {
          let name = i.name
          if (!resultName.includes(name) ) {
              resultName.push(name)
          }
      }

      //console.log(resultName)
      /*
        ["颜色", "规格"]
  
      */

      for (let s = 0; s < resultName.length; s++) { 
        let a = spe.filter(item => item.name===resultName[s] )
        for (let v = 0; v < a.length; v++)  { 
          m1[s][v].c1 = a[v].value
        }
      }
      //console.log(m1)
      /*
         [
          [{c1:"红茶"},{c1:"绿茶"},{c1:''},{c1:''},{c1:''},{c1:''}],
          [{c1:'1两'},{c1:'2两'},{c1:''},{c1:''},{c1:''},{c1:''}],
          [{c1:''},{c1:''},{c1:''},{c1:''},{c1:''},{c1:''}],
          [{c1:''},{c1:''},{c1:''},{c1:''},{c1:''},{c1:''}],
          [{c1:''},{c1:''},{c1:''},{c1:''},{c1:''},{c1:''}]
        ]
      */

      const sku = await this.model('product').where({goods_id: id}).select(); //.fieldReverse('id')
       //console.log(sku);
      for (let j = 0; j < sku.length; j++) { 
        let arr = sku[j].goods_specification_ids.split('_'); //console.log(arr);   
        for (let i = 0; i < arr.length; i++) { 
          let tm = spe.find((n) => n.id == arr[i] )
          arr[i] = tm.value
          //console.log(tm);
        }
        
        sku[j].goods_specification_ids = arr.join('_')
       
      }
      //console.log(sku);
      /*
        [
          {goods_id: 1181007,goods_number: 44,goods_sn: "900",goods_specification_ids: "红茶_1两",goods_specification_img: "http://127.0.0.1:8360/static/upload/goods/0db16d8f-c273-4af3-a08e-aafb9a342094.jpg",id: 245,
retail_price: 45},
          {goods_id: 1181007,goods_number: 96,goods_sn: "901",goods_specification_ids: "红茶_2两",goods_specification_img: "",id: 246,retail_price: 34},
          {goods_id: 1181007,goods_number: 78,goods_sn: "902",goods_specification_ids: "绿茶_1两",goods_specification_img: "",id: 247,retail_price: 52},

          {goods_id: 1181007,goods_number: 90,goods_sn: "903",goods_specification_ids: "绿茶_2两",goods_specification_img: "",id: 248,retail_price: 85}
        ]
      */
      obj.type = resultName
      obj.m1 = m1
      //obj.tableList = sku
      data.sku = sku
      
   }
   obj.info = data
   /*let obj = {
      //'type':arr,
      'type':resultName,
      'm1':m1,
      'tableList':sku,
      'info':data
    };*/
    //return this.success(obj);
    return this.success(obj);
    
  }

  /*async firstCategoryAction() {
    const model = this.model('category');
    let firstLevel= await model.where({parent_id: 0}).select();
   
    return this.success(firstLevel);
  }

  async secondCategoryAction(parentId) {
    const id = this.get('parentId');
    const model = this.model('category');
    let secondLevel= await model.where({parent_id: id}).select();
   
    return this.success(secondLevel);  
  }
*/
   /*async secondCategoryAction(parentId) {
    const id = this.get('parentId');
    let secondLevel= await this.model('category').getCategorySecond(id);
   
    return this.success(secondLevel);
   
  }*/


  async storeAction() {
   /* let ig = ['http://127.0.0.1:8360/static/upload/goods/f1394c7e-a6d4-44e0-99bb-2c8c6555c5a9.jpg','http://127.0.0.1:8360/static/upload/goods/d4d61c08-30cc-4522-b176-775ad806e5c7.jpg'];
   
    let newArr = []
    for(let item of ig){
      let str1 = item.split('static');
      let filePath1 = this.config('domain.path') +str1[1]
       console.log(filePath1)

      let str2 = item.split('goods');
      let filePath2 = str2[0]+'goods/'+'single'+str2[1]
      //console.log(filePath2)

      //if( think.isExist(item) ){
        const is = fs.createReadStream(filePath1);
        const os = fs.createWriteStream(filePath2);
        is.pipe(os);
        console.log(item)
      //}

    }*/
   
    //return

    if (!this.isPost) { 
      return false;
    }

    const values = this.post();
    let id = this.post('id');
    const sku = this.post('sku'),checkListC = this.post('checkListC'),list_pic_gallery = values.list_pic_gallery;   
    let pro = {};

    const model = this.model('goods');
    values.is_on_sale = values.is_on_sale ? 1 : 0;
    values.is_new = values.is_new ? 1 : 0;
    values.is_hot = values.is_hot ? 1 : 0;

    const goods_gallery = this.model('goods_gallery')
    let galleryList =[],goodsId='';
    let productList=[],specificationList=[];
    if( id > 0 ){
      galleryList = await goods_gallery.where({goods_id: id}).select()  
      productList = await product.where({goods_id: id}).select();
      specificationList = await goods_specification.where({goods_id: id}).select(); 

    }else{
        delete values.id;
        goodsId = await model.add(values);
        id = goodsId; 
    }

    
     //let ig = ['http://127.0.0.1:8360/static/upload/goods/f1394c7e-a6d4-44e0-99bb-2c8c6555c5a9.jpg','http://127.0.0.1:8360/static/upload/goods/d4d61c08-30cc-4522-b176-775ad806e5c7.jpg'];

    /*let str1 = values.list_pic_url.split('static');
    let filePath1 = this.config('domain.path') +str1[1]
     //console.log(filePath1)
     //F:\nideshop-master\www\static\upload\goods\685ebdf0-a3dd-4e7d-93b5-978e1fb236cb.jpg

    let str2 = str1[1].split('goodsTemp');
    let filePath2 = this.config('domain.path') + str2[0]+'goods/'+id+str2[1]

    let filePath3 = this.config('domain.path') + str2[0]+'goods/'+id+'/'

    if(!think.isExist(filePath3)){
      think.mkdir(filePath3)
    }
    
    console.log(filePath2);
    console.log(filePath3);
    console.log(think.isExist(filePath2));

    if( think.isExist(filePath1) && !think.isExist(filePath2)){
      const is = fs.createReadStream(filePath1);
      const os = fs.createWriteStream(filePath2);
      is.pipe(os);
      console.log(filePath2)

      values.list_pic_url = this.config('domain.name')+ '/static'+str2[0]+'goods/'+id+str2[1]
      console.log(values.list_pic_url)
    }*/

    const utils =this.service('utils', 'admin');
    utils.imgCollate(values.list_pic_url,id) 

    for(let item of list_pic_gallery){
      utils.imgCollate(item,id) 
    }
    if(values.is_specification!=0){
      for(let item of sku){
        utils.imgCollate(item.goods_specification_img,id) 
      }
    }

    let goodsDescImgSrc = utils.getImgSrc(values.goods_desc)
    for(let item of goodsDescImgSrc){
      utils.imgCollate(item,id) 
    }
    let goods_desc = values.goods_desc.replace(/goodsTemp/g, "goods/"+id); 
    values.goods_desc = goods_desc
    console.log(values)
    return

    const product = this.model('product'),goods_specification = this.model('goods_specification');

    //let gallery_id = await goods_gallery.where({goods_id: id}).getField('id')
    //getField单字段返回值结构如[1, 2, 3, 4, 5]，多字段返回值结构如 data = {c_id: [1, 2, 3, 4, 5], d_name: ['a', 'b', 'c', 'd', 'e']}

    /*let galleryList =[],goodsId='';
    if( id > 0 ){
      galleryList = await goods_gallery.where({goods_id: id}).select()  
    }else{
        delete values.id;
        goodsId = await model.add(values);
        id = goodsId; 
    }*/
    // [
    //   {goods_id: 1181007,img_desc: "",img_url: "http://127.0.0.1:8360/static/upload/goods/6e657bca-4120-4ec3-b339-f2d406f29d4f.jpg",is_delete: 0,sort_order: 5},
    //   {goods_id: 1181007,img_desc: "",img_url: "http://127.0.0.1:8360/static/upload/goods/64dbfd7b-ff95-4a80-a254-6f3004a1f422.jpg",is_delete: 0,sort_order: 5},
    //   {goods_id: 1181007,img_desc: "",img_url: "http://127.0.0.1:8360/static/upload/goods/b62b5731-d641-46c8-bb9d-7f7b397904e9.jpg",is_delete: 0,sort_order: 5}
    // ]   

    let gLen = galleryList.length, len = list_pic_gallery.length
    let value = gLen<=len?gLen:len            //取小
      for (let j = 0; j < value; j++) { 
        galleryList[j].img_url = list_pic_gallery[j]
        galleryList[j].enabled = 1
    }
    //console.log(galleryList);

      if(gLen < len){                   //如原来只有3个图片，现在多上传了n个图片,此时这n个图片就变成新增了
        let newGallery = []
        for (let j = 0; j < len-gLen; j++) { 
          newGallery[j] = {}
          newGallery[j].goods_id = id 
          newGallery[j].img_url = list_pic_gallery[gLen+j]     
        }
        //console.log(newGallery);
        await goods_gallery.addMany(newGallery);

      }else if(gLen > len){             //如原来只有4个图片，现在去掉了2个图片,此时这2个图片就变成删除(逻辑删除)了        
        for (let j = len; j < gLen; j++) { 
          galleryList[j].enabled = 0 
        }
        //console.log(len);
      }
      //console.log(galleryList);
      //console.log(list_pic_gallery);

      if(gLen>0){
        await goods_gallery.updateMany(galleryList);
      }
      
      //let filePath = 'F:/nideshop-master/www/static/upload/goods/c37ea96e-d5a5-4a32-ac9b-3060066519a0.jpg'
     
      //fs.unlinkSync(filePath);
      
      // console.log(__dirname)
      // F:\nideshop-master\app\admin\controller

      //return

      //编辑
      if (id > 0) {
        //console.log('ddd')
        await model.where({id: id}).update(values);

        //无sku
        if(values.is_specification==0){
            pro = {
            //goods_id:goodsId,
            goods_sn:id,
            goods_number:values.goods_number,
            retail_price:values.retail_price
          };

          await product.where({goods_id: id}).update(pro);

        //有sku 
        }else{
          //let check = [];
          /*for (let j = 0; j < checkListC.length; j++) { 
            checkListC[j].goods_id = id;           
          }*/

          //const goods_specification = this.model('goods_specification');
          //await goods_specification.where({goods_id: id}).updateMany(checkListC);

          // 使用field,field似乎需要放在where前面
          
        //let specification_id = await goods_specification.where({goods_id: id}).getField('id');

          //console.log(specification_id);
          //[12, 13, 14, 15]

          // for (let j = 0; j < checkListC.length; j++) { 
          //   checkListC[j].goods_id = id;
          //   checkListC[j].id = specification_id[j];          
          // }



          //console.log(checkListC);
          // [
          //   {goods_id: 1181007,id: 12,specification_id: 1,value: "红茶"},
          //   {goods_id: 1181007,id: 13,specification_id: 1,value: "绿茶"},
          //   {goods_id: 1181007,id: 14,specification_id: 2,value: "1两"},
          //   {goods_id: 1181007,id: 15,specification_id: 2,value: "2两"}
          // ]

          //updateMany 中dataList {Array}必须包含主键的值
           //await goods_specification.where({goods_id: id}).updateMany(checkListC);
          
          //await goods_specification.updateMany(checkListC);

         // let specificationList = await goods_specification.where({goods_id: id}).select(); 
          let sLen = specificationList.length, clen = checkListC.length

          let value2 = sLen<=clen?sLen:clen            //取小
            for (let j = 0; j < value2; j++) { 
              specificationList[j].value = checkListC[j].value
              specificationList[j].specification_id = checkListC[j].specification_id
              //specificationList[j].goods_id = id
              specificationList[j].enabled = 1
          }
          //console.log(galleryList);

          if(sLen < clen){                   
            let newArr = []
            for (let j = 0; j < clen-sLen; j++) { 
              newArr[j] = {}
              newArr[j].goods_id = id
              newArr[j].specification_id = checkListC[sLen+j].specification_id
              newArr[j].value = checkListC[sLen+j].value 
            }
            //console.log(newGallery);
            await goods_specification.addMany(newArr);

          }else if(sLen > len){                
            for (let j = clen; j < sLen; j++) { 
              specificationList[j].enabled = 0 
            }
            //console.log(len);
          }
          //console.log(galleryList);
          //console.log(list_pic_gallery);

          if(sLen>0){
            await goods_specification.updateMany(specificationList);
          }

          if(sLen < clen){  //新增的 需要重新查询出ID
             specificationList = await goods_specification.where({goods_id: id}).select(); 

          }
          
          for (let j = 0; j < sku.length; j++) { 
            let arr = sku[j].goods_specification_ids.split('_')    //此处arr 为 sku 组合名字，for 循环后 arr 变为 数字类型
            for (let i = 0; i < arr.length; i++) { 
              //let tm = checkListC.find((n) => n.value == arr[i] )
              let tm = specificationList.find((n) => n.value == arr[i] )
              arr[i] = tm.id
            }
            sku[j].goods_id = id
            sku[j].goods_specification_ids = arr.join('_')
            sku[j].goods_sn = '9'+id.toString()+j.toString()
          }
          

          // let product_id = await product.where({goods_id: id}).getField('id')
          // for (let j = 0; j < product_id.length; j++) { 
          //   sku[j].id = product_id[j];           
          // }

          //console.log(sku);
          // [
          //    {id: 245, goods_id: 1181007, goods_specification_ids: "12_14", goods_specification_img: "http://127.0.0.1:8360/static/upload/goods/0db16d8f-c273-4af3-a08e-aafb9a342094.jpg", goods_sn: "911810070", goods_number: 44,retail_price: 45}
          //    {id: 246, goods_id: 1181007, goods_specification_ids: "12_15", goods_specification_img: "http://127.0.0.1:8360/static/upload/goods/b3531998-0cdb-496e-b5ae-845e62a1b751.jpg", goods_sn: "911810071", goods_number: 96,retail_price: 34}
          //    {id: 247, goods_id: 1181007, goods_specification_ids: "13_14", goods_specification_img: "http://127.0.0.1:8360/static/upload/goods/d4d61c08-30cc-4522-b176-775ad806e5c7.jpg", goods_sn: "911810072", goods_number: 78,retail_price: 52}
          //    {id: 248, goods_id: 1181007, goods_specification_ids: "13_15", goods_specification_img: "http://127.0.0.1:8360/static/upload/goods/14bdb3a2-5e77-4420-a84c-7fb033851f17.jpg", goods_sn: "911810073", goods_number: 90,retail_price: 85}

          // ]
         
          //await product.updateMany(sku)

         // let productList = await product.where({goods_id: id}).select(); 
          let pLen = productList.length, skulen = sku.length

          let value3 = pLen<=skulen?pLen:skulen            //取小
          for (let j = 0; j < value3; j++) { 
              productList[j].goods_specification_ids = sku[j].goods_specification_ids
              productList[j].goods_specification_img = sku[j].goods_specification_img
              productList[j].goods_sn = sku[j].goods_sn
              productList[j].goods_number = sku[j].goods_number
              productList[j].retail_price = sku[j].retail_price
              productList[j].enabled = 1
          }
          //console.log(galleryList);

          if(pLen < skulen){                   
            let pArr = []
            for (let j = 0; j < skulen-pLen; j++) { 
              pArr[j] = {}
              pArr[j].goods_id = id

              pArr[j].goods_specification_ids = sku[j].goods_specification_ids
              pArr[j].goods_specification_img = sku[j].goods_specification_img
              pArr[j].goods_sn = sku[j].goods_sn
              pArr[j].goods_number = sku[j].goods_number
              pArr[j].retail_price = sku[j].retail_price
              
            }
            //console.log(newGallery);
            await product.addMany(pArr);

          }else if(pLen > len){                
            for (let j = skulen; j < pLen; j++) { 
              productList[j].enabled = 0 
            }
            //console.log(len);
          }
        
          if(pLe>0){
            await product.updateMany(productList);
          }

        }

      //新增
      } else {
        //const result = await this.transaction(async () => {

          //delete values.id;
          //let goodsId = await model.add(values);

          await model.where({id: goodsId}).update({goods_sn:goodsId});
          
          if(values.is_specification==0){
            pro = {
              goods_id:goodsId,
              goods_sn:goodsId,
              goods_number:values.goods_number,
              retail_price:values.retail_price
            };

            await product.add(pro);

          }else{
            //let check = [];
            for (let j = 0; j < checkListC.length; j++) { 
              checkListC[j].goods_id = goodsId;           
            }

            let specification_id = await goods_specification.addMany(checkListC);
            console.log(specification_id);

            for (let j = 0; j < checkListC.length; j++) { 
              checkListC[j].id = specification_id[j];           
            }

            //console.log(checkListC);

            for (let j = 0; j < sku.length; j++) { 
              let arr = sku[j].goods_specification_ids.split('_')    //此处arr 为 sku 组合名字，for 循环后 arr 变为 数字类型
              for (let i = 0; i < arr.length; i++) { 
                let tm = checkListC.find((n) => n.value == arr[i] )
                arr[i] = tm.id
              }
              sku[j].goods_id = goodsId
              sku[j].goods_specification_ids = arr.join('_')
              sku[j].goods_sn = '9'+id+j
            }
            //console.log(sku);
            
            // [
            //   {id: 245, goods_id: 1181007, goods_specification_ids: "红茶_1两", goods_specification_img: "http://127.0.0.1:8360/static/upload/goods/0db16d8f-c273-4af3-a08e-aafb9a342094.jpg", goods_sn: "900", goods_number: 44,retail_price: 45},
            //   {id: 246, goods_id: 1181007, goods_specification_ids: "红茶_2两", goods_specification_img: "", goods_sn: "901",goods_number: 96, retail_price: 34},
            //   {id: 247, goods_id: 1181007, goods_specification_ids: "绿茶_1两", goods_specification_img: "", goods_sn: "902", goods_number: 78,retail_price: 52},
            //   {id: 248, goods_id: 1181007, goods_specification_ids: "绿茶_2两", goods_specification_img: "", goods_sn: "903", goods_number: 90,retail_price: 85}
            // ]
            
            await product.addMany(sku)

          }
       // })
      }
      
    return this.success(values);
  }

  async destoryAction() {
    const id = this.post('id');
    await this.model('goods').where({id: id}).limit(1).delete();
    // TODO 删除图片

    return this.success();
  }
};
