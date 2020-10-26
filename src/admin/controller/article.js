const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  listAction() {
    let data =  {"code":20000,"data":{"total":123,"items":[{"id":601,"timestamp":1287072326521,"author":"Paul","reviewer":"Carol","title":"Wsn Wmcigbeit Qtjn Ece Ebmnwjq","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":81.38,"importance":1,"type":"US","status":"published","display_time":"2012-03-09 22:51:11","comment_disabled":true,"pageviews":3571,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":602,"timestamp":472083038898,"author":"Frank","reviewer":"Laura","title":"Qzcqwwxwul Okdssw Qll Snkc Pksil Yokspwaer Miykeqsp","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":2.08,"importance":3,"type":"US","status":"draft","display_time":"1973-05-23 18:52:57","comment_disabled":true,"pageviews":4910,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":603,"timestamp":1372502334803,"author":"Brian","reviewer":"Jose","title":"Vrlpfdfh Tnjnq Wivr Rfswjbv Dftilk Zibtcpl Mgayvifl Pkjgqezsl","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":77.68,"importance":3,"type":"EU","status":"published","display_time":"2014-04-14 17:58:31","comment_disabled":true,"pageviews":3447,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":604,"timestamp":1285740651636,"author":"Christopher","reviewer":"Jason","title":"Ofzoqel Vaslto Txmemxxci Uxsjkqrzk Qwisnzgetv Zyafdifhnz Cdyrxxemj","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":79.57,"importance":1,"type":"JP","status":"published","display_time":"2002-07-08 20:33:41","comment_disabled":true,"pageviews":3736,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":605,"timestamp":982371469508,"author":"Michelle","reviewer":"Dorothy","title":"Vcvvdb Gtdkfwkh Vuhih Sckibb Quewmqns Vscdsdmzj","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":97.71,"importance":3,"type":"EU","status":"deleted","display_time":"2017-10-07 16:40:59","comment_disabled":true,"pageviews":3383,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":606,"timestamp":1526808064187,"author":"Nancy","reviewer":"John","title":"Ltidyi Asq Myomayu Ftt Nkdy Potohhubyr Rpryocmd","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":54.43,"importance":2,"type":"JP","status":"published","display_time":"1973-02-09 21:12:08","comment_disabled":true,"pageviews":397,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":607,"timestamp":1269823856422,"author":"Helen","reviewer":"Michelle","title":"Wve Suww Vqryev Yeothtybpx Xesowqcd Pfyw","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":94.87,"importance":2,"type":"US","status":"deleted","display_time":"1982-11-22 08:25:31","comment_disabled":true,"pageviews":4984,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":608,"timestamp":128627872359,"author":"Matthew","reviewer":"Michael","title":"Pfnratt Rrpeqxbnxe Bpph Yojoxxfu Qmbvkpmhv Atbxrfrgg Gyswoxmlr Flitgkor Pkwcpwp","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":82.77,"importance":2,"type":"JP","status":"published","display_time":"1981-03-20 22:40:32","comment_disabled":true,"pageviews":1200,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":609,"timestamp":1045582207882,"author":"Dorothy","reviewer":"Richard","title":"Zvowp Rbdruoj Bamttv Eoifrf Bukmpe Sqnfwxtk Wxfvqt Mmclwgw","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":58.02,"importance":1,"type":"CN","status":"published","display_time":"2006-03-18 23:58:26","comment_disabled":true,"pageviews":2776,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":610,"timestamp":561087419009,"author":"Ronald","reviewer":"Jennifer","title":"Ghqqxpa Xdtp Scsrvnv Clwidcs Pxwdytym Jkpsosbsqw Fyjwjbsqms Mpqqpkpez Gfmqix Qdydtzhd","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":14.94,"importance":2,"type":"JP","status":"draft","display_time":"2011-02-20 02:02:31","comment_disabled":true,"pageviews":2804,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":611,"timestamp":414636350178,"author":"Barbara","reviewer":"Jason","title":"Xhgt Nmoyezrvf Lniat Cnaq Lpl Yuilhb Pgmneeecit Cbivmrw","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":30.99,"importance":2,"type":"CN","status":"published","display_time":"2001-06-06 02:59:36","comment_disabled":true,"pageviews":4723,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":612,"timestamp":965983682120,"author":"Sarah","reviewer":"Anthony","title":"Tfzweyh Dauegmhxa Bbqp Nyfglb Acsmskgonw Ttdlyqdpmr","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":80.48,"importance":2,"type":"CN","status":"published","display_time":"2006-03-30 03:00:59","comment_disabled":true,"pageviews":2804,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":613,"timestamp":409479770509,"author":"John","reviewer":"Jessica","title":"Dngqimdr Rlrjt Hset Nodaxdi Vgtl Pnynjlet","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":41.54,"importance":2,"type":"US","status":"draft","display_time":"1986-06-23 04:37:34","comment_disabled":true,"pageviews":4086,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":614,"timestamp":146326223435,"author":"Steven","reviewer":"Karen","title":"Sbmqgvrp Usjiy Wjgn Tdvqkys Zplynt Qyzjyljgu Bihmgrdr","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":61.28,"importance":1,"type":"US","status":"deleted","display_time":"1990-10-25 03:59:36","comment_disabled":true,"pageviews":3677,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":615,"timestamp":939302347388,"author":"Michael","reviewer":"Jeffrey","title":"Bmzscry Hpifkp Yurdyd Virilw Zjenw Jsuqskw Wujkvzyijb Wkdeuwfeo Fxxwnfb","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":84.63,"importance":3,"type":"EU","status":"draft","display_time":"2013-07-18 02:12:57","comment_disabled":true,"pageviews":1157,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":616,"timestamp":497175989881,"author":"Timothy","reviewer":"William","title":"Dqrj Ycojlyen Ngmgy Mqbmb Nbgthy Djptyhgfr Ddkxeojdo","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":100.22,"importance":1,"type":"US","status":"draft","display_time":"2003-06-24 15:00:14","comment_disabled":true,"pageviews":4192,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":617,"timestamp":347054344251,"author":"Jason","reviewer":"Thomas","title":"Qxyilscc Cccqr Qhdx Iyl Nvey Grik Kyxuivqc Izc Bwksojhic Upmynunl","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":9.33,"importance":3,"type":"EU","status":"draft","display_time":"1980-06-16 12:25:03","comment_disabled":true,"pageviews":1507,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":618,"timestamp":1202140269777,"author":"Jeffrey","reviewer":"Brenda","title":"Oieafqx Rfpvbzui Tpgyzau Jllprlyx Fis","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":67.06,"importance":3,"type":"US","status":"published","display_time":"1970-08-07 07:44:20","comment_disabled":true,"pageviews":1115,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":619,"timestamp":611186643773,"author":"Sharon","reviewer":"Nancy","title":"Cuvwpux Hofbubjfg Cmfviemukd Fibnuuqp Cun Zwhqyjch Gdckrdip Utq","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":71.74,"importance":3,"type":"JP","status":"draft","display_time":"2011-08-22 12:27:23","comment_disabled":true,"pageviews":1542,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]},{"id":620,"timestamp":1151857107227,"author":"Angela","reviewer":"Jessica","title":"Zrqt Ckaxbb Fsfczid Bfsixl Cvods Zshmnofm","content_short":"mock data","content":"<p>I am testing data, I am testing data.</p><p><img src=\"https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943\"></p>","forecast":83.63,"importance":1,"type":"EU","status":"deleted","display_time":"2000-03-28 20:19:12","comment_disabled":true,"pageviews":3494,"image_uri":"https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3","platforms":["a-platform"]}]}}
    return this.success(data);
  }

  
};