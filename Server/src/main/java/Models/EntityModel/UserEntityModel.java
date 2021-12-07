package Models.EntityModel;

public class UserEntityModel {
    int Id;
    String email;
    String login;
    String password;
    String Name;
    Boolean isBanned;
    int userRole;
    int cartId;
    public UserEntityModel(){};
    public UserEntityModel(String email, String login, String password, String name, Boolean isBanned, int userRole) {
        this.email = email;
        this.login = login;
        this.password = password;
        Name = name;
        this.isBanned = isBanned;
        this.userRole = userRole;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
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
                "email='" + email + '\'' +
                ", login='" + login + '\'' +
                ", password='" + password + '\'' +
                ", Name='" + Name + '\'' +
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
