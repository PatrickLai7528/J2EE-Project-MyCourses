package entity;

import java.util.Objects;

/*
 * @PackageName entity
 * @ClassName TeacherEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */
public final class TeacherEntity {

    private String email;
    private String password;
    private String name;
    private long teacherNo;


    public TeacherEntity(String email, String password, String name, long teacherNo) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.teacherNo = teacherNo;
    }

    public TeacherEntity() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getTeacherNo() {
        return teacherNo;
    }

    public void setTeacherNo(long teacherNo) {
        this.teacherNo = teacherNo;
    }

    @Override
    public String toString() {
        return "TeacherEntity{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", teacherNo=" + teacherNo +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TeacherEntity)) return false;
        TeacherEntity that = (TeacherEntity) o;
        return getTeacherNo() == that.getTeacherNo() &&
                getEmail().equals(that.getEmail()) &&
                getPassword().equals(that.getPassword()) &&
                getName().equals(that.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getEmail(), getPassword(), getName(), getTeacherNo());
    }
}
