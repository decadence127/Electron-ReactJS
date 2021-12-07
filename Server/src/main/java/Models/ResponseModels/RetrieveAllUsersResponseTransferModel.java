package Models.ResponseModels;

import Models.EntityModel.UserEntityModel;

import java.util.ArrayList;

public class RetrieveAllUsersResponseTransferModel {
    private ArrayList<UserEntityModel> userList;

    public RetrieveAllUsersResponseTransferModel() {
        userList = new ArrayList<>();
    }

    public ArrayList<UserEntityModel> getUsersList() {
        return userList;
    }

    public void setWorkersList(ArrayList<UserEntityModel> userList) {
        this.userList = userList;
    }

    public void appendList(UserEntityModel user) {
        userList.add(user);
    }
}
