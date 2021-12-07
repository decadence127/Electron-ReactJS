package Controllers.ControllerImplementation;

import Context.UserContext;
import Controllers.BaseController.BaseRequestController;
import Models.EntityModel.UserEntityModel;
import Models.RequestModels.RegistrationRequestTransferModel;
import Models.RequestModels.RetrieveAllUsersRequestTransferModel;
import Models.ResponseModels.RetrieveAllUsersResponseTransferModel;
import Utils.ConstTypes;

import java.lang.reflect.Type;

public class RetrieveAllUsersController extends BaseRequestController<RetrieveAllUsersRequestTransferModel,RetrieveAllUsersResponseTransferModel> {
    @Override
    public int GetHandlerCode() {
        return ConstTypes.ActionTypes.GET_USERS_ACTION;
    }

    @Override
    public Type getIncomingModelType() {
        return RetrieveAllUsersRequestTransferModel.class;
    }

    @Override
    protected RetrieveAllUsersResponseTransferModel Execute(RetrieveAllUsersRequestTransferModel retrieveAllUsersRequestTransferModel) throws Exception {
        var usersList = UserContext.getUsers();
        System.out.println(usersList);
        RetrieveAllUsersResponseTransferModel model = new RetrieveAllUsersResponseTransferModel();
        for(var user: usersList){
            UserEntityModel userModel =new UserEntityModel();
            userModel.setName(user.getName());
            userModel.setUserRole(user.getUserRole());
            userModel.setBanned(user.getBanned());
            userModel.setEmail(user.getEmail());
            userModel.setCartId(user.getCartId());
            userModel.setLogin(user.getLogin());

            model.appendList(userModel);
        }
        return model;
    }
}
