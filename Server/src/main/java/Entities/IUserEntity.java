package Entities;


import java.util.List;

public interface IUserEntity {
    void DeleteUserRequest(Integer userId);
    void UpdateUserRequest(UserEntity userModel);
    void CreateUserRequest();
    List<UserEntity> GetAllUsersRequest();
}
