class responseModel {
  constructor(data = "", actionType) {
    this.response = {
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
module.exports = responseModel;
