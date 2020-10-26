const Base = require('./base.js');

module.exports = class extends Base {
  /*indexAction() {
    return this.display();
  }*/

  async indexAction() {
  	let data ={}
  	//const fileList = await this.model('ad').field('image_url as url').where({ad_position_id: 1,enabled:1}).select();

    const ad = await this.model('ad').field('image_url as url,link').where({ad_position_id: 1,enabled:1}).select();
    let fileList=[],links=[];
    for(let item of ad){
      fileList.push({'url':item.url})
      links.push({'link':item.link})
    }

    let len = links.length
    //console.log(len)
    if(len<5){
      for (let j = 0; j < 5-len; j++) { 
        links.push({'link':''})

        //links[len+j] = {}
        //links[len+j].link = ''
      }
    }

  	//console.log(fileList)
    //return
    //[{url: "http://127.0.0.1:8360/static/upload/goods/2982dc43-5f06-4763-ab04-50f1c64a2e13.jpg"}]	//前端插件需要此结构
    let  list_pic_gallery = []
    for( let i of fileList){
       list_pic_gallery.push(i.url)	
    }
  	//console.log(fileList)
    let channel =  await this.model('channel').field('id,name,sort_order').select();
  	data.list_pic_gallery = list_pic_gallery

  	data.fileList = fileList
    data.links = links
    //data.ad = ad

  	data.imgRemove = []
    data.channel = channel


    return this.success(data);
  }

  async indexStoreAction() {
    const values =  this.post();
  	const list_pic_gallery = this.post('list_pic_gallery')
  	const imgRemove = this.post('imgRemove')
    //const channel = this.post('channel')

  	//console.log(imgRemove)
  	const ad = this.model('ad');
  	//select() 方法查询多条数据，返回的数据类型为数组。如果未查询到相关数据，返回值为 []
  	const galleryList = await ad.where({ad_position_id: 1}).select()		

  	let gLen = galleryList.length, len = list_pic_gallery.length
  	let value = gLen<=len?gLen:len 						//取小
    for (let j = 0; j < value; j++) { 
	    galleryList[j].image_url = list_pic_gallery[j]
	    galleryList[j].enabled = 1
  	}
  	//console.log(galleryList);

  	if(gLen < len){               		//如原来只有3个图片，现在多上传了n个图片,此时这n个图片就变成新增了
      let newGallery = []
      for (let j = 0; j < len-gLen; j++) { 
        newGallery[j] = {}
        newGallery[j].image_url = list_pic_gallery[gLen+j]     
      }
      //console.log(newGallery);
      await ad.addMany(newGallery);

    }else if(gLen > len){           	//如原来只有4个图片，现在去掉了2个图片,此时这2个图片就变成删除(逻辑删除)了        
      for (let j = len; j < gLen; j++) { 
        galleryList[j].enabled = 0 
      }
      //console.log(len);
    }

    if(gLen>0){
    	await ad.updateMany(galleryList);
    }

    for (let j = 0; j < 5; j++) {
      values.links[j].id = j+1
    }
    //console.log(values.links);

    await ad.updateMany(values.links);

    if(imgRemove.length>0){
    	const utils =this.service('utils', 'admin');
    	for(let item of imgRemove){
        utils.imgdelete(item) 
      }
    }
    
    await this.model('channel').updateMany(values.channel);

    return this.success(value);
  }








};
