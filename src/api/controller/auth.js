const Base = require('./base.js');
const svgCaptcha = require('svg-captcha');

module.exports = class extends Base {
  async loginByWeixinAction() {
    const code = this.post('code');
    const fullUserInfo = this.post('userInfo');
    const clientIp = this.ctx.ip;

    // 解释用户数据
    const userInfo = await this.service('weixin', 'api').login(code, fullUserInfo);//console.log(userInfo);
    if (think.isEmpty(userInfo)) {
      return this.fail('登录失败');
    }

    // 根据openid查找用户是否已经注册
    let userId = await this.model('user').where({ weixin_openid: userInfo.openId }).getField('id', true);
    if (think.isEmpty(userId)) {
      // 注册
      userId = await this.model('user').add({
        username: '微信用户' + think.uuid(6),
        password: '',
        register_time: parseInt(new Date().getTime() / 1000),
        register_ip: clientIp,
        mobile: '',
        weixin_openid: userInfo.openId,
        avatar: userInfo.avatarUrl || '',
        gender: userInfo.gender || 1, // 性别 0：未知、1：男、2：女
        nickname: userInfo.nickName
      });
    }

    // 查询用户信息
    const newUserInfo = await this.model('user').field(['id', 'username', 'nickname', 'gender', 'avatar', 'birthday']).where({ id: userId }).find();

    // 更新登录信息
    /*userId = await this.model('user').where({ id: userId }).update({
      last_login_time: parseInt(new Date().getTime() / 1000),
      last_login_ip: clientIp
    });*/
    await this.model('user').where({ id: userId }).update({
      last_login_time: parseInt(new Date().getTime() / 1000),
      last_login_ip: clientIp
    });

    const TokenSerivce = this.service('token', 'api');
    const sessionKey = await TokenSerivce.create({ user_id: userId });

    if (think.isEmpty(newUserInfo) || think.isEmpty(sessionKey)) {
      return this.fail('登录失败');
    }

    return this.success({ token: sessionKey, userInfo: newUserInfo });
  }

  async logoutAction() {
    return this.success();
  }

  //手机登陆
  async loginAction() {
    //let g = think.md5('abzy520' + 'v6' + 'AE6CK5')
    //let g = think.md5('nxl721' + 'v6' + 'ED6CK5')
    //console.log(g)
    const username = this.post('username');
    const password = this.post('password');

    let b = !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(username)); //验证手机号码
    if (b) {
      return this.fail(401, '账号或密码不正确');
    }

    var patrn=/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;   //验证密码
    if (!patrn.exec(password) || password.length < 6 ) {
      return this.fail(400, '账号或密码不正确');
    }

    //const user = await this.model('user').where({ username: username }).find();
    const user = await this.model('user').where({ mobile: username }).find();
    if (think.isEmpty(user)) {
      return this.fail(401, '账号或密码不正确');
    }

    //if (think.md5(password + '' + admin.password_salt) !== admin.password) {
    if (think.md5(password + 'v6' ) !== user.password) {
      return this.fail(400, '账号或密码不正确');
    }
    //console.log(Date.now())
    let d = think.datetime(parseInt(Date.now()), 'YYYY-MM-DD HH:mm:ss') 
    //console.log(d)

    //return
    // 更新登录信息
    await this.model('user').where({ id: user.id }).update({
      //last_login_time: parseInt(Date.now() / 1000),
      last_login_time: d,
      last_login_ip: this.ctx.ip
    });

    const TokenSerivce = this.service('token', 'api');
    const sessionKey = await TokenSerivce.create({
      user_id: user.id
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
      id: user.id,
      username: user.username,
      mobile:username,
      nickname:user.username,
      avatar: user.avatar,
      gender: user.gender
      /*'admin-token': {
        roles: [admin.type_name],
        introduction: 'super administrator',
        avatar: admin.avatar,
        name: admin.username
      }*/
    };

    return this.success({ token: sessionKey, userInfo: userInfo });
  }


  // 图片验证码
   async imgVerifyAction() {
      // let d = think.datetime(parseInt(Date.now()), 'YYYY-MM-DD HH:mm:ss') ;
      // console.log(d);
      // return

	  	const option  = this.post();
	  	//console.log(option)

	  	/*let option  = {
	        size: 4,  //验证码长度
	        width: 200,
	        height: 150,
	        background: "#f4f3f2",//干扰线条数
	        noise: 5,
	        fontSize: 64,
	        ignoreChars: '0o1i',   //验证码字符中排除'0o1i'
	        color: true // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有 
	     },*/

	    const code = svgCaptcha.create(option);

      const cd = code.text.toLowerCase();
	    
	    // 保存到session,忽略大小写 
	    /*this.session('randomcode', code.text.toLowerCase());
	    const data = await this.session('randomcode');
	    console.log(data);*/

      // const aa = await this.cookie('randomcode', data);
      // console.log(aa);
      //console.log(think.md5('8pee'));
	    return this.success({img: code.data,char:think.md5(cd)});
	    // {data: '<svg.../svg>', text: 'abcd'}

   
  }

  //注册

  async registerAction() {
    /*const data = await this.session('randomcode');  //无法在此获取这个session
    //console.log(this.post('vCode'));
    console.log(data);

    //console.log(data+'---'+this.post('vCode'));
    //return;
    if(data != this.post('vCode')){
      return this.fail(402, '11输入正确的验证码1');
    }
    return;*/
  	const clientIp = this.ctx.ip;

    const username = this.post('username'),pass = think.md5(this.post('password') + 'v6' );
    let d = think.datetime(parseInt(Date.now()), 'YYYY-MM-DD HH:mm:ss') ;
    let values = {
    	username:username,
    	mobile:username,
    	nickname:username,
    	register_time: parseInt(new Date().getTime() / 1000),
    	//register_time: d,
      register_ip: clientIp, 

    	password:pass,
    	gender:0
    	
    }

    let  modelUser= this.model('user');
	  const user = await modelUser.where({ mobile: username }).find();
    if (!think.isEmpty(user)) {
      return this.fail(401, '该账号已注册');
    }


    let id = await modelUser.add(values);

    const TokenSerivce = this.service('token', 'api');
    const sessionKey = await TokenSerivce.create({
      user_id: id
    });

   

    const userInfo = {
      useId: id,
      username: username,
      mobile:username,
      nickname:username,
      avatar:''
      
      
    };

    return this.success({token: sessionKey,userInfo: userInfo });

   
  }
};
