class transferModel {
  constructor(data, actionType) {
    this.message = {
      data,
      actionType,
    };
  }
  get getReponse() {
    return this.message;
  }
  toString() {
    JSON.stringify(this.message);
  }
}
module.exports = transferModel;
