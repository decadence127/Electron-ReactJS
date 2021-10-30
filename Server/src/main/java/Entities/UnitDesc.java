package Entities;

import javax.persistence.*;

@Entity
@Table(name = "unit_description")
public class UnitDesc {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "desc_id", unique = true, nullable = false)
    private Integer descId;
    @Column(name = "unit_desc", unique = false, nullable = true, length = 256)
    private String unitDescription;
    @Column(name = "unit_arrivalDate", unique = false, nullable = false)
    private String arrivalDate;

    @OneToOne(mappedBy = "desc", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private DeclaredUnit decUint;

    public UnitDesc(String unitDescription, String arrivalDate) {
        this.unitDescription = unitDescription;
        this.arrivalDate = arrivalDate;
    }

    public UnitDesc() {
    }

    public String getUnitDescription() {
        return unitDescription;
    }

    public void setUnitDescription(String unitDescription) {
        this.unitDescription = unitDescription;
    }

    public String getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(String arrivalDate) {
        this.arrivalDate = arrivalDate;
    }
}
