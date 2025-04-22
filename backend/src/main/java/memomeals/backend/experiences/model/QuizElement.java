package memomeals.backend.experiences.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizElement {
    private String question;
    private String correctAnswer;
    private List<String> listOfWrongAnswers;
}