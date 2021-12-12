package Controllers.ControllerImplementation;

import Context.UnitContext;
import Context.UserContext;
import Controllers.BaseController.BaseRequestController;
import Models.RequestModels.UpdateUnitRequestTransferModel;
import Models.ResponseModels.UpdateUnitResponseTransferModel;
import Utils.ConstTypes;

import java.lang.reflect.Type;

public class UpdateUnitController extends BaseRequestController<UpdateUnitRequestTransferModel, UpdateUnitResponseTransferModel> {
    @Override
    public int GetHandlerCode() {
        return ConstTypes.ActionTypes.UPDATE_UNIT;
    }

    @Override
    public Type getIncomingModelType() {
        return UpdateUnitRequestTransferModel.class;
    }

    @Override
    protected UpdateUnitResponseTransferModel Execute(UpdateUnitRequestTransferModel updateUnitRequestTransferModel) throws Exception {
        var unit = UnitContext.getUnitsById(updateUnitRequestTransferModel.getId());
        if (unit == null) {
            throw new Exception("Такого пользователя не существует");
        }
        if(updateUnitRequestTransferModel.getUnitTitle() == ""){
            throw new Exception("Введите новое наименование");
        }
        unit.setId(updateUnitRequestTransferModel.getId());
        
        unit.setUnitDesc(updateUnitRequestTransferModel.getUnitDesc());
        unit.setUnitTitle(updateUnitRequestTransferModel.getUnitTitle());
        UnitContext.updateUnitById(unit);
        return new UpdateUnitResponseTransferModel();
    }
}
