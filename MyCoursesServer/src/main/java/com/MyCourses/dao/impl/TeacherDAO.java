package com.MyCourses.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.MyCourses.dao.ITeacherDAO;
import com.MyCourses.entity.TeacherEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public class TeacherDAO implements ITeacherDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<TeacherEntity> retrieveAll() {
        String hql = "FROM TeacherEntity as teacher ORDER BY teacher.teacherEmail";
        return (List<TeacherEntity>) entityManager.createQuery(hql).getResultList();
    }

    @Override
    public TeacherEntity retrieveByEmail(String email) {
        return entityManager.find(TeacherEntity.class, email);
    }

    @Override
    public TeacherEntity retrieveByTeacherNo(String teacherNo) {
        return entityManager.find(TeacherEntity.class, teacherNo);
    }

    @Override
    public void create(TeacherEntity teacherEntity) {
        entityManager.persist(teacherEntity);
    }

    @Override
    public void update(TeacherEntity teacherEntity) {
        TeacherEntity t = retrieveByEmail(teacherEntity.getTeacherEmail());
        t.setName(teacherEntity.getName());
        t.setPassword(teacherEntity.getPassword());
        t.setTeacherNo(teacherEntity.getTeacherNo());
        entityManager.flush();
    }

    @Override
    public void physicalDelete(TeacherEntity teacherEntity) {
        entityManager.remove(retrieveByEmail(teacherEntity.getTeacherEmail()));
    }

    /**
     * @param teacherEntity
     * @return
     */
    @Override
    public boolean exist(TeacherEntity teacherEntity) {
        if (teacherEntity.getTeacherEmail() != null)
            return retrieveByEmail(teacherEntity.getTeacherEmail()) != null;
        if (teacherEntity.getTeacherNo() != null)
            return retrieveByTeacherNo(teacherEntity.getTeacherNo()) != null;
        throw new IllegalArgumentException("教師整體類沒有郵箱和教師號");
    }

//	@Override
//	public TeacherEntity getArticleById(int articleId) {
//		return entityManager.find(TeacherEntity.class, articleId);
//	}
//	@SuppressWarnings("unchecked")
//	@Override
//	public List<TeacherEntity> getAllArticles() {
//		String hql = "FROM Article as atcl ORDER BY atcl.articleId";
//		return (List<TeacherEntity>) entityManager.createQuery(hql).getResultList();
//	}
//	@Override
//	public void addArticle(TeacherEntity teacherEntity) {
//		entityManager.persist(teacherEntity);
//	}
//	@Override
//	public void updateArticle(TeacherEntity teacherEntity) {
//		TeacherEntity artcl = getArticleById(teacherEntity.getTeacherEmail());
//		artcl.setTitle(teacherEntity.getTitle());
//		artcl.setCategory(teacherEntity.getCategory());
//		entityManager.flush();
//	}
//	@Override
//	public void deleteArticle(int articleId) {
//		entityManager.remove(getArticleById(articleId));
//	}
//	@Override
//	public boolean articleExists(String title, String category) {
//		String hql = "FROM Article as atcl WHERE atcl.title = ? and atcl.category = ?";
//		int count = entityManager.createQuery(hql).setParameter(1, title)
//		              .setParameter(2, category).getResultList().size();
//		return count > 0 ? true : false;
//	}
}
