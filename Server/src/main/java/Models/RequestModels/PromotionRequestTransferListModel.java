package Models.RequestModels;

import java.util.ArrayList;

public class PromotionRequestTransferListModel {
    ArrayList<PromotionRequestTransferModel> users;

    public ArrayList<PromotionRequestTransferModel> getUsers() {
        return users;
    }

    public void setUsers(ArrayList<PromotionRequestTransferModel> emails) {
        this.users = emails;
    }
}
