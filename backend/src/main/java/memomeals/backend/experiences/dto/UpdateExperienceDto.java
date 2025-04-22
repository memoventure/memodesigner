package memomeals.backend.experiences.dto;

import memomeals.backend.experiences.model.ExperienceInstance;
import memomeals.backend.experiences.model.Game;

import java.util.List;

public record UpdateExperienceDto(
        String name,
        List<Game> listOfGames,
        List<ExperienceInstance> listOfExpInstances) {
}
