package memomeals.backend.experiences.model;

import org.springframework.data.annotation.Id;

public record ExperienceInstance(
        @Id
        String id,
        String gameCode,
        int gameStep,
        int points
) {
}