import Controllers.DBRequestController;
import Entities.*;

import java.util.ArrayList;
import java.util.List;

public class Program {
    public static void main(String[] args) {
        //Extract instances to another class
        var userController = new DBRequestController<UserEntity>(UserEntity.class);
        var unitController = new DBRequestController<DeclaredUnit>(DeclaredUnit.class);
        var cartController = new DBRequestController<Cart>(Cart.class);
        var unitDescriptionController = new DBRequestController<UnitDesc>(UnitDesc.class);
        var unitTypeController = new DBRequestController<UnitType>(UnitType.class);
        //
        Cart cart = new Cart();

        DeclaredUnit unit = new DeclaredUnit("Flashlight", 30);
        DeclaredUnit decUnit = new DeclaredUnit("Audi", 3000);

        unit.setCart(cart);
        decUnit.setCart(cart);

        unit.setUnitType(new UnitType("Instrument"));
        decUnit.setUnitType(new UnitType("Car"));
        decUnit.setUnitDesc(new UnitDesc("Mediocre car from 90's. Non-repairable", "2021-30-10"));
        unit.setUnitDesc(new UnitDesc("Cool flashlight from aliexpress", "2021-30-10"));

        UserEntity user = new UserEntity("aasd", "cvbvc", "asd", "dsdtg", 3, cart);

        unitController.add(unit);
        unitController.add(decUnit);
        userController.add(user);

        List<UserEntity> users = userController.showAll();
        List<DeclaredUnit> units = unitController.showAll();

        System.out.println(units.get(0).getCart().getDeclaredUnits());
        System.out.println(users.get(0));
    }
}
