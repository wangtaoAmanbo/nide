const Base = require('./base.js');
const fs = require('fs');
const _ = require('lodash');

module.exports = class extends Base {
  async imgQrCodeAction() {
    //return this.success('uuooo');
    //return this.success(this.ctx.body.imgData+'mm');
     //return this.success(this.ctx.req.imgData+'mm');
     //return this.success(this.post('imgData')+'mm');
     var imgData = this.post('imgData');
    //var imgData = this.ctx.body.imgData;
    //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    console.log(dataBuffer);
    //fs.writeFile(think.RESOURCE_PATH + "/static/user/qr.png", dataBuffer, function(err) {
    fs.writeFile("F:/nideshop-master/www/static/user/qr.png", dataBuffer, function(err) {
    //fs.writeFile(think.RESOURCE_PATH+"/www/static/user/qr.png", dataBuffer, function(err) {
        if(err){
          console.log(err)
          return this.fail('保存失败');
        }else{
          console.log('保存图片成功') 
          return this.success();
        }
    });
  }
  /*
  var imgData = req.body.imgData;
    //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile("image.png", dataBuffer, function(err) {
        if(err){ 
          res.send(err);
        }else{
          res.send("保存成功！");
        }
    });


  */

  /**
   * 保存用户头像
   * @returns {Promise.<void>}
   */
  async saveAvatarAction() {
    const avatar = this.file('avatar');
    if (think.isEmpty(avatar)) {
      return this.fail('保存失败');
    }

    const avatarPath = think.RESOURCE_PATH + `/static/user/avatar/${this.getLoginUserId()}.` + _.last(_.split(avatar.path, '.'));

    fs.rename(avatar.path, avatarPath, function(res) {
      return this.success();
    });
  }
};
