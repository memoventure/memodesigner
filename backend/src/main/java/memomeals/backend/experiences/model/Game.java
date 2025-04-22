package memomeals.backend.experiences.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;


@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        property = "type",
        visible = true
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = Quiz.class, name = "QUIZ")
})
@Setter
@Getter
public abstract class Game {

    @Id
    private String id;
    private String name;
    private GameType type;

    public Game()
    {
        this.id = "";
        this.name = "";
        this.type = GameType.NONE;
    }
    @JsonCreator
    public Game(String id, String name, GameType type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }
}
