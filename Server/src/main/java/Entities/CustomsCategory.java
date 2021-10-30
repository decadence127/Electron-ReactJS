package Entities;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "customs_category")
public class CustomsCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "category_id", unique = true, nullable = false)
    private Integer categoryId;
    @Column(name = "category_title", unique = false, nullable = false)
    private String title;
    @Column(name = "tax_percentage", unique = false, nullable = false)
    private Integer taxPercentage;

    public Integer getTaxPercentage() {
        return taxPercentage;
    }

    public void setTaxPercentage(Integer taxPercentage) {
        this.taxPercentage = taxPercentage;
    }


    public CustomsCategory(String title, Integer taxPercentage) {
        this.title = title;
        this.taxPercentage = taxPercentage;
    }

    public CustomsCategory() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<DeclaredUnit> getDeclaredUnitList() {
        return declaredUnitList;
    }

    public void setDeclaredUnitList(List<DeclaredUnit> declaredUnitList) {
        this.declaredUnitList = declaredUnitList;
    }

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DeclaredUnit> declaredUnitList = new ArrayList<>();
}
