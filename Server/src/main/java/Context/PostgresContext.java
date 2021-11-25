package Context;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.*;
import java.util.ArrayList;

public class PostgresContext {
    static final String DB_URL = "jdbc:postgresql://127.0.0.1:5432/CustomsDB";
    static final String USER = "postgres";
    static final String PASS = "12344321";
    private static PostgresContext context;
    private Connection connection;

    private PostgresContext() throws SQLException {
        if (!listDownAllDatabases().contains("CustomsDB")) {
            try {
                CreateDatabase();
                CreateNewSchema();
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
            System.out.println("Created database and schema");
            return;
        }
        Connection connection = DriverManager.getConnection(DB_URL, USER, PASS);
        this.connection = connection;
        System.out.println("Connected to a database");
    }

    public static PostgresContext getInstance() throws SQLException {
        if (context == null) {
            context = new PostgresContext();
        }
        return context;
    }

    public Connection getConnection() {
        return this.connection;
    }

    private void CreateDatabase() {
        try {
            String sql = new String(Files.readAllBytes(Paths.get("createDb.sql")));
            try (Connection connection = DriverManager.getConnection("jdbc:postgresql://localhost/postgres", "postgres", "12344321")) {
                Statement stmt = connection.createStatement();
                stmt.execute(sql);

            }
        } catch (SQLException | IOException throwables) {
            throwables.printStackTrace();
        }
    }

    private void CreateNewSchema() {
        try {
            String sql = new String(Files.readAllBytes(Paths.get("createSchema.sql")));
            try (Connection connection = DriverManager.getConnection(DB_URL, USER, PASS)) {
                Statement stmt = connection.createStatement();
                stmt.execute(sql);
                this.connection = connection;
            }
        } catch (SQLException | IOException throwables) {
            throwables.printStackTrace();
        }
    }

    private ArrayList<String> listDownAllDatabases() {
        ArrayList<String> arr = new ArrayList<>();
        try (Connection connection = DriverManager.getConnection("jdbc:postgresql://localhost/postgres", "postgres", "12344321")) {
            PreparedStatement ps = connection
                    .prepareStatement("SELECT datname FROM pg_database WHERE datistemplate = false;");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                arr.add(rs.getString(1));
            }
            rs.close();
            ps.close();


        } catch (Exception e) {
            e.printStackTrace();
        }
        return arr;
    }

    public void closeConnection() throws SQLException {
        connection.close();
    }
}
