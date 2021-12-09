package Context;

import Models.EntityModel.UnitCustomsCategoryEntityModel;
import Models.EntityModel.UnitEntityModel;
import Models.UnitEntityRequestModel;
import Models.UnitEntityResponseModel;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class CategoryUnitRelationContext {
    private static final String sqlUnitTable = "\"customsSchema\".\"DeclaredUnit\"";
    private static final String sqlCategoryTable = "\"customsSchema\".\"CustomsCategory\"";
    private static final String sqlCategoryRelationTable = "\"customsSchema\".\"UnitCategoryRelation\"";

    public static void addCategoryToUnit(int unitId, int categoryId) throws IOException, SQLException {
        var connection = PostgresContext.getInstance().getConnection();
        String sql = "INSERT INTO %s (\"UnitId\", \"CategoryId\") VALUES (?, ?)".formatted(sqlCategoryTable);

        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, unitId);
        preparedStatement.setInt(2, categoryId);
        preparedStatement.executeUpdate();

    }

    public static ArrayList<UnitCustomsCategoryEntityModel> getCategoriesByUnitId(int id) throws SQLException {
        var connection = PostgresContext.getInstance().getConnection();
        String sql = "SELECT * FROM %s WHERE \"UnitId\" = ? ".formatted(sqlCategoryRelationTable);

        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, id);
        ResultSet resultSet = preparedStatement.executeQuery();

        ArrayList<Integer> categoryIds = new ArrayList<>();
        while (resultSet.next()) {
            categoryIds.add(resultSet.getInt("CategoryId"));
        }
        System.out.println(categoryIds);
        ArrayList<UnitCustomsCategoryEntityModel> categories = new ArrayList<>();
        for (var categoryId : categoryIds) {
            categories.add(CategoryContext.getCategoryById(categoryId));
        }
        return categories;
    }

    public static ArrayList<UnitEntityResponseModel> getUnitsByCategory(int categoryId) throws SQLException {
        var connection = PostgresContext.getInstance().getConnection();
        String sql = "SELECT * FROM %s WHERE \"CategoryId\" = ? ".formatted(sqlCategoryRelationTable);

        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, categoryId);
        ResultSet resultSet = preparedStatement.executeQuery();

        ArrayList<Integer> unitIds = new ArrayList<>();
        while (resultSet.next()) {
            unitIds.add(resultSet.getInt("UnitId"));
        }
        System.out.println(unitIds);
        ArrayList<UnitEntityResponseModel> units = new ArrayList<>();
        for (var unitId : unitIds) {
            units.add(UnitContext.getUnitsById(unitId));
        }
        return units;
    }
}
