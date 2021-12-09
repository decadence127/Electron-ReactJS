package Controllers.ControllerImplementation;

import Context.CategoryUnitRelationContext;
import Context.UnitContext;
import Context.UserContext;
import Controllers.BaseController.BaseRequestController;
import Models.EntityModel.UnitCustomsCategoryEntityModel;
import Models.EntityModel.UserEntityModel;
import Models.RequestModels.RetrieveAllUnitsRequestTransferModel;
import Models.ResponseModels.RetrieveAllUnitsResponseTransferModel;

import Models.ResponseModels.UnitResponseTransferModel;
import Utils.ConstTypes;

import java.lang.reflect.Array;
import java.lang.reflect.Type;
import java.util.ArrayList;

public class RetrieveAllUnitsController extends BaseRequestController<RetrieveAllUnitsRequestTransferModel, RetrieveAllUnitsResponseTransferModel> {
    @Override
    public int GetHandlerCode() {
        return ConstTypes.ActionTypes.GET_UNITS;
    }

    @Override
    public Type getIncomingModelType() {
        return RetrieveAllUnitsRequestTransferModel.class;
    }

    @Override
    protected RetrieveAllUnitsResponseTransferModel Execute(RetrieveAllUnitsRequestTransferModel retrieveAllUnitsRequestTransferModel) throws Exception {
        var unitList = UnitContext.getUnits();
        RetrieveAllUnitsResponseTransferModel model = new RetrieveAllUnitsResponseTransferModel();
        UserEntityModel user = null;
        ArrayList<UnitCustomsCategoryEntityModel> categories = null;
        UnitResponseTransferModel unitModel = new UnitResponseTransferModel();
        for(var unit : unitList){
          user = UserContext.getUserByCartId(unit.getCartId());
          categories = CategoryUnitRelationContext.getCategoriesByUnitId(unit.getId());
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
