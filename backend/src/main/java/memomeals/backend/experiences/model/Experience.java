package memomeals.backend.experiences.model;

import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("experiences")
@With
public record Experience(
    @Id
    String id,
    String name,
    List<Quiz> listOfGames,
    List<ExperienceInstance> listOfExpInstances) {
}

