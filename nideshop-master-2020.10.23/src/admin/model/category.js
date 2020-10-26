const _ = require('lodash');

module.exports = class extends think.Model {
  

  async getCategoryfirst() {
    const firstLevel = await this.where({parent_id: 0}).select();

    return firstLevel;
  }
  
  async getCategorySecond(parentId) {
    const secondLevel = await this.where({parent_id: parentId}).select();
   

    return secondLevel;
  }


};
