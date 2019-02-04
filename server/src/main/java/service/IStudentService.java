package service;
/*
 * @PackageName service
 * @ClassName IStudentService
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

import entity.StudentEntity;

public interface IStudentService {
    void registry(StudentEntity studentEntity);

    void logIn(StudentEntity studentEntity);
}
