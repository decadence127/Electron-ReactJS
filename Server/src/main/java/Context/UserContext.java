package Context;

import Models.EntityModel.UserEntityModel;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class UserContext {
    private static final String sqlUserTable = "\"customsSchema\".\"Users\"";
    private static final String sqlCartTable = "\"customsSchema\".\"Cart\"";

    public static ArrayList<UserEntityModel> getUsers() throws SQLException {
        var connection = PostgresContext.getInstance().getConnection();
        String sql = "SELECT * FROM %s".formatted(sqlUserTable);

        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        ResultSet resultSet = preparedStatement.executeQuery();
        ArrayList<UserEntityModel> users = new ArrayList<>();

        while (resultSet.next()) {
            UserEntityModel user = new UserEntityModel();
            user.setName(resultSet.getString("Name"));
            user.setLogin(resultSet.getString("Login"));
            user.setPassword(resultSet.getString("Password"));
            user.setEmail(resultSet.getString("Email"));
            user.setBanned(resultSet.getBoolean("Banned"));
            user.setUserRole(resultSet.getInt("Role"));
            user.setCartId(resultSet.getInt("CartId"));

            users.add(user);
        }

        return users;
    }
    public static UserEntityModel getUserByEmail(String email) throws SQLException {
        var connection = PostgresContext.getInstance().getConnection();
        String sql = "SELECT * FROM %s WHERE \"Email\" = ?".formatted(sqlUserTable);

        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1, email);

        ResultSet resultSet = preparedStatement.executeQuery();

        UserEntityModel user = null;
        while (resultSet.next()) {
            user = new UserEntityModel();
            user.setName(resultSet.getString("Name"));
            user.setLogin(resultSet.getString("Login"));
            user.setPassword(resultSet.getString("Password"));
            user.setEmail(resultSet.getString("Email"));
            user.setBanned(resultSet.getBoolean("Banned"));
            user.setUserRole(resultSet.getInt("Role"));
            user.setCartId(resultSet.getInt("CartId"));
        }
        return user;
    }

    public static UserEntityModel getUserByLogin(String login) throws SQLException {
        var connection = PostgresContext.getInstance().getConnection();
        String sql = "SELECT * FROM %s WHERE \"Login\" = ?".formatted(sqlUserTable);

        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1, login);

        ResultSet resultSet = preparedStatement.executeQuery();
        UserEntityModel user = null;
        while (resultSet.next()) {
            user = new UserEntityModel();
            user.setName(resultSet.getString("Name"));
            user.setLogin(resultSet.getString("Login"));
            user.setPassword(resultSet.getString("Password"));
            user.setEmail(resultSet.getString("Email"));
            user.setBanned(resultSet.getBoolean("Banned"));
            user.setUserRole(resultSet.getInt("Role"));
            user.setCartId(resultSet.getInt("CartId"));
        }
        return user;
    }

    public static UserEntityModel getUserById(int id) throws SQLException {
        var connection = PostgresContext.getInstance().getConnection();
        String sql = "SELECT * FROM %s WHERE \"Id\" = ?".formatted(sqlUserTable);

        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, id);

        ResultSet resultSet = preparedStatement.executeQuery();
        UserEntityModel user = new UserEntityModel();
        while (resultSet.next()) {
            user.setName(resultSet.getString("Name"));
            user.setLogin(resultSet.getString("Login"));
            user.setPassword(resultSet.getString("Password"));
            user.setEmail(resultSet.getString("Email"));
            user.setBanned(resultSet.getBoolean("Banned"));
            user.setUserRole(resultSet.getInt("Role"));
            user.setCartId(resultSet.getInt("CartId"));
        }

        return user;
    }

    public static void CreateNewUser(UserEntityModel user) throws IOException, SQLException {
        var connection = PostgresContext.getInstance().getConnection();
        String cartSql = "INSERT INTO %s DEFAULT VALUES".formatted(sqlCartTable);
        PreparedStatement preparedStatement1 = connection.prepareStatement(cartSql);
        preparedStatement1.executeUpdate();

        PreparedStatement getCart = connection.prepareStatement("SELECT * FROM %s WHERE \"Id\"=(SELECT max(\"Id\") FROM %s)".formatted(sqlCartTable, sqlCartTable));
        ResultSet resultSet = getCart.executeQuery();
        while (resultSet.next()) {
            user.setCartId(resultSet.getInt("Id"));
        }
        System.out.println(user);
        String sql = "INSERT INTO %s".formatted(sqlUserTable) +
                "(\"Email\", \"Login\", \"Password\", \"Name\", \"Banned\", " +
                "\"Role\", \"CartId\") " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";

        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1, user.getEmail());
        preparedStatement.setString(2, user.getLogin());
        preparedStatement.setString(3, user.getPassword());
        preparedStatement.setString(4, user.getName());
        preparedStatement.setBoolean(5, user.getBanned());
        preparedStatement.setInt(6, user.getUserRole());
        preparedStatement.setInt(7, user.getCartId());

        preparedStatement.executeUpdate();

    }


}
