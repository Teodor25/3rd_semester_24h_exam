package backend.port.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    private Supervisor supervisor;

    @Basic
    @Column(name = "first_name", length = 80)
    private String firstName;

    @Basic
    @Column(name = "last_name", length = 80)
    private String lastName;

    @Basic
    @Column(name = "email", length = 80)
    private String email;

    @Basic
    @Column(name = "password", length = 80)
    private String password;

    public Student() {}

    public Student(String firstName, String lastName, Supervisor supervisor, String email, String password) {
        this.supervisor = supervisor;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public Student setId(Long id) {
        this.id = id;
        return this;
    }

    public Supervisor getSupervisor() {
        return supervisor;
    }

    public Student setSupervisor(Supervisor supervisor) {
        this.supervisor = supervisor;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public Student setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public Student setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public Student setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public Student setPassword(String password) {
        this.password = password;
        return this;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Student student = (Student) obj;
        return id == student.id &&
                Objects.equals(firstName,student.firstName) &&
                Objects.equals(lastName, student.lastName) &&
                Objects.equals(supervisor,student.supervisor) &&
                Objects.equals(email, student.email) &&
                Objects.equals(password, student.password);
    }

    @Override
    public String toString() {
        return "Student{" +
                "StudentId=" + id +
                ", firstName=" + firstName +
                ", lastName=" + lastName +
                ", supervisor=" + supervisor +
                ", e-mail=" + email +
                ", password=" + password;
    }

    @Override
    public int hashCode() { return Objects.hash(id, firstName, lastName, supervisor, email, password); }
}
