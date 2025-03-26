package memomeals.backend.experiences.model;

import org.springframework.data.annotation.Id;

import java.util.List;

public record Quiz(
        @Id
        String id,
        String name,
        String description,
        List<QuizElement> listOfQuestions) {

}
