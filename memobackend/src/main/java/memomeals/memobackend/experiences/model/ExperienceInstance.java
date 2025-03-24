package memomeals.memobackend.experiences.model;

import org.springframework.data.annotation.Id;

public record ExperienceInstance(
        @Id
        String id,
        String gameCode,
        int points
) {
}
