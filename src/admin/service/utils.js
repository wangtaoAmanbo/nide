const jwt = require('jsonwebtoken');
const secret = 'SLDLKKDS323ssdd@#@@gf';


const fs = require("fs");
const path = require("path");

module.exports = class extends think.Service {
  /**
   * 根据header中的X-Nideshop-Token值获取用户id
   */
  /*async getUserId(token) {
    if (!token) {
      return 0;
    }

    const result = await this.parse(token);
    if (think.isEmpty(result) || result.user_id <= 0) {
      return 0;
    }
    // console.log(result.user_id);
    return result.user_id;
  }*/

  async imgdelete(data) {
    if(data.indexOf('static') == -1){
      return data
    }
    let  str = data.split('static');
    const filePath = think.config('domain.path') +str[1]
    //console.log(filePath);

    if (think.isEmpty(filePath)) {
      //return this.fail('路径错误');
      //return this.fail('未找到图片：'+data);
      let str = '未找到图片：'+data
      return str
    }
    //console.log(fs.existsSync(filePath));
    if(fs.existsSync(filePath)){
     // console.log('11')
      fs.unlinkSync(filePath)
      //console.log('"'+data+'" image is delete success')
      //return this.success('"'+data+'" image is delete success');
    }
  }

  // 获取商品描述中img的src 链接
  getImgSrc(str) {
    let imgReg = /<img.*?(?:>|\/>)/gi;

    //匹配src属性
    let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let arr = str.match(imgReg);
    let newArr = []

    if(Array.isArray(arr)){
      for (var i = 0; i < arr.length; i++) { 
        var src = arr[i].match(srcReg); 
         //获取图片地址 
         if(src[1]){  
           newArr.push(src[1])
         }    
      }
    }
    return newArr
  }


  imgCollateTwo(imgFilePath,id,temp,newFold) { 
    //let imgFilePathInt = imgFilePath
    let str1 = imgFilePath.split('static');

    //this.config('domain.path')
    //this.config is not a function

    //think.config('domain.path')
    //let path = 'F:/nideshop-master/www/static',name = 'http://127.0.0.1:8360';
    let filePath1 = think.config('domain.path')+str1[1]
     //console.log(filePath1)
     //F:\nideshop-master\www\static\upload\goodsTemp\685ebdf0-a3dd-4e7d-93b5-978e1fb236cb.jpg

    let str2 = str1[1].split(temp);
    let filePath2 = think.config('domain.path') + str2[0]+newFold+'/'+id+str2[1]

    let filePath3 = think.config('domain.path') + str2[0]+newFold+'/'+id+'/'

    if(!think.isExist(filePath3)){
      think.mkdir(filePath3)
    }
    
    console.log(filePath2);
    console.log(filePath3);
    console.log(fs.existsSync(filePath2));

    if( fs.existsSync(filePath1) && !fs.existsSync(filePath2)){
      const is = fs.createReadStream(filePath1);
      const os = fs.createWriteStream(filePath2);
      is.pipe(os);
      console.log(filePath2)
      
      imgFilePath = think.config('domain.name')+ '/static'+str2[0]+newFold+'/'+id+str2[1]
      //console.log(imgFilePath)
      //return imgFilePath

      console.log(filePath1)
      is.on('end',function(){
        fs.unlinkSync(filePath1);    //no such file or directory, unlink 'C:\Users\ADMINI~1\AppData\Local\Temp\upload_4c47d4564115fc0cb20fb894bae5342a'
      });
      //fs.unlinkSync(filePath1)
    }
    //return true
  }

  // 将图片从临时文件夹复制到以商品id为名的文件夹中
  imgCollateOO(imgFilePath,id) { 
    let str1 = imgFilePath.split('static');

    //this.config('domain.path')
    //this.config is not a function

    //think.config('domain.path')
    //let path = 'F:/nideshop-master/www/static',name = 'http://127.0.0.1:8360';
    let filePath1 = think.config('domain.path')+str1[1]
     //console.log(filePath1)
     //F:\nideshop-master\www\static\upload\goodsTemp\685ebdf0-a3dd-4e7d-93b5-978e1fb236cb.jpg

    let str2 = str1[1].split('goodsTemp');
    let filePath2 = think.config('domain.path') + str2[0]+'goods/'+id+str2[1]

    let filePath3 = think.config('domain.path') + str2[0]+'goods/'+id+'/'

    if(!think.isExist(filePath3)){
      think.mkdir(filePath3)
    }
    
    console.log(filePath2);
    console.log(filePath3);
    console.log(fs.existsSync(filePath2));

    if( fs.existsSync(filePath1) && !fs.existsSync(filePath2)){
      const is = fs.createReadStream(filePath1);
      const os = fs.createWriteStream(filePath2);
      is.pipe(os);
      console.log(filePath2)
      
      imgFilePath = think.config('domain.name')+ '/static'+str2[0]+'goods/'+id+str2[1]
      console.log(imgFilePath)
      return imgFilePath

      //fs.unlinkSync(filePath1)
    }else{
      return imgFilePath

    }
    //return true
  }

  imgCollate(imgFilePath,id) { 
    if(imgFilePath.indexOf('goodsTemp') == -1){
      return imgFilePath
    }
    let str1 = imgFilePath.split('static');

    //this.config('domain.path')
    //this.config is not a function

    //think.config('domain.path')
    //let path = 'F:/nideshop-master/www/static',name = 'http://127.0.0.1:8360';
    let filePath1 = think.config('domain.path')+str1[1]
     //console.log(filePath1)
     //F:\nideshop-master\www\static\upload\goodsTemp\685ebdf0-a3dd-4e7d-93b5-978e1fb236cb.jpg

    let str2 = str1[1].split('goodsTemp');
    let filePath2 = think.config('domain.path') + str2[0]+'goods/'+id+str2[1]

    let filePath3 = think.config('domain.path') + str2[0]+'goods/'+id+'/'

    if(!think.isExist(filePath3)){
      think.mkdir(filePath3)
    }
    
    
    //console.log(filePath2);
    //console.log(filePath3);
   // console.log(fs.existsSync(filePath2));

    if( fs.existsSync(filePath1) && !fs.existsSync(filePath2)){
      const is = fs.createReadStream(filePath1);
      const os = fs.createWriteStream(filePath2);
      is.pipe(os);
      //console.log(filePath2)
      
     /* imgFilePath = think.config('domain.name')+ '/static'+str2[0]+'goods/'+id+str2[1]
      console.log(imgFilePath)
      return imgFilePath*/

      //fs.unlinkSync(filePath1)
    }

    imgFilePath = think.config('domain.name')+ '/static'+str2[0]+'goods/'+id+str2[1]
    console.log(imgFilePath)
    return imgFilePath
    //return true
  }

  //获取图片类型
  getImgType(imgFile) { 
    let imgType = imgFile.type.split('/')
    if(imgType[1] =='jpeg' ){
      imgType[1] =='jpg'
    }
    return '.'+imgType[1]
  }

  // 数组去重复,利用对象的属性不会重复这一特性，校验数组元素是否重复,一些特殊 类型 'true','true',true,true 可能会有问题
  /*distinct(a, b) {
    let arr = a.concat(b)*/

  distinct(arr) { 
    let result = []
    let obj = {}

    for (let i of arr) {
        if (!obj[i]) {
            result.push(i)
            obj[i] = 1
        }
    }

    return result
  }

  rmdirp(dir) {
    return new Promise((resolve, reject) => {
        fs.stat(dir, function (err, status) {
            if (status.isDirectory()) {           //是文件夹
                fs.readdir(dir, function (err, file) {
                    let res = file.map((item) => rmdirp(path.join(dir, item)))
                    Promise.all(res).then( () => { //当所有的子文件都删除后就删除当前文件夹
                        fs.rmdir(dir, resolve);
                    })
                })
            } else {
                //fs.unlink(dir, resolve);
                fs.unlinkSync(dir, resolve);
            }
        })
    })
  }

  
  deleteall(path) { 
    var files = [];  
    if(fs.existsSync(path)) {   
      files = fs.readdirSync(path);    
      files.forEach(function(file, index) {    
        var curPath = path + "/" + file;     
        if(fs.statSync(curPath).isDirectory()) {
          deleteall(curPath);     
        } else {      
          fs.unlinkSync(curPath);     
        }   
      });    
      fs.rmdirSync(path); 
    }
  };


  
};
