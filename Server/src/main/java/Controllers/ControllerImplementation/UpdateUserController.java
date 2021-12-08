package Controllers.ControllerImplementation;

import Context.UserContext;
import Controllers.BaseController.BaseRequestController;
import Models.RequestModels.UpdateUserRequestTransferModel;
import Models.ResponseModels.UpdateUserResponseTransferModel;
import Utils.ConstTypes;

import java.lang.reflect.Type;

public class UpdateUserController extends BaseRequestController<UpdateUserRequestTransferModel, UpdateUserResponseTransferModel> {
    @Override
    public int GetHandlerCode() {
        return ConstTypes.ActionTypes.EDIT_USER;
    }

    @Override
    public Type getIncomingModelType() {
        return UpdateUserRequestTransferModel.class;
    }

    @Override
    protected UpdateUserResponseTransferModel Execute(UpdateUserRequestTransferModel updateUserRequestTransferModel) throws Exception {
        var user = UserContext.getUserById(updateUserRequestTransferModel.getId());
        if (user == null) {
            throw new Exception("Такого пользователя не существует");
        }
        user.setLogin(updateUserRequestTransferModel.getLogin());
        user.setPassword(updateUserRequestTransferModel.getPassword());
        user.setName(updateUserRequestTransferModel.getName());
        UserContext.UpdateUserById(user);

        UpdateUserResponseTransferModel model = new UpdateUserResponseTransferModel();
        model.setBanned(user.getBanned());
        model.setUserRole(user.getUserRole());
        model.setCartId(user.getCartId());
        model.setEmail(user.getEmail());
        model.setId(user.getId());
        model.setName(user.getName());
        model.setPassword(user.getPassword());
        model.setLogin(user.getLogin());
        System.out.println(model);
        return model;
    }
}
