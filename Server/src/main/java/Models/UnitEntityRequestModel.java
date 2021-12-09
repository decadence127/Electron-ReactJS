package Models;

import java.util.ArrayList;

public class UnitEntityRequestModel {
    float taxValue;
    String unitTitle;
    String unitDesc;
    String arrivalDate;
    int unitDescId;
    int cartId;
    ArrayList<Integer> categories;

    public ArrayList<Integer> getCategories() {
        return categories;
    }

    public void setCategoryId(ArrayList<Integer> categories) {
        this.categories = categories;
    }

    public String getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(String arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public int getUnitDescId() {
        return unitDescId;
    }

    public void setUnitDescId(int unitDescId) {
        this.unitDescId = unitDescId;
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
