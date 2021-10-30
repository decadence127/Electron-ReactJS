package Entities;

import javax.persistence.*;

@Entity
@Table(name="declaredUnit", uniqueConstraints = {
        @UniqueConstraint(columnNames = "UNIT_ID"),
})
public class DeclaredUnit {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "UNIT_ID", unique = true, nullable = false)
    private Integer unitId;
    @Column(name="DEC_UNIT_NAME", unique = false, nullable = false, length = 128)
    private String unitName;
    @Column(name="TAX_VALUE", unique = false, nullable = true, length = 12)
    private float customsValue;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="cart_id")
    private Cart cart;

    @OneToOne(fetch = FetchType.LAZY, cascade=CascadeType.ALL)
    @JoinColumn(name = "desc_id")
    private UnitDesc desc;

    @ManyToOne(cascade=CascadeType.ALL)
    private UnitType unitType;


    public DeclaredUnit( String unitName, float customsValue) {
        this.unitName = unitName;
        this.customsValue = customsValue;
    }
    public DeclaredUnit(){}


    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public float getCustomsValue() {
        return customsValue;
    }

    public void setCustomsValue(float customsValue) {
        this.customsValue = customsValue;
    }

    public void setUnitDesc(UnitDesc desc){
        this.desc = desc;
    }
    public UnitDesc getUnitDesc(){
        return desc;
    }
    public UnitType getUnitType() {
        return unitType;
    }

    public void setUnitType(UnitType unitType) {
        this.unitType = unitType;
    }

    public Cart getCart() {
        return cart;
    }

    @Override
    public String toString() {
        return "DeclaredUnit{" +
                "unitId=" + unitId +
                ", unitName='" + unitName + '\'' +
                ", customsValue=" + customsValue +
                ", unitType=" + unitType +
                '}';
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }
}
