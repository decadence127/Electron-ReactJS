package Controllers.ControllerImplementation;

import Context.UserContext;
import Controllers.BaseController.BaseRequestController;
import Models.RequestModels.LoginRequestTransferModel;
import Models.ResponseModels.LoginResponseTransferModel;
import Utils.ConstTypes;

import java.lang.reflect.Type;

public class LoginUserController extends BaseRequestController<LoginRequestTransferModel, LoginResponseTransferModel> {
    @Override
    public int GetHandlerCode() {
        return ConstTypes.ActionTypes.LOGIN_ACTION;
    }

    @Override
    public Type getIncomingModelType() {
        return LoginRequestTransferModel.class;
    }

    @Override
    protected LoginResponseTransferModel Execute(LoginRequestTransferModel loginRequestTransferModel) throws Exception {
        var candidateUser = UserContext.getUserByLogin(loginRequestTransferModel.getLogin());

        if (candidateUser == null) {
            var candidateUserEmail = UserContext.getUserByEmail(loginRequestTransferModel.getLogin());

            if(candidateUserEmail != null)
            {
                candidateUser = candidateUserEmail;
            }else{
                throw new Exception("Логин или пароль введены неверно");
            }
        }

        if (!candidateUser.getPassword().equals(loginRequestTransferModel.getPassword())) {
            throw new Exception("Пароль был введен не верно");
        }

        if (candidateUser.getBanned()) {
            throw new Exception("Этот аккаунт был заблокирован");
        }

        LoginResponseTransferModel model = new LoginResponseTransferModel();
        model.setUserLogin(candidateUser.getLogin() == null ? candidateUser.getEmail() : candidateUser.getLogin());
        model.setUserId(candidateUser.getId());
        model.setUserRole(candidateUser.getUserRole());
        model.setCartId(candidateUser.getCartId());
        model.setUserName(candidateUser.getName());
        model.setBanned(candidateUser.getBanned());
        return model;
    }
}
