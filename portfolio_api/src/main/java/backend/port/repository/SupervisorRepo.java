package backend.port.repository;

import backend.port.model.Student;
import backend.port.model.Supervisor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupervisorRepo extends JpaRepository<Supervisor, Long> {

}
