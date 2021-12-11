package Controllers.ControllerImplementation;

import Context.CategoryUnitRelationContext;
import Context.UnitContext;
import Context.UserContext;
import Controllers.BaseController.BaseRequestController;
import Models.EntityModel.UnitCustomsCategoryEntityModel;
import Models.EntityModel.UserEntityModel;
import Models.RequestModels.GetUnitsByCartRequestTransferModel;
import Models.RequestModels.RetrieveAllUnitsRequestTransferModel;
import Models.ResponseModels.GetUnitsByCartResponseTransferModel;
import Models.ResponseModels.RetrieveAllUnitsResponseTransferModel;
import Models.ResponseModels.UnitResponseTransferModel;
import Utils.ConstTypes;

import java.lang.reflect.Type;
import java.util.ArrayList;

public class GetUnitsByCartController extends BaseRequestController<GetUnitsByCartRequestTransferModel, GetUnitsByCartResponseTransferModel> {
    @Override
    public int GetHandlerCode() {
        return ConstTypes.ActionTypes.GET_USER_UNITS;
    }

    @Override
    public Type getIncomingModelType() {
        return GetUnitsByCartRequestTransferModel.class;
    }

    @Override
    protected GetUnitsByCartResponseTransferModel Execute(GetUnitsByCartRequestTransferModel getUnitsByCartRequestTransferModel) throws Exception {

        var unitList = UnitContext.getUnitsByCartId(getUnitsByCartRequestTransferModel.getCartId());
        GetUnitsByCartResponseTransferModel model = new GetUnitsByCartResponseTransferModel();
        UserEntityModel user = null;
        ArrayList<UnitCustomsCategoryEntityModel> categories = null;
        UnitResponseTransferModel unitModel = null;

        for(var unit : unitList){
            unitModel = new UnitResponseTransferModel();
            user = UserContext.getUserByCartId(unit.getCartId());
            categories = CategoryUnitRelationContext.getCategoriesByUnitId(unit.getId());
            unitModel.setId(unit.getId());
            unitModel.setUserEmail(user.getEmail());
            unitModel.setUnitDesc(unit.getUnitDesc());
            unitModel.setArrivalDate(unit.getArrivalDate());
            unitModel.setUnitTitle(unit.getUnitTitle());
            unitModel.setTaxValue(unit.getTaxValue());
            unitModel.setCategoryList(categories);

            model.appendList(unitModel);
        }
        return model;
    }
}
