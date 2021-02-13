package backend.port.controller;

import backend.port.model.Student;
import backend.port.model.Supervisor;
import backend.port.repository.StudentRepo;
import backend.port.repository.SupervisorRepo;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class StudentController {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private SupervisorRepo supervisorRepo;

    //------------------------------------------------------ GET MAPPINGS ------------------------------------------------------\\

    @GetMapping("/students")
    public List<Student> findAll() { return studentRepo.findAll(); }

    @GetMapping("/students/{id}")
    public Student findOne(@PathVariable(value = "id") Long id) throws NotFoundException
    {
        return studentRepo.findById(id).orElseThrow( () -> new NotFoundException("student with id: " + id + " not found."));
    }

    //------------------------------------------------------ DELETE MAPPINGS ------------------------------------------------------\\

    @DeleteMapping("/studentDelete/")
    @ResponseStatus(HttpStatus.OK)
    ResponseEntity<Boolean> deleteStudent(@RequestParam(value="id") Long id)
    {
        System.out.println("deleting student");
        studentRepo.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //------------------------------------------------------ PUT MAPPINGS ------------------------------------------------------\\

    @PutMapping("/updateStudent")
    @ResponseStatus(HttpStatus.OK)
    public boolean updateStudent(@RequestBody Student newStudent)
    {
        Optional studentChange = studentRepo.findById(newStudent.getId());
        if(studentChange.isPresent())
        {
            System.out.println("Student found, now updating student");
            studentRepo.save(newStudent);
            return true;
        } else {
            System.out.println("Student not found: " + newStudent);
            System.out.println("Student not updated!");
            return false;
        }
    }

    //------------------------------------------------------ POST MAPPINGS ------------------------------------------------------\\

    @PostMapping("/studentLogin/")
    @ResponseStatus(HttpStatus.OK)
    public Student login(
            @RequestParam(value = "email") String email,
            @RequestParam(value = "password") String password)
            throws NotFoundException
    {

        Student studentFound = studentRepo.findByEmail(email)
                .orElseThrow(
                        () -> new NotFoundException("student with e-mail: " + email + " not found.")
                );
        if(studentFound.getPassword().equals(password)){
            System.out.println("you freaking did it");
            return studentFound;
        } else {
            System.out.println("HA! nice try.");
            return null;
        }
    }

    @PostMapping("/initdb")
    @ResponseStatus(HttpStatus.OK)
    public boolean initdb()
    {

        if(studentRepo.findAll().isEmpty()){

            if(supervisorRepo.findAll().isEmpty()){
                //Add supervisors to the database
                supervisorRepo.save(new Supervisor("Teodor", "Jonasson"));
                supervisorRepo.save(new Supervisor("Alex", "Maccaganowich"));
                supervisorRepo.save(new Supervisor("Cristian", "Pruchea"));
                supervisorRepo.save(new Supervisor("Jan", "Watashiyeet"));
            }

            //Add students to the database
            studentRepo.save(new Student("maria", "rønde", new Supervisor((long)1), "maria@maria.com", "maria"));
            studentRepo.save(new Student("lars", "jacks", new Supervisor((long)2), "lars@lars.com", "lars"));
            studentRepo.save(new Student("loui", "hanson", new Supervisor((long)3), "loui@loui.com", "loui"));
            studentRepo.save(new Student("lukas", "malous", new Supervisor((long)3), "lukas@lukas.com", "lukas"));
            studentRepo.save(new Student("sarah", "sakka", new Supervisor((long)4), "sarah@sarah.com", "sarah"));

            System.out.println("Database initiated.");
            return true;
        } else {
            System.out.println("Database has data.");
            return false;
        }
    }

    @PostMapping("/students")
    @ResponseStatus(HttpStatus.CREATED)
    ResponseEntity<Boolean> create(@RequestBody Student newStudent)
    {
        System.out.println(newStudent.getEmail());
        if(studentRepo.findByEmail(newStudent.getEmail()) == null)
        {
            System.out.println("email already exists. new student NOT created.");
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            studentRepo.save(newStudent);
            System.out.println("new student added: " + newStudent);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
    }
}
