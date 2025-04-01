package memomeals.backend.experiences.model;

import java.util.List;

public record QuizElement(

        String question,
        String correctAnswer,
        List<String> listOfWrongAnswers) {

}
