import Context.PostgresContext;
import Context.UserContext;
import Models.EntityModel.UserEntityModel;
import Utils.ConstTypes;


import java.io.IOException;
import java.sql.SQLException;


public class Program {
    public static void main(String[] args) throws SQLException, IOException {
        PostgresContext context = PostgresContext.getInstance();
//        UserEntityModel user = new UserEntityModel("test2@email.com", "cooluser", "12354", "Ivan", false, ConstTypes.UserRoles.Operator);
//        UserContext.CreateNewUser(user);
        System.out.println(UserContext.getUserById(2));

    }
}