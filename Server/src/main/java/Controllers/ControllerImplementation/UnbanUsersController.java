package Controllers.ControllerImplementation;

import Context.UserContext;
import Controllers.BaseController.BaseRequestController;
import Models.RequestModels.UnbanUsersRequestTransferModel;
import Models.ResponseModels.UnbanUsersResponseTransferModel;
import Utils.ConstTypes;

import java.lang.reflect.Type;

public class UnbanUsersController extends BaseRequestController<UnbanUsersRequestTransferModel, UnbanUsersResponseTransferModel> {
    @Override
    public int GetHandlerCode() {
        return ConstTypes.ActionTypes.UNBAN_USERS;
    }

    @Override
    public Type getIncomingModelType() {
        return UnbanUsersRequestTransferModel.class;
    }

    @Override
    protected UnbanUsersResponseTransferModel Execute(UnbanUsersRequestTransferModel unbanUsersRequestTransferModel) throws Exception {
        var usersList = unbanUsersRequestTransferModel.getEmails();

        for (var user : usersList) {
            UserContext.UnbanUserByEmail(user);
        }
        return new UnbanUsersResponseTransferModel();
    }
}

