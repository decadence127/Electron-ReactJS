package Entities;

import javax.persistence.*;
import javax.swing.text.DefaultCaret;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "cart_id", unique = true, nullable = false)
    private Integer cart_id;
    @OneToOne(mappedBy = "cart", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private UserEntity user;

    @OneToMany(mappedBy = "cart", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<DeclaredUnit> units = new ArrayList<>();

    public Cart(List<DeclaredUnit> units) {
        this.units = units;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "cartId=" + cart_id +
                '}';
    }

    public Cart() {
    }

    public List<DeclaredUnit> getDeclaredUnits() {
        return units;
    }

    public void setItems(List<DeclaredUnit> units) {
        this.units = units;
    }

}
