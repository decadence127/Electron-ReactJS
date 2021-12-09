package Controllers.ControllerImplementation;

import Context.CategoryContext;
import Controllers.BaseController.BaseRequestController;
import Models.EntityModel.UnitCustomsCategoryEntityModel;
import Models.RequestModels.RetrieveAllCategoriesRequestTransferModel;
import Models.ResponseModels.RetrieveAllCategoriesResponseTransferModel;
import Utils.ConstTypes;

import java.lang.reflect.Type;

public class RetrieveAllCategoriesController extends BaseRequestController<RetrieveAllCategoriesRequestTransferModel, RetrieveAllCategoriesResponseTransferModel> {
    @Override
    public int GetHandlerCode() {
        return ConstTypes.ActionTypes.RETRIEVE_ALL_CATEGORIES;
    }

    @Override
    public Type getIncomingModelType() {
        return RetrieveAllCategoriesRequestTransferModel.class;
    }

    @Override
    protected RetrieveAllCategoriesResponseTransferModel Execute(RetrieveAllCategoriesRequestTransferModel customsCategoryRequestTransferModel) throws Exception {
        var categoriesList = CategoryContext.getCategories();
        System.out.println(categoriesList);
        RetrieveAllCategoriesResponseTransferModel model = new RetrieveAllCategoriesResponseTransferModel();
        for (var category : categoriesList) {
            UnitCustomsCategoryEntityModel categoryEntityModel = new UnitCustomsCategoryEntityModel();
            categoryEntityModel.setCategory(category.getCategory());
            categoryEntityModel.setTaxPercentage(category.getTaxPercentage());
            categoryEntityModel.setId(category.getId());
            model.appendList(categoryEntityModel);
        }
        return model;
    }
}

