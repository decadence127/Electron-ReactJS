package Controllers;

import Utils.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.lang.reflect.ParameterizedType;
import java.util.List;

public class DBRequestController<T> implements IDBRequestController<T>{
    private final Class<T> type;

    public DBRequestController(Class<T> type) {
        this.type = type;
    }

    public String getMyType() {
        return this.type.toString().substring(15);
    }

    @Override
    public void update(T object) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();
        session.update(object);
        transaction.commit();
        session.close();
    }

    @Override
    public void add(T object) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();
        session.save(object);
        transaction.commit();
        session.close();
    }

    @Override
    public void delete(T object) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();
        session.delete(object);
        transaction.commit();
        session.close();
    }

    @Override
    public List<T> showAll() {
        String hql = "from " + this.getMyType().toString();
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.getTransaction().begin();
        List<T> objects = session.createQuery(hql).getResultList();
        session.getTransaction().commit();
        return objects;
    }
}
