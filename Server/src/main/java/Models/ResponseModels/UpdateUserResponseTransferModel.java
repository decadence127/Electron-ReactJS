package Models.ResponseModels;

public class UpdateUserResponseTransferModel {
    int Id;
    String userEmail;
    String userLogin;
    String userPassword;
    String userName;
    Boolean isBanned;
    int userRole;
    int cartId;
    public UpdateUserResponseTransferModel(){};

    public void setId(int id) {
        Id = id;
    }

    public UpdateUserResponseTransferModel(String email, String login, String password, String name, Boolean isBanned, int userRole) {
        this.userEmail = email;
        this.userLogin = login;
        this.userPassword = password;
        userName = name;
        this.isBanned = isBanned;
        this.userRole = userRole;
    }

    public String getEmail() {
        return userEmail;
    }

    public void setEmail(String email) {
        this.userEmail = email;
    }

    public String getLogin() {
        return userLogin;
    }

    public void setLogin(String login) {
        this.userLogin = login;
    }

    public String getPassword() {
        return userPassword;
    }

    public void setPassword(String password) {
        this.userPassword = password;
    }

    public String getName() {
        return userName;
    }

    public void setName(String name) {
        userName = name;
    }

    public int getId() {
        return Id;
    }


    public Boolean getBanned() {
        return isBanned;
    }

    public void setBanned(Boolean banned) {
        isBanned = banned;
    }

    @Override
    public String toString() {
        return "UserEntityModel{" +
                "email='" + userEmail + '\'' +
                ", login='" + userLogin + '\'' +
                ", password='" + userPassword + '\'' +
                ", Name='" + userName + '\'' +
                ", isBanned=" + isBanned +
                ", userRole=" + userRole +
                ", cartId=" + cartId +
                '}';
    }

    public int getUserRole() {
        return userRole;
    }

    public void setUserRole(int userRole) {
        this.userRole = userRole;
    }

    public int getCartId() {
        return cartId;
    }

    public void setCartId(int cartId) {
        this.cartId = cartId;
    }
}
