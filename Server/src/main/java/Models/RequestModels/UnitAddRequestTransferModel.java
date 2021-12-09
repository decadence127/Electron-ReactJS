package Models.RequestModels;

import java.util.ArrayList;

public class UnitAddRequestTransferModel {
    String unitTitle;
    String unitDesc;
    ArrayList<Number> categoryId;
    float taxValue;
    int cartId;

    public ArrayList<Number> getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(ArrayList<Number> categoryId) {
        this.categoryId = categoryId;
    }

    public int getCartId() {
        return cartId;
    }

    public void setCartId(int cartId) {
        this.cartId = cartId;
    }

    public String getUnitTitle() {
        return unitTitle;
    }

    public void setUnitTitle(String unitTitle) {
        this.unitTitle = unitTitle;
    }

    public String getUnitDesc() {
        return unitDesc;
    }

    public void setUnitDesc(String unitDesc) {
        this.unitDesc = unitDesc;
    }

    public float getTaxValue() {
        return taxValue;
    }

    public void setTaxValue(float taxValue) {
        this.taxValue = taxValue;
    }
}
