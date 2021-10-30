package Entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "unitType")
public class UnitType {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "type_id", unique = true, nullable = false)
    private Integer typeId;
    @Column(name = "type_title", unique = false, nullable = false)
    private String title;

    public UnitType(String title, List<DeclaredUnit> declaredUnitList) {
        this.title = title;
        this.declaredUnitList = declaredUnitList;
    }
    public UnitType(String title) {
        this.title = title;
    }

    public UnitType() {

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

    @OneToMany(mappedBy = "unitType", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DeclaredUnit> declaredUnitList = new ArrayList<>();
}
