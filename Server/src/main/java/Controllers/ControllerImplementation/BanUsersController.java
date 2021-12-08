package Controllers.ControllerImplementation;

import Context.UserContext;
import Controllers.BaseController.BaseRequestController;
import Models.RequestModels.BanUsersRequestTransferModel;
import Models.ResponseModels.BanUsersResponseTransferModel;
import Utils.ConstTypes;

import java.lang.reflect.Type;

public class BanUsersController extends BaseRequestController<BanUsersRequestTransferModel, BanUsersResponseTransferModel> {
    @Override
    public int GetHandlerCode() {
        return ConstTypes.ActionTypes.BAN_USERS;
    }

    @Override
    public Type getIncomingModelType() {
        return BanUsersRequestTransferModel.class;
    }

    @Override
    protected BanUsersResponseTransferModel Execute(BanUsersRequestTransferModel banUsersRequestTransferModel) throws Exception {
        var usersList = banUsersRequestTransferModel.getEmails();

        for(var user : usersList){
            UserContext.BanUserByEmail(user);
        }
        return new BanUsersResponseTransferModel();
    }
}
