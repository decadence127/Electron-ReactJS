package Entities;

import javax.persistence.*;


@Entity
@Table(name = "userEntity", uniqueConstraints = {
        @UniqueConstraint(columnNames = "UserId"),
        @UniqueConstraint(columnNames = "userEmail")
})
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userId", unique = true, nullable = false)
    private Integer userId;

    @Column(name = "userName", unique = false, nullable = false, length = 36)
    private String userName;
    @Column(name = "userLogin", unique = false, nullable = false, length = 36)
    private String userLogin;
    @Column(name = "userPassword", unique = false, nullable = false, length = 24)
    private String userPassword;
    @Column(name = "userEmail", unique = true, nullable = false, length = 100)
    private String userEmail;
    @Column(name = "userRole", unique = false, nullable = false)
    private Integer userRole;
    @JoinColumn(name = "cartId")
    @OneToOne(fetch = FetchType.LAZY)
    private Cart cart;


    public UserEntity(String userName, String userLogin, String userPassword, String userEmail, Integer userRole, Cart cart) {
        this.userName = userName;
        this.userLogin = userLogin;
        this.userPassword = userPassword;
        this.userEmail = userEmail;
        this.userRole = userRole;
        this.cart = cart;
    }

    public UserEntity() {
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public String toString() {
        return "UserEntity{" +
                "userName='" + userName + '\'' +
                ", userLogin='" + userLogin + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", userRole=" + userRole +
                ", userId=" + userId +
                ", cart=" + cart +
                '}';
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Integer getUserRole() {
        return userRole;
    }

    public void setUserRole(Integer userRole) {
        this.userRole = userRole;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }


}
