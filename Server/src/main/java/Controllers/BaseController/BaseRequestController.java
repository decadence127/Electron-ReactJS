package Controllers.BaseController;

import Models.ExecutionResponse.ErrorTransferResponseModel;
import Models.ExecutionResponse.SuccessTransferResponseModel;
import Models.TransferModels.TransferResponseModel;
import Utils.ConstTypes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.lang.reflect.Type;

public abstract class BaseRequestController<RequestModel, ResponseModel> {

    public TransferResponseModel HandleRequest(String jsonModel) {
        var responseModel = new TransferResponseModel();

        try {
            Gson gson = new GsonBuilder().setDateFormat("MM.dd.yyyy").create();
            RequestModel incomingModel = gson.fromJson(jsonModel, getIncomingModelType());
            var resultModel = Execute(incomingModel);
            responseModel.executionCode = ConstTypes.ExecutionResult.SUCCESS_CODE;
            var successResultModel = new SuccessTransferResponseModel<ResponseModel>();
            successResultModel.responseModel = resultModel;

            responseModel.executionResult = gson.toJson(successResultModel);
        } catch (Exception ex) {
            responseModel.executionCode = ConstTypes.ExecutionResult.ERROR_CODE;
            var errorModel = new ErrorTransferResponseModel();
            errorModel.errorMessage = ex.getMessage();
            responseModel.executionResult = new Gson().toJson(errorModel);
        }

        return responseModel;
    }

    public abstract int GetHandlerCode();

    public abstract Type getIncomingModelType();

    protected abstract ResponseModel Execute(RequestModel model) throws Exception;
}