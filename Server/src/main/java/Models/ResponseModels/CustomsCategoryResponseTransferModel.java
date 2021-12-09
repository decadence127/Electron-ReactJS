package Models.ResponseModels;

import Models.EntityModel.UnitCustomsCategoryEntityModel;
import Models.EntityModel.UnitEntityModel;

import java.util.ArrayList;

public class CustomsCategoryResponseTransferModel {
    private ArrayList<UnitCustomsCategoryEntityModel> categoryList;

    public CustomsCategoryResponseTransferModel() {
        categoryList = new ArrayList<>();
    }

    public ArrayList<UnitCustomsCategoryEntityModel> getCategoryList() {
        return categoryList;
    }

    public void setUnitsList(ArrayList<UnitCustomsCategoryEntityModel> categoryList) {
        this.categoryList = categoryList;
    }

    public void appendList(UnitCustomsCategoryEntityModel category) {
        categoryList.add(category);
    }
}
