package Controllers;

import java.util.List;

public interface IDBRequestController<T> {
    void update(T object);
    void add(T object);
    void delete(T object);
    List<T> showAll();
}
