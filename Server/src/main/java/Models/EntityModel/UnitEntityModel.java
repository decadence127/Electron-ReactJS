package Models.EntityModel;

public class UnitEntityModel{
    float taxValue;
    String unitTitle;
    int cartId;
    int categoryId;
    int unitDescId;

    public String getUnitTitle() {
        return unitTitle;
    }

    public void setUnitTitle(String unitTitle) {
        this.unitTitle = unitTitle;
    }

    public int getCartId() {
        return cartId;
    }

    public void setCartId(int cartId) {
        this.cartId = cartId;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public int getUnitDescId() {
        return unitDescId;
    }

    public void setUnitDescId(int unitDescId) {
        this.unitDescId = unitDescId;
    }

    public float getTaxValue() {
        return taxValue;
    }

    public void setTaxValue(float taxValue) {
        this.taxValue = taxValue;
    }
}
