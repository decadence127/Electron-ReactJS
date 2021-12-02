export class ResponseModel {
  constructor(data, status) {
    this.ExecutionStatus = status;
    this.TransferObject = data;
  }
  get getReponse() {
    return {
      ...this.ExecutionStatus,
      ...this.TranferObject,
    };
  }
  toString() {
    JSON.stringify({ ...this.ExecutionStatus, ...this.TransferObject });
  }
}
