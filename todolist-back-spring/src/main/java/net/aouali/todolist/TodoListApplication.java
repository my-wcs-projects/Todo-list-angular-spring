package net.aouali.todolist;

import net.aouali.todolist.entity.Task;
import net.aouali.todolist.repository.TaskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TodoListApplication {
public final TaskRepository taskRepository;

    public TodoListApplication(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(TodoListApplication.class, args);
    }

    @Bean
    public CommandLineRunner run() throws Exception {
        return (String[] args) -> {

            Task task1 = new Task("Faire une todo list", true);
            Task task2 = new Task("Faire un cours Angular", false);
            Task task3 = new Task("Faire dodo", false);
            Task task4 = new Task("Chercher les gosses", true);

            this.taskRepository.save(task1);
            this.taskRepository.save(task2);
            this.taskRepository.save(task3);
            this.taskRepository.save(task4);
        };
    }
}
