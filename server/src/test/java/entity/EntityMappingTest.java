package entity;/*
 * @PackageName entity
 * @ClassName EntityMappingTest
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.junit.Test;
import utils.HibernateUtils;

public class EntityMappingTest {
    @Test
    public void testStudent() {
        StudentEntity studentEntity = new StudentEntity();
        studentEntity.setEmail("161250051@smail.nju.edu.cn");
        studentEntity.setName("賴健明");
        studentEntity.setPassword("Lai19980130");
        studentEntity.setStudentNo("161250051");
        studentEntity.setDeleted(false);
        SessionFactory sessionFactory = HibernateUtils.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        session.save(studentEntity);
        transaction.commit();
        session.close();
    }
}
