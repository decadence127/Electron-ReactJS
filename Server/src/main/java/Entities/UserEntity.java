package Entities;

import Utils.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;

import javax.persistence.*;
import java.util.List;

@Entity
public class UserEntity implements IUserEntity{
    private String userName;
    private String userLogin;
    private String userPassword;
    private String userEmail;

    private Integer userRole;
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer userId;

    public UserEntity(String userName, String userLogin, String userPassword, String userEmail, Integer userRole) {
        this.userName = userName;
        this.userLogin = userLogin;
        this.userPassword = userPassword;
        this.userEmail = userEmail;
        this.userRole = userRole;
    }

    public UserEntity() {}


    @Override
    public List<UserEntity> GetAllUsersRequest() {
        String hql = "from UserEntity";
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.getTransaction().begin();
        List<UserEntity> users = session.createQuery(hql).getResultList();
        session.getTransaction().commit();
        return users;
    }
    @Override
    public void DeleteUserRequest(Integer userId) {

    }


    @Override
    public void CreateUserRequest() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();
        session.save(this);
        transaction.commit();
        session.close();
    }

    @Override
    public void UpdateUserRequest(UserEntity user) {

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
