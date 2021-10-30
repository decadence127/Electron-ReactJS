package Entities;

import javax.persistence.*;

@Entity
@Table(name = "declared_unit", uniqueConstraints = {
        @UniqueConstraint(columnNames = "unit_id"),
})
public class DeclaredUnit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "unit_id", unique = true, nullable = false)
    private Integer unitId;
    @Column(name = "unit_title", unique = false, nullable = false, length = 128)
    private String unitName;
    @Column(name = "tax_value", unique = false, nullable = true, length = 12)
    private float customsValue;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "desc_id")
    private UnitDesc desc;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id")
    private CustomsCategory category;


    public DeclaredUnit(String unitName, float customsValue) {
        this.unitName = unitName;
        this.customsValue = customsValue;
    }

    public DeclaredUnit() {
    }


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

    public void setUnitDesc(UnitDesc desc) {
        this.desc = desc;
    }

    public UnitDesc getUnitDesc() {
        return desc;
    }

    public CustomsCategory getCustomsCategory() {
        return category;
    }

    public void setCustomsCategory(CustomsCategory category) {
        this.category = category;
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
                ", unitType=" + category +
                '}';
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }
}
