// default config
module.exports = {
  default_module: 'api',
 /* weixin: {
    appid: 'wx65f67b230113f6fb', // 小程序 appid            wx71766143b73f03dc
    secret: '7027f175c558c90b8a3fb29d3dd79ec5', // 小程序密钥     a9e49558f3d14cfaadeed33a9b4ae688
    mch_id: '', // 商户帐号ID
    partner_key: '', // 微信支付密钥
    notify_url: '' // 微信异步通知，例：https://www.nideshop.com/api/pay/notify
  },*/
  weixin: {
    appid: 'wx45577ca2497aac24', // 小程序 appid           
    secret: '4403409305066138f418905d4c3436b8', // 小程序密钥   
    mch_id: '1447153902', // 商户帐号ID
    partner_key: 'xiZHaMb2ySbmUGxxvRZlNHZgnPXe9cnw', // 微信支付密钥
    //notify_url: 'https://www.yzwrwx.com:9090/api/pay/notify' // 微信异步通知，例：https://www.nideshop.com/api/pay/notify
    notify_url: 'http://127.0.0.1:8360/api/pay/notify'
  },
  express: {
    // 快递物流信息查询使用的是快递鸟接口，申请地址：http://www.kdniao.com/
    appid: '1583013', // 对应快递鸟用户后台 用户ID
    appkey: '26ae3c9a-5c6e-4298-a01a-3718a1120ed1', // 对应快递鸟用户后台 API key
    request_url: 'http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx'
  }
  ,domain:{
    name:'http://127.0.0.1:8360',     //正式环境需换成域名如 https://www.yzwrwx.com:9090  http://193.112.212.101:8360
    ip:'193.112.212.101',
    path:'F:/nideshop-master/www/static'
  }
};
