package Models;

public class UnitEntityResponseModel {
    int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    float taxValue;
    String unitTitle;
    String unitDesc;
    String arrivalDate;
    int cartId;

    @Override
    public String toString() {
        return "UnitEntityResponseModel{" +
                "id=" + id +
                ", taxValue=" + taxValue +
                ", unitTitle='" + unitTitle + '\'' +
                ", unitDesc='" + unitDesc + '\'' +
                ", arrivalDate='" + arrivalDate + '\'' +
                ", cartId=" + cartId +
                '}';
    }

    public String getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(String arrivalDate) {
        this.arrivalDate = arrivalDate;
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
