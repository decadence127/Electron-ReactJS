package Controllers;

import Controllers.BaseController.BaseRequestController;
import Controllers.ControllerImplementation.*;
import Models.ExecutionResponse.ErrorTransferResponseModel;
import Models.TransferModels.TransferRequestModel;
import Models.TransferModels.TransferResponseModel;
import Utils.ConstTypes;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

public class ControllerProvider {
    private List<BaseRequestController> requestControllers;

    public ControllerProvider() {

        requestControllers = new ArrayList<>();
        requestControllers.add(new LoginUserController());
        requestControllers.add(new RegistrationController());
        requestControllers.add(new CustomsGoodsCalculationController());
        requestControllers.add(new CustomsAutoCalculationController());
        requestControllers.add(new RetrieveAllUsersController());
        requestControllers.add(new AddUnitController());
        requestControllers.add(new BanUsersController());
        requestControllers.add(new PromotionController());
        requestControllers.add(new UpdateUserController());
        requestControllers.add(new UnbanUsersController());
        requestControllers.add(new RetrieveAllCategoriesController());
        requestControllers.add(new RetrieveAllUnitsController());
    }

    public TransferResponseModel Execute(TransferRequestModel clientMessage) {
        var responseModel = new TransferResponseModel();
        var errorModel = new ErrorTransferResponseModel();
        errorModel.errorMessage = "Controller not found";
        System.out.println(clientMessage.TransferObject);
        responseModel.executionCode = ConstTypes.ExecutionResult.ERROR_CODE;
        responseModel.executionResult = new Gson().toJson(errorModel);

        for (var handler : requestControllers) {
            if (handler.GetHandlerCode() == clientMessage.ActionType) {
                responseModel = handler.HandleRequest((String) clientMessage.TransferObject);
            }
        }

        return responseModel;
    }
}

