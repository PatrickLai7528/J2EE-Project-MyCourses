package entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

/*
 * @PackageName entity
 * @ClassName TeacherEntity
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */
@Entity
@Table(name = "teacher_entity")
public final class TeacherEntity {
    private String email;
    private String password;
    private String name;
    private long teacherNo;

    public TeacherEntity() {
    }

    @Id
    @Column(name="email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "teacher_no", unique = true)
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
