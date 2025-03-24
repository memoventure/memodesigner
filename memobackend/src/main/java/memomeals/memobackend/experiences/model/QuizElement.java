package memomeals.memobackend.experiences.model;

import java.util.List;

public record QuizElement(

        String question,
        String rightAnswer,
        List<String> listOfWrongAnswers) {

}
