import Controllers.DBRequestController;
import Entities.UserEntity;

public class Program {

    public static void main(String[] args) {
        UserEntity user = new UserEntity("Eugene", "decadence", "123456", "test@test.test", 1);
        DBRequestController<UserEntity> userController = new DBRequestController<UserEntity>(UserEntity.class);
        System.out.println(userController.getMyType());

        userController.showAll().forEach(userr -> System.out.println(userr.toString()));
    }
}
