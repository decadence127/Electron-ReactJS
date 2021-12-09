package Models.ResponseModels;


import java.util.ArrayList;

public class RetrieveAllUnitsResponseTransferModel {
    private ArrayList<UnitResponseTransferModel> unitList;

    public RetrieveAllUnitsResponseTransferModel() {
        unitList = new ArrayList<>();
    }

    public ArrayList<UnitResponseTransferModel> getUnitsList() {
        return unitList;
    }

    public void setUnitsList(ArrayList<UnitResponseTransferModel> unitList) {
        this.unitList = unitList;
    }

    public void appendList(UnitResponseTransferModel unit) {
        unitList.add(unit);
    }
}
