package utils;/*
 * @PackageName utils
 * @ClassName HibernateUtils
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtils {

    private static SessionFactory sessionFactory;

    static {
        try {
            sessionFactory = new Configuration().configure()
                    .buildSessionFactory();
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public static void shutdown() {
        getSessionFactory().close();
    }

    public static void main(String[] args){
        System.out.println(HibernateUtils.getSessionFactory());
    }

}
