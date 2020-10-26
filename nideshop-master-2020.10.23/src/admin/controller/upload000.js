const Base = require('./base.js');
const fs = require('fs');
const path = require('path');
const rename = think.promisify(fs.rename, fs);

module.exports = class extends Base {
  async brandPicAction() {
    const imgFile = this.file('brand_pic');
    if (think.isEmpty(imgFile)) {
      return this.fail('保存失败');
    }
    const utilsSerivce =this.service('utils', 'admin');
    const that = this;
    const filename = '/static/upload/brand/' + think.uuid(32) + utilsSerivce.getImgType(imgFile);
    const is = fs.createReadStream(imgFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'brand_pic',
      fileUrl: this.config('domain.name') + filename
    });
  }

 /* async brandNewPicAction() {
    const imgFile = this.file('brand_new_pic');
    if (think.isEmpty(imgFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filepath = path.join(think.ROOT_PATH, '/www/static/upload/a.jpg');
    think.mkdir(path.dirname(filepath));
    // await rename(imgFile.path, filepath)
    fs.renameSync( imgFile.path, filepath)  
    //  报错cross-device  link not permitted,意为临时文件（本机运行的imgFile.path为c盘）在不同盘符，不能通过rename重命名或移动
    //  解决思路：重新设置临时目录为同一盘符

    return that.success({
      name: 'brand_new_pic',
      fileUrl: 'http://127.0.0.1:8360' + filepath
    });
  }*/

 /* async brandNewPicAction() {
    const imgFile = this.file('brand_new_pic');
    if (think.isEmpty(imgFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/brand/' + think.uuid(32) + '.jpg';

    const is = fs.createReadStream(imgFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    //const os = fs.createWriteStream('./tmp/test.jpg');
    is.pipe(os);

    is.on('end',function(){
      fs.unlinkSync(imgFile.path);
    });

    return that.success({
      name: 'brand_new_pic',
      //fileUrl: 'http://127.0.0.1:8360/static/up/z.jpg'
      fileUrl: think.ROOT_PATH + '/www' + filename
    });
  }*/

  

  async brandNewPicAction() {
    const imgFile = this.file('brand_new_pic');
    if (think.isEmpty(imgFile)) {
      return this.fail('保存失败');
    }
    const utilsSerivce =this.service('utils', 'admin');
    const that = this;
    const filename = '/static/upload/brand/' + think.uuid(32) + utilsSerivce.getImgType(imgFile);

    //fs.createWriteStream 不会自己创建不存在的文件夹，所以在使用之前需要注意，保存文件的文件夹一定要提前创建。/static/upload/brand/
    
    const is = fs.createReadStream(imgFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);
    /*
    is.on('data',function(chunk) {
      console.log(chunk.length);  // 65536  chunk就是一个Buffer(存放16进制数据的"数组",长度以B字节计算(两个16进制为一个元素))
      os.write(chunk);    // Node中的Buffer不占用垃圾回收机制中的内存。 Buffer是由C/C++模块维护。 'data'+chunk会在内部自动调用toString()函数。 建议直接返回buffer节省处理字符串的性能开销。
    });
    */
    is.on('end',function(){
      fs.unlinkSync(imgFile.path);
    });

    return that.success({
      name: 'brand_new_pic',
      fileUrl: this.config('domain.name') + filename
    });
  }

  async goodsPicAction() {
    const imgFile = this.file('goods_pic');
    if (think.isEmpty(imgFile)) {
      return this.fail('保存失败');
    }
    const utilsSerivce =this.service('utils', 'admin');

    const that = this;
    
    const filename = '/static/upload/goods/' + think.uuid(32) + utilsSerivce.getImgType(imgFile);
    const is = fs.createReadStream(imgFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    //console.log(think.ROOT_PATH)
    //F:\nideshop-master

    return that.success({
      name: 'goodsPic',
      //fileUrl: 'http://127.0.0.1:8360' + filename
      fileUrl: this.config('domain.name') + filename
    });

    

    //console.log(imgFile);
    
     // File{
     //  hash: null
     //  lastModifiedDate: Wed Aug 14 2019 10:33:48 GMT+0800 (GMT+08:00) {}
     //  name: "9b4ee214032f7707c15943a1f1dfc881.jpg"
     //  path: "C:\Users\ADMINI~1\AppData\Local\Temp\upload_95b0fd2fd2ea4f412dcb08b3a6b8b599"
     //  size: 206831
     //  type: "image/jpeg"
     //  _events: {}
     //  _eventsCount: 0
     //  _maxListeners: undefined
     //  }
    
    // name为jpg.type 为jpeg
    /*let imgType = imgFile.type.split('/')
    if(imgType[1] =='jpeg' ){
      imgType[1] =='jpg'
    }

    let dn = Date.now(),ymd = think.datetime(dn, 'YYYY-MM-DD'),hms = think.datetime(dn, 'HH-mm-ss');
    //console.log(ymd+'-----'+hms+'___'+imgType[1])
    const filePath = think.ROOT_PATH + '/www'+'/static/upload/goods/'+ymd+'/'
    const filename = hms +'_'+ think.uuid() + '.'+imgType[1]
    //let filename = 'list_pic_url.'+imgType[1]     //后上传图片会覆盖掉前一图片，若不刷新,admin前台依然显示为前一图片，因为名字相同
    if(!think.isExist(filePath)){
      think.mkdir(filePath)
    }
    

    const is = fs.createReadStream(imgFile.path);
    const os = fs.createWriteStream(filePath + filename);
    is.pipe(os);


    return that.success({
      name: 'goodsPic',
      fileUrl: this.config('domain.name') + '/static/upload/goods/'+ymd+'/' + filename
    });*/
  }

  async goodsGalleryAction() {
    //const imgFile = this.file('goods_gallery');
    const imgFile = this.file('file');
    if (think.isEmpty(imgFile)) {
      return this.fail('保存失败');
    }
    const utilsSerivce =this.service('utils', 'admin');

    const that = this;
    
    const filename = '/static/upload/goods/' + think.uuid(32) + utilsSerivce.getImgType(imgFile);
    const is = fs.createReadStream(imgFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'goodsGallery',
      path:  filename,
      fileUrl: this.config('domain.name') + filename
    });
  }

  async galleryIndexAction() {
    //const imgFile = this.file('goods_gallery');
    const imgFile = this.file('file');
    if (think.isEmpty(imgFile)) {
      return this.fail('保存失败');
    }

    const utilsSerivce =this.service('utils', 'admin');

    const that = this;
    const filename = '/static/upload/index/' + think.uuid(32) + utilsSerivce.getImgType(imgFile);
    const is = fs.createReadStream(imgFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'galleryIndex',
      //fileUrl: 'http://127.0.0.1:8360' + filename
      fileUrl: this.config('domain.name') + filename
    });
  }

  /*async galleryCommonAction() {
    const imgFile = this.file('file');
    const folder = this.post('folder');

    if (think.isEmpty(imgFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    
    const filename = '/static/upload/' + folder+'/'+think.uuid(32) + '.jpg';
    const is = fs.createReadStream(imgFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'goodsGallery',
      //fileUrl: 'http://127.0.0.1:8360' + filename
      fileUrl: this.config('domain.name') + filename
    });
  }*/
       
  async goodsSpecificationPicAction() {
    const list = this.post('list');//console.log(list);
    const imgFile = this.file('goods_specification_pic');
    if (think.isEmpty(imgFile)) {
      return this.fail('保存失败');
    }
    const utilsSerivce =this.service('utils', 'admin');
     

    const that = this;
    const filename = '/static/upload/goods/' + think.uuid(32) + utilsSerivce.getImgType(imgFile);
    const is = fs.createReadStream(imgFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'goods_specification_pic',
      s:list,
      //fileUrl: 'http://127.0.0.1:8360' + filename
      fileUrl: this.config('domain.name') + filename
    });
  }

  async imgIndexDeleteAction() {
    let data = this.post('filePath'),str = data.split('static');
    const filePath = this.config('domain.path') +str[1]
    //console.log(filePath);

    if (think.isEmpty(filePath)) {
      return this.fail('路径错误');
    }
    //console.log(fs.existsSync(filePath));
    if(fs.existsSync(filePath)){
     // console.log('11')
      fs.unlinkSync(filePath)
      this.model('ad').where({image_url: ['like', `%${data}%`]}).update({enabled: 0});
      return this.success('image is delete success');
    }

    /*const utilsSerivce =this.service('utils', 'admin');
    await utilsSerivce.rmdirp(filePath)
    return this.success({
      result: filePath+'is delete success'

    });*/

   /* const utilsSerivce =this.service('utils', 'admin');
    await utilsSerivce.deleteall(filePath)
    return this.success({
      result: filePath+' is delete success'

    });*/
    
    //console.log(think.isFile(filePath));    //false
    //console.log(think.isExist(filePath));   //false
    /*if (think.isExist(filePath)) {
      fs.unlinkSync(filePath);

      return this.success({
        result: filePath+'is delete success'

      });
    }*/
  }

  async imgGoodsGalleryDeleteAction() {
    let data = this.post('filePath'),str = data.split('static');
    const filePath = this.config('domain.path') +str[1]
    //console.log(filePath);

    if (think.isEmpty(filePath)) {
      return this.fail('路径错误');
    }
    //console.log(fs.existsSync(filePath));
    if(fs.existsSync(filePath)){
     // console.log('11')
      fs.unlinkSync(filePath)
      this.model('goods_gallery').where({img_url: ['like', `%${data}%`]}).update({enabled: 0});
      return this.success('image is delete success');
    }
  }

  async goodsDetailPicAction() {
    const imgFile = this.file('goods_detail_pic');
    if (think.isEmpty(imgFile)) {
      return this.fail('保存失败');
    }
    const utilsSerivce =this.service('utils', 'admin');
    const that = this;
    const filename = '/static/upload/goods/' + think.uuid(32) + utilsSerivce.getImgType(imgFile);
    const is = fs.createReadStream(imgFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'goods_detail_pic',
      fileUrl: this.config('domain.name') + filename
    });
  }
  

  async categoryWapBannerPicAction() {
    //const imageFile = this.file('wap_banner_pic');
    const imgFile = this.file('file');
    if (think.isEmpty(imgFile)) {
      return this.fail('保存失败');
    }
    const utilsSerivce =this.service('utils', 'admin');
    const that = this;
    const filename = '/static/upload/category/' + think.uuid(32) + utilsSerivce.getImgType(imgFile);

    const is = fs.createReadStream(imgFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'wap_banner_url',
      fileUrl: this.config('domain.name') + filename
    });
  }

  async topicThumbAction() {
    const imgFile = this.file('scene_pic_url');
    if (think.isEmpty(imgFile)) {
      return this.fail('保存失败');
    }
    const utilsSerivce =this.service('utils', 'admin');
    const that = this;
    const filename = '/static/upload/topic/' + think.uuid(32) + utilsSerivce.getImgType(imgFile);

    const is = fs.createReadStream(imgFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'scene_pic_url',
      fileUrl: this.config('domain.name') + filename
    });
  }
};
