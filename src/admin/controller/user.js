const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    const page = this.get('page') || 1;
    const size = this.get('size') || 10;
    const name = this.get('name') || '';

    const model = this.model('user');
    //const data = await model.where({username: ['like', `%${name}%`]}).order(['id DESC']).page(page, size).countSelect();
    const data = await model.where({nickname: ['like', `%${name}%`]}).order(['id DESC']).page(page, size).countSelect();
    data.data.map((item)=>{
      item.register_time = think.datetime(item.register_time*1000, 'YYYY-MM-DD HH:mm')  //:ss
      //item.last_login_time = think.datetime(item.last_login_time*1000, 'YYYY-MM-DD HH:mm') 
    })
    //console.log(data)
    return this.success(data);
  }

  async adminUsersAction() {
    const page = this.get('page') || 1;
    const size = this.get('size') || 10;
    const name = this.get('name') || '';

    const model = this.model('admin');
    const data = await model.where({username: ['like', `%${name}%`]}).order(['id DESC']).page(page, size).countSelect();

    return this.success(data);
  }

  async infoAction() {
    const id = this.get('id');
    const model = this.model('user');
    const data = await model.where({id: id}).find();

    return this.success(data);
  }

  async info2Action() {
    const model = this.model('admin');
    const user = await model.where({id: this.ctx.state.userId}).find();

    const data = {
        roles: [user.type_name],
        introduction: '',  // super administrator 
        avatar: user.avatar,
        name: user.username
      }

    return this.success(data);
  }

  async logoutAction() {
    return this.success('Logged out');  
  }

  /*async infoAction() {
    const users = {
      'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
      },
      'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
      }
    }

    return this.success(users);
  }*/

  async storeAction() {
    if (!this.isPost) {
      return false;
    }

    const values = this.post();
    const id = this.post('id');

    const model = this.model('user');
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
    await this.model('user').where({id: id}).limit(1).delete();
    // TODO 删除图片

    return this.success();
  }

  async destoryAdminUsersAction() {
    const id = this.post('id'); //console.log(this.ctx.state.userId+'_______'+id);
    if(id>1 && this.ctx.state.userId ==1){  //删除非超级管理员 ，必须是由超级管理员操作
      await this.model('admin').where({id: id}).limit(1).delete();
      // TODO 删除图片

      return this.success('删除成功');
    }else{
      return this.fail('无操作权限');
    }
  }

};
