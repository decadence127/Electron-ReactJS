package Controllers.ControllerImplementation;

import Context.CategoryContext;
import Controllers.BaseController.BaseRequestController;
import Models.EntityModel.UnitCustomsCategoryEntityModel;
import Models.RequestModels.CreateCategoryRequestTransferModel;
import Models.RequestModels.DeleteCategoryRequestTransferModel;
import Models.ResponseModels.CreateCategoryResponseTransferModel;
import Models.ResponseModels.DeleteCategoryResponseTransferModel;
import Utils.ConstTypes;

import java.lang.reflect.Type;

public class DeleteCategoryController extends BaseRequestController<DeleteCategoryRequestTransferModel, DeleteCategoryResponseTransferModel> {
    @Override
    public int GetHandlerCode() {
        return ConstTypes.ActionTypes.DELETE_CATEGORY;
    }

    @Override
    public Type getIncomingModelType() {
        return DeleteCategoryRequestTransferModel.class;
    }

    @Override
    protected DeleteCategoryResponseTransferModel Execute(DeleteCategoryRequestTransferModel deleteCategoryRequestTransferModel) throws Exception {
        CategoryContext.DeleteCategoryById(deleteCategoryRequestTransferModel.getId());

        return new DeleteCategoryResponseTransferModel();
    }
}
