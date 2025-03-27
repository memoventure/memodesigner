package memomeals.backend.experiences.dto;

import memomeals.backend.experiences.model.ExperienceInstance;
import memomeals.backend.experiences.model.Quiz;

import java.util.List;

public record UpdateExperienceDto(
        String name,
        List<Quiz> listOfGames,
        List<ExperienceInstance> listOfExpInstances) {
}
