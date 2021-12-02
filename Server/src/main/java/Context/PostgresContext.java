package Context;

import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.*;
import java.util.ArrayList;
import java.util.Properties;

public class PostgresContext {
    private static PostgresContext context;
    private Connection connection;
    private final String url;
    private final String user;
    private final String pass;

    private PostgresContext() throws SQLException {
        Properties props = new Properties();

        URL resource = PostgresContext.class.getClassLoader().getResource("database.config.properties");
        try {
            assert resource != null;
            try (InputStream in = Files.newInputStream(Path.of(resource.toURI()))) {
                props.load(in);
            }
        } catch (URISyntaxException | IOException e) {
            e.printStackTrace();
        }

        this.url = props.getProperty("DB_URL");
        this.user = props.getProperty("DB_USER");
        this.pass = props.getProperty("DB_PASS");

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
        Connection connection = DriverManager.getConnection(url, user, pass);
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
            try (Connection connection = DriverManager.getConnection("jdbc:postgresql://localhost/postgres", user, pass)) {
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
            try (Connection connection = DriverManager.getConnection(url, user, pass)) {
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
        try (Connection connection = DriverManager.getConnection("jdbc:postgresql://localhost/postgres", user, pass)) {
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
