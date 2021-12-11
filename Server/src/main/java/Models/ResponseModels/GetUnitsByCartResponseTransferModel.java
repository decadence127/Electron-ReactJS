package Models.ResponseModels;

import java.util.ArrayList;

public class GetUnitsByCartResponseTransferModel {
    private ArrayList<UnitResponseTransferModel> unitList;


    public GetUnitsByCartResponseTransferModel() {
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
