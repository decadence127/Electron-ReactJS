package Models.ResponseModels;

import Models.UnitEntityResponseModel;

import java.util.ArrayList;

public class UnitListResponseTransferModel {
    private ArrayList<UnitEntityResponseModel> unitList;

    public UnitListResponseTransferModel() {
        unitList = new ArrayList<>();
    }

    public ArrayList<UnitEntityResponseModel> getUsersList() {
        return unitList;
    }

    public void setWorkersList(ArrayList<UnitEntityResponseModel> unitList) {
        this.unitList = unitList;
    }

    public void appendList(UnitEntityResponseModel unit) {
        unitList.add(unit);
    }
}
