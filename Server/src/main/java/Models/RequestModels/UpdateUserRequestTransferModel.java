package Models.RequestModels;

public class UpdateUserRequestTransferModel {
    int id;
    String userName;
    String userPassword;
    String userLogin;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return userName;
    }

    public void setName(String name) {
        this.userName = name;
    }

    public String getPassword() {
        return userPassword;
    }

    public void setPassword(String password) {
        this.userPassword = password;
    }

    public String getLogin() {
        return userLogin;
    }

    public void setLogin(String login) {
        this.userLogin = login;
    }
}
