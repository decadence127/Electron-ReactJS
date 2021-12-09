package Controllers.ControllerImplementation;

import Context.CategoryContext;
import Context.CategoryUnitRelationContext;
import Context.UnitContext;
import Context.UserContext;
import Controllers.BaseController.BaseRequestController;
import Models.EntityModel.UserEntityModel;
import Models.RequestModels.UnitAddRequestTransferModel;
import Models.ResponseModels.RegistrationResponseTransferModel;
import Models.ResponseModels.UnitAddResponseTransferModel;
import Models.UnitEntityRequestModel;
import Utils.ConstTypes;

import java.lang.reflect.Type;

public class AddUnitController extends BaseRequestController<UnitAddRequestTransferModel, UnitAddResponseTransferModel> {
    @Override
    public int GetHandlerCode() {
        return ConstTypes.ActionTypes.ADD_UNIT;
    }

    @Override
    public Type getIncomingModelType() {
        return UnitAddRequestTransferModel.class;
    }

    @Override
    protected UnitAddResponseTransferModel Execute(UnitAddRequestTransferModel unitAddRequestTransferModel) throws Exception {
        UnitEntityRequestModel unit = new UnitEntityRequestModel();
        unit.setUnitDesc(unitAddRequestTransferModel.getUnitDesc());
        unit.setTaxValue(unitAddRequestTransferModel.getTaxValue());
        unit.setUnitTitle(unitAddRequestTransferModel.getUnitTitle());
        unit.setCartId(unitAddRequestTransferModel.getCartId());

        return new UnitAddResponseTransferModel();
    }
}
