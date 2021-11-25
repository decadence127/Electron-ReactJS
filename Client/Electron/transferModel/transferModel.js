class transferModel {
  constructor(data, actionType) {
    this.message = {
      data,
      actionType,
    };
  }
  get getReponse() {
<<<<<<< HEAD
    return this.response;
  }
  toString() {
    JSON.stringify(this.response);
=======
    return this.message;
  }
  toString() {
    JSON.stringify(this.message);
>>>>>>> BackEnd/backend_1
  }
}
module.exports = transferModel;
