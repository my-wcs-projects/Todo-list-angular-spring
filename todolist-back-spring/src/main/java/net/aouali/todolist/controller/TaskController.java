package net.aouali.todolist.controller;

import net.aouali.todolist.entity.Task;
import net.aouali.todolist.repository.TaskRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("tasks")
public class TaskController {
    public final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("")
    public List<Task> getAllTasks() {
        return this.taskRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getBookById(@PathVariable Long id) {
        Optional<Task> task = this.taskRepository.findById(id);
        if(task.isPresent()) {
            return ResponseEntity.ok(task.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public Task createBook(@RequestBody Task task) {
        return this.taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        Optional<Task> task = this.taskRepository.findById(id);
        if(task.isPresent()) {
            updatedTask.setId(id);
            return ResponseEntity.ok(this.taskRepository.save(updatedTask));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        this.taskRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
