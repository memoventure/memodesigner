package memomeals.memobackend.experiences.dto;

import memomeals.memobackend.experiences.model.ExperienceInstance;
import memomeals.memobackend.experiences.model.Quiz;

import java.util.List;

public record ResponseExperienceDto(
        String name,
        List<Quiz> listofQuizzes,
        List<ExperienceInstance> listofExpInstances) {
}
