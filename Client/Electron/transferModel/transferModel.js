export class TransferModel {
  constructor(data, actionType) {
    this.ActionType = actionType;
    this.TransferObject = JSON.stringify(data);
  }
  get getReponse() {
    return {
      ...this.ActionType,
      ...this.TranferObject,
    };
  }
  toString() {
    JSON.stringify({ ...this.ActionType, ...this.TransferObject });
  }
}
