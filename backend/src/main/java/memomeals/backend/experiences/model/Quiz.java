package memomeals.backend.experiences.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Quiz extends Game {
    @Field
    private final List<QuizElement> listOfQuizElements;

    @JsonCreator
    public Quiz() {
        super();
        this.listOfQuizElements = new ArrayList<>();
    }

    public Quiz(String id, String name, List<QuizElement> listOfQuizElements) {
        super(id, name, GameType.QUIZ);
        this.listOfQuizElements = listOfQuizElements;
    }
}
