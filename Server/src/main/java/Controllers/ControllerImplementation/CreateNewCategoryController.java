package Controllers.ControllerImplementation;

import Context.CategoryContext;
import Controllers.BaseController.BaseRequestController;
import Models.EntityModel.UnitCustomsCategoryEntityModel;
import Models.RequestModels.CreateCategoryRequestTransferModel;
import Models.ResponseModels.CreateCategoryResponseTransferModel;
import Utils.ConstTypes;

import java.lang.reflect.Type;

public class CreateNewCategoryController extends BaseRequestController<CreateCategoryRequestTransferModel, CreateCategoryResponseTransferModel> {
    @Override
    public int GetHandlerCode() {
        return ConstTypes.ActionTypes.CREATE_CATEGORY;
    }

    @Override
    public Type getIncomingModelType() {
        return CreateCategoryRequestTransferModel.class;
    }

    @Override
    protected CreateCategoryResponseTransferModel Execute(CreateCategoryRequestTransferModel createCategoryRequestTransferModel) throws Exception {
        if(createCategoryRequestTransferModel.getCategoryTitle() == null || createCategoryRequestTransferModel.getTaxPercentage() == null){
            throw new Exception("Не оставляйте поля пустыми");
        }
        UnitCustomsCategoryEntityModel model = new UnitCustomsCategoryEntityModel();
        model.setCategory(createCategoryRequestTransferModel.getCategoryTitle());
        model.setTaxPercentage(createCategoryRequestTransferModel.getTaxPercentage());
        CategoryContext.CreateNewCategory(model);

        return new CreateCategoryResponseTransferModel();
    }
}
