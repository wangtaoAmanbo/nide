const _ = require('lodash');

module.exports = class extends think.Model {
  

  async getBrandList() {
    const brand = await this.order('id ASC').select();	//DESC

    return brand;
  }
  
  


};
