package entity;

import java.util.Objects;

/*
 * @PackageName entity
 * @ClassName TeacherEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */
public final class StudentEntity {
    private String email;
    private String password;
    private String name;
    private long studentNo;
    private boolean isDeleted;

    public StudentEntity() {
    }

    public StudentEntity(String email, String password, String name, long studentNo, boolean isDeleted) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.studentNo = studentNo;
        this.isDeleted = isDeleted;
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

    public long getStudentNo() {
        return studentNo;
    }

    public void setStudentNo(long studentNo) {
        this.studentNo = studentNo;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    @Override
    public String toString() {
        return "StudentEntity{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", studentNo=" + studentNo +
                ", isDeleted=" + isDeleted +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof StudentEntity)) return false;
        StudentEntity that = (StudentEntity) o;
        return getStudentNo() == that.getStudentNo() &&
                isDeleted() == that.isDeleted() &&
                getEmail().equals(that.getEmail()) &&
                getPassword().equals(that.getPassword()) &&
                getName().equals(that.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getEmail(), getPassword(), getName(), getStudentNo(), isDeleted());
    }
}
