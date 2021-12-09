package Models.ResponseModels;

import Models.EntityModel.UnitCustomsCategoryEntityModel;
import Models.EntityModel.UnitEntityModel;

import java.util.ArrayList;

public class RetrieveAllCategoriesResponseTransferModel {
    private ArrayList<UnitCustomsCategoryEntityModel> categoriesList;

    public RetrieveAllCategoriesResponseTransferModel() {
        categoriesList = new ArrayList<>();
    }

    public ArrayList<UnitCustomsCategoryEntityModel> getUnitsList() {
        return categoriesList;
    }

    public void setUnitsList(ArrayList<UnitCustomsCategoryEntityModel> categoriesList) {
        this.categoriesList = categoriesList;
    }

    public void appendList(UnitCustomsCategoryEntityModel unit) {
        categoriesList.add(unit);
    }
}
