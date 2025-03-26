package memomeals.backend.experiences.dto;

import memomeals.backend.experiences.model.ExperienceInstance;
import memomeals.backend.experiences.model.Quiz;

import java.util.List;

public record ResponseExperienceDto(
        String name,
        List<Quiz> listofQuizzes,
        List<ExperienceInstance> listofExpInstances) {
}
