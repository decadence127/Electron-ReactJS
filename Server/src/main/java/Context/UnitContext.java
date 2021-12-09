package Context;

import Models.EntityModel.UnitEntityModel;
import Models.EntityModel.UserEntityModel;
import Models.UnitEntityRequestModel;
import Models.UnitEntityResponseModel;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class UnitContext {
    private static final String sqlUserTable = "\"customsSchema\".\"Users\"";
    private static final String sqlUnitTable = "\"customsSchema\".\"DeclaredUnit\"";
    private static final String sqlDescTable = "\"customsSchema\".\"UnitDesc\"";


    public static ArrayList<UnitEntityResponseModel> getUnits() throws SQLException {
        var connection = PostgresContext.getInstance().getConnection();
        String sql = "SELECT * FROM %s".formatted(sqlUnitTable);
        String descSql = "SELECT * FROM %s WHERE \"Id\" = ?".formatted(sqlDescTable);
        PreparedStatement preparedStatementDesc = connection.prepareStatement(descSql);

        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        ResultSet resultSet = preparedStatement.executeQuery();
        ArrayList<UnitEntityResponseModel> units = new ArrayList<>();

        while (resultSet.next()) {
            preparedStatementDesc.setInt(1, resultSet.getInt("UnitDescId"));
            ResultSet resultSet1 = preparedStatementDesc.executeQuery();
            UnitEntityResponseModel unit = new UnitEntityResponseModel();
            unit.setId(resultSet.getInt("Id"));
            unit.setUnitTitle(resultSet.getString("UnitTitle"));
            unit.setTaxValue(resultSet.getFloat("TaxValue"));
            unit.setCartId(resultSet.getInt("CartId"));
            while (resultSet1.next()){
                unit.setUnitDesc(resultSet1.getString("Description"));
                unit.setArrivalDate(resultSet1.getString("ArrivalDate"));
            }
            units.add(unit);
        }

        return units;
    }
    public static UnitEntityResponseModel getUnitsById(int Id) throws SQLException {
        var connection = PostgresContext.getInstance().getConnection();
        String sql = "SELECT * FROM %s WHERE \"Id\" = ?".formatted(sqlUnitTable);
        String descSql = "SELECT * FROM %s WHERE \"Id\" = ?".formatted(sqlDescTable);
        PreparedStatement preparedStatementDesc = connection.prepareStatement(descSql);

        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, Id);
        ResultSet resultSet = preparedStatement.executeQuery();

            UnitEntityResponseModel unit = new UnitEntityResponseModel();
        while (resultSet.next()) {
            preparedStatementDesc.setInt(1, resultSet.getInt("UnitDescId"));
            ResultSet resultSet1 = preparedStatementDesc.executeQuery();
            unit.setUnitTitle(resultSet.getString("Title"));
            unit.setTaxValue(resultSet.getFloat("TaxValue"));
            unit.setUnitDesc(resultSet1.getString("Description"));
            unit.setArrivalDate(resultSet1.getString("ArrivalDate"));
        }

        return unit;
    }
    public static ArrayList<UnitEntityResponseModel> GetUnitsByCartId(int cartId) throws IOException, SQLException {

        var connection = PostgresContext.getInstance().getConnection();

        String sql = "SELECT * FROM %s WHERE \"CartId\" = ?".formatted(sqlUnitTable);
        String descSql = "SELECT * FROM %s WHERE \"Id\" = ?".formatted(sqlDescTable);
        PreparedStatement preparedStatementDesc = connection.prepareStatement(descSql);
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, cartId);

        ResultSet resultSet = preparedStatement.executeQuery();

        ArrayList<UnitEntityResponseModel> units = new ArrayList<>();

        while (resultSet.next()) {
            preparedStatementDesc.setInt(1, resultSet.getInt("UnitDescId"));
            ResultSet resultSet1 = preparedStatementDesc.executeQuery();
            UnitEntityResponseModel unit = new UnitEntityResponseModel();
            unit.setUnitTitle(resultSet.getString("Title"));
            unit.setTaxValue(resultSet.getFloat("TaxValue"));
            unit.setUnitDesc(resultSet1.getString("Description"));
            units.add(unit);
        }

        return units;
    }

    public static void CreateNewUnit(UnitEntityRequestModel unit, ArrayList<Integer> categories) throws Exception {
        var connection = PostgresContext.getInstance().getConnection();
        String descSql = "INSERT INTO %s(\"Description\") VALUES (?)".formatted(sqlDescTable);

        PreparedStatement preparedStatement1 = connection.prepareStatement(descSql);
        preparedStatement1.setString(1, unit.getUnitDesc());
        preparedStatement1.executeUpdate();
        PreparedStatement getDesc = connection.prepareStatement("SELECT * FROM %s WHERE \"Id\"=(SELECT max(\"Id\") FROM %s)".formatted(sqlDescTable, sqlDescTable));
        ResultSet resultSet = getDesc.executeQuery();
        while (resultSet.next()) {
            unit.setUnitDescId(resultSet.getInt("Id"));
        }

        String sql = "INSERT INTO %s".formatted(sqlUnitTable) +
                "(\"TaxValue\", \"UnitTitle\", \"CartId\", \"UnitDescId\")" +
                "VALUES (?, ?, ?, ?)";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setFloat(1, unit.getTaxValue());
        preparedStatement.setString(2, unit.getUnitTitle());
        preparedStatement.setInt(3, unit.getCartId());
        preparedStatement.setInt(4, unit.getUnitDescId());

        preparedStatement.executeUpdate();

        if(categories != null){
            System.out.println(categories);
            PreparedStatement getId = connection.prepareStatement("SELECT * FROM %s WHERE \"Id\"=(SELECT max(\"Id\") FROM %s)".formatted(sqlUnitTable, sqlUnitTable));
            int unitId = -1;
            while(resultSet.next()){
                unitId = resultSet.getInt("Id");
            }
            if(unitId == -1){
                throw new Exception("Номер посылки не найден");
            }
            for(var id : categories){
                CategoryUnitRelationContext.addCategoryToUnit(unitId, id);
            }

        }
    }

}
