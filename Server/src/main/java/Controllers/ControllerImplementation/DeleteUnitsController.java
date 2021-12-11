package Controllers.ControllerImplementation;

import Context.UnitContext;
import Context.UserContext;
import Controllers.BaseController.BaseRequestController;
import Models.RequestModels.BanUsersRequestTransferModel;
import Models.RequestModels.DeleteUnitsRequestTransferModel;
import Models.ResponseModels.BanUsersResponseTransferModel;
import Models.ResponseModels.DeleteUnitsResponseTransferModel;
import Utils.ConstTypes;

import java.lang.reflect.Type;

public class DeleteUnitsController extends BaseRequestController<DeleteUnitsRequestTransferModel, DeleteUnitsResponseTransferModel> {
    @Override
    public int GetHandlerCode() {
        return ConstTypes.ActionTypes.DELETE_ITEMS;
    }

    @Override
    public Type getIncomingModelType() {
        return DeleteUnitsRequestTransferModel.class;
    }

    @Override
    protected DeleteUnitsResponseTransferModel Execute(DeleteUnitsRequestTransferModel deleteUnitsResponseTransferModel) throws Exception {
        var unitListIds = deleteUnitsResponseTransferModel.getIds();

        for(var id : unitListIds){
            UnitContext.DeleteUnitById(id);
        }
        return new DeleteUnitsResponseTransferModel();
    }
}
