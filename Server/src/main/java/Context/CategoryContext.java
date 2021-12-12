package Context;

import Models.EntityModel.UnitCustomsCategoryEntityModel;
import Models.EntityModel.UserEntityModel;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class CategoryContext {
    private static final String sqlCategoryTable = "\"customsSchema\".\"CustomsCategory\"";
    private static final String sqlCategoryRelationTable = "\"customsSchema\".\"UnitCategoryRelation\"";
    public static void CreateNewCategory(UnitCustomsCategoryEntityModel category) throws IOException, SQLException {
        var connection = PostgresContext.getInstance().getConnection();

        String sql = "INSERT INTO %s".formatted(sqlCategoryTable) +
                "(\"Category\", \"TaxPercentage\")" +
                "VALUES (?, ?)";

        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1, category.getCategory());
        preparedStatement.setInt(2, category.getTaxPercentage());

        preparedStatement.executeUpdate();

    }
    public static void DeleteCategoryById(int id) throws IOException, SQLException{
        var connection = PostgresContext.getInstance().getConnection();

        String sqlCategoryRelation = "DELETE FROM %s WHERE \"CategoryId\" = ?".formatted(sqlCategoryRelationTable);
        String sql = "DELETE FROM %s WHERE \"Id\" = ?".formatted(sqlCategoryTable);
        PreparedStatement preparedStatementCR = connection.prepareStatement(sqlCategoryRelation);
        preparedStatementCR.setInt(1, id);
        preparedStatementCR.executeUpdate();

        PreparedStatement preparedStatementUnit = connection.prepareStatement(sql);
        preparedStatementUnit.setInt(1, id);
        preparedStatementUnit.executeUpdate();

    }

    public static ArrayList<UnitCustomsCategoryEntityModel> getCategories() throws SQLException {
        var connection = PostgresContext.getInstance().getConnection();
        String sql = "SELECT * FROM %s".formatted(sqlCategoryTable);

        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        ResultSet resultSet = preparedStatement.executeQuery();
        ArrayList<UnitCustomsCategoryEntityModel> categories = new ArrayList<>();

        while (resultSet.next()) {
            UnitCustomsCategoryEntityModel categoryEntityModel = new UnitCustomsCategoryEntityModel();
            categoryEntityModel.setCategory(resultSet.getString("Category"));
            categoryEntityModel.setTaxPercentage(resultSet.getInt("TaxPercentage"));
            categoryEntityModel.setId(resultSet.getInt("Id"));
            categories.add(categoryEntityModel);
        }

        return categories;
    }
    public static void deleteCategoriesById(int categoryId) throws SQLException {
        var connection = PostgresContext.getInstance().getConnection();
        String sql = "DELETE FROM %s WHERE \"Id\" = ?".formatted(sqlCategoryTable);

        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, categoryId);
        preparedStatement.executeUpdate();

    }
    public static UnitCustomsCategoryEntityModel getCategoryById(int categoryId) throws SQLException {
        var connection = PostgresContext.getInstance().getConnection();
        String sql = "SELECT * FROM %s WHERE \"Id\" = ?".formatted(sqlCategoryTable);

        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, categoryId);
        ResultSet resultSet = preparedStatement.executeQuery();
        UnitCustomsCategoryEntityModel categoryEntityModel = null;

        while (resultSet.next()) {
            categoryEntityModel = new UnitCustomsCategoryEntityModel();
            categoryEntityModel.setCategory(resultSet.getString("Category"));
            categoryEntityModel.setTaxPercentage(resultSet.getInt("TaxPercentage"));
            categoryEntityModel.setId(resultSet.getInt("Id"));
        }

        return categoryEntityModel;

    }


}
