package backend.port.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "Supervisor")
public class Supervisor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Basic
    @Column(name = "first_name", length = 80)
    private String firstName;

    @Basic
    @Column(name = "last_name", length = 80)
    private String lastName;

    public Supervisor() {}

    public Supervisor(Long id) {
        this.id = id;
        this.firstName = null;
        this.lastName = null;
    }

    public Supervisor( String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Long getId() {
        return id;
    }

    public Supervisor setId(Long id) {
        this.id = id;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public Supervisor setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public Supervisor setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    @Override
    public String toString() {
        return "Supervisor{" +
                "Id=" + id +
                ", firstName=" + firstName +
                ", lastName=" + lastName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Supervisor)) return false;
        Supervisor that = (Supervisor) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(firstName, that.firstName) &&
                Objects.equals(lastName, that.lastName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName);
    }
}
