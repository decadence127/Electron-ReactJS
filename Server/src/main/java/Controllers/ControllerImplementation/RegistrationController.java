package Controllers.ControllerImplementation;

import Context.UserContext;
import Controllers.BaseController.BaseRequestController;
import Models.EntityModel.UserEntityModel;
import Models.RequestModels.RegistrationRequestTransferModel;
import Models.ResponseModels.RegistrationResponseTransferModel;
import Utils.ConstTypes;

import java.lang.reflect.Type;

public class RegistrationController extends BaseRequestController<RegistrationRequestTransferModel, RegistrationResponseTransferModel> {
    @Override
    public int GetHandlerCode() {
        return ConstTypes.ActionTypes.REGISTER_ACTION;
    }

    @Override
    public Type getIncomingModelType() {
        return RegistrationRequestTransferModel.class;
    }

    @Override
    protected RegistrationResponseTransferModel Execute(RegistrationRequestTransferModel registrationRequestTransferModel) throws Exception {
        var userCandidateByLogin = UserContext.getUserByLogin(registrationRequestTransferModel.getLogin());
        var userCandidateByEmail = UserContext.getUserByEmail(registrationRequestTransferModel.getEmail());

        if(userCandidateByLogin != null || userCandidateByEmail != null){
            throw new Exception("Пользователь с таким логином или Email уже существует");
        }

        UserEntityModel user = new UserEntityModel();
        user.setPassword(registrationRequestTransferModel.getPassword());
        user.setLogin(registrationRequestTransferModel.getLogin());
        user.setEmail(registrationRequestTransferModel.getEmail());
        user.setName(registrationRequestTransferModel.getName());
        user.setBanned(false);
        user.setUserRole(ConstTypes.UserRoles.User);

        UserContext.CreateNewUser(user);

        return new RegistrationResponseTransferModel();

    }
}
