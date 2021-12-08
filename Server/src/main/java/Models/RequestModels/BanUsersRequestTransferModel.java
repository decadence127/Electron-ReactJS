package Models.RequestModels;

import java.util.ArrayList;

public class BanUsersRequestTransferModel {
    ArrayList<String> emails;

    public ArrayList<String> getEmails() {
        return emails;
    }

    public void setEmails(ArrayList<String> emails) {
        this.emails = emails;
    }
}
