package Controllers.ControllerImplementation;

import Context.UserContext;
import Controllers.BaseController.BaseRequestController;
import Models.RequestModels.PromotionRequestTransferListModel;
import Models.RequestModels.PromotionRequestTransferModel;
import Models.ResponseModels.BanUsersResponseTransferModel;
import Models.ResponseModels.PromotionResponseTransferModel;
import Utils.ConstTypes;

import java.lang.reflect.Type;

public class PromotionController extends BaseRequestController<PromotionRequestTransferListModel, PromotionResponseTransferModel> {
    @Override
    public int GetHandlerCode() {
        return ConstTypes.ActionTypes.PROMOTION_ACTION;
    }

    @Override
    public Type getIncomingModelType() {
        return PromotionRequestTransferListModel.class;
    }

    @Override
    protected PromotionResponseTransferModel Execute(PromotionRequestTransferListModel promotionRequestTransferModel) throws Exception {
        var usersList = promotionRequestTransferModel.getUsers();
        for(var user : usersList){
            UserContext.PromoteUserByEmail(user.getUserMail(), user.getPromotionValue());
        }

        return new PromotionResponseTransferModel();
    }
}
