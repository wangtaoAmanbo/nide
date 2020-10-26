const Base = require('./base.js');

module.exports = class extends Base {
  async loginAction() {
    //let g = think.md5('abzy520' + 'v6' + 'AE6CK5')
    //let g = think.md5('nxl721' + 'v6' + 'ED6CK5')
    //console.log(g)
    const username = this.post('username');
    const password = this.post('password');

    const admin = await this.model('admin').where({ username: username }).find();
    if (think.isEmpty(admin)) {
      return this.fail(401, '用户名或密码不正确1');
    }

    //if (think.md5(password + '' + admin.password_salt) !== admin.password) {
    if (think.md5(password + 'v6' + admin.password_salt) !== admin.password) {
      return this.fail(400, '用户名或密码不正确2');
    }

    // 更新登录信息
    await this.model('admin').where({ id: admin.id }).update({
      last_login_time: parseInt(Date.now() / 1000),
      last_login_ip: this.ctx.ip
    });

    const TokenSerivce = this.service('token', 'admin');
    const sessionKey = await TokenSerivce.create({
      user_id: admin.id
    });

    if (think.isEmpty(sessionKey)) {
      return this.fail('登录失败');
    }

    /*const userInfo = {
      id: admin.id,
      username: admin.username,
      avatar: admin.avatar,
      admin_role_id: admin.admin_role_id
    };

    return this.success({ token: sessionKey, userInfo: userInfo });
    */
    const userInfo = {
      id: admin.id,
      username: admin.username,
      avatar: admin.avatar,
      admin_role_id: admin.admin_role_id
      /*'admin-token': {
        roles: [admin.type_name],
        introduction: 'super administrator',
        avatar: admin.avatar,
        name: admin.username
      }*/
    };

    return this.success({ token: sessionKey, userInfo: userInfo });
  }


};
