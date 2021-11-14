class transferModel {
  constructor(data, actionType) {
    this.message = {
      data,
      actionType,
    };
  }
  get getReponse() {
    return this.response;
  }
  toString() {
    JSON.stringify(this.response);
  }
}
module.exports = transferModel;
