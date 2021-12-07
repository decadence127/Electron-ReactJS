package Models.TransferModels;


public class TransferResponseModel {
    public int executionCode;
    public String executionResult;

    public TransferResponseModel(int executionCode, String executionResult) {
        this.executionCode = executionCode;
        this.executionResult = executionResult;
    }
    public TransferResponseModel(){}
}