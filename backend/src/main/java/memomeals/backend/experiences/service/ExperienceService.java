package memomeals.backend.experiences.service;

import lombok.RequiredArgsConstructor;
import memomeals.backend.experiences.dto.NewExperienceDto;
import memomeals.backend.experiences.dto.ResponseExperienceDto;
import memomeals.backend.experiences.model.Experience;
import memomeals.backend.experiences.repository.ExperienceRepository;
import memomeals.backend.utils.IdService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class ExperienceService {

    private final ExperienceRepository expRepository;
    private final IdService idService;

    public void deleteExperience(String id) {
        expRepository.deleteById(id);
    }

    public Experience findExperienceById(String id) {
        return expRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Experience with id: " + id + " not found!"));
    }

    public List<Experience> findAllExperiences() {
        return expRepository.findAll();
    }

    public Experience addExperience(NewExperienceDto newExperience) {
        String id = idService.randomId();

        /// Frage: Wie löse ich das richtig?
        Experience expToSave = new Experience(id, newExperience.name(), newExperience.listofQuizzes(), newExperience.listofExpInstances());
        return expRepository.save(expToSave);
    }

    public Experience updateExperience(ResponseExperienceDto experience, String id) {
        Experience experienceToUpdate = new Experience(id, experience.name(), experience.listofQuizzes(), experience.listofExpInstances());
        return expRepository.save(experienceToUpdate);
    }

    public Experience findExperienceByInstanceId(String id) {
        return expRepository.findAll().stream()
                .filter(exp -> exp.listofExpInstances().stream()
                        .anyMatch(instance -> instance.gameCode().equals(id)))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Experience with id: " + id + " not found!"));
    }
}
