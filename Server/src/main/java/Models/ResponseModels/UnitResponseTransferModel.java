package Models.ResponseModels;

import Models.EntityModel.UnitCustomsCategoryEntityModel;
import Models.EntityModel.UnitDescEntityModel;

import java.util.ArrayList;

public class UnitResponseTransferModel {
    int id;
    String unitTitle;
    String userEmail;

    @Override
    public String toString() {
        return "UnitResponseTransferModel{" +
                "id=" + id +
                ", unitTitle='" + unitTitle + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", unitDesc='" + unitDesc + '\'' +
                ", arrivalDate='" + arrivalDate + '\'' +
                ", categoryList=" + categoryList +
                ", taxValue=" + taxValue +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    String unitDesc;
    String arrivalDate;
    ArrayList<UnitCustomsCategoryEntityModel> categoryList;
    float taxValue;

    public String getUnitTitle() {
        return unitTitle;
    }

    public void setUnitTitle(String unitTitle) {
        this.unitTitle = unitTitle;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUnitDesc() {
        return unitDesc;
    }

    public void setUnitDesc(String unitDesc) {
        this.unitDesc = unitDesc;
    }

    public String getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(String arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public ArrayList<UnitCustomsCategoryEntityModel> getCategoryList() {
        return categoryList;
    }

    public void setCategoryList(ArrayList<UnitCustomsCategoryEntityModel> categoryList) {
        this.categoryList = categoryList;
    }

    public float getTaxValue() {
        return taxValue;
    }

    public void setTaxValue(float taxValue) {
        this.taxValue = taxValue;
    }
}
