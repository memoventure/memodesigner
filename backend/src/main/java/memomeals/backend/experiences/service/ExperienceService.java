package memomeals.backend.experiences.service;

import lombok.RequiredArgsConstructor;
import memomeals.backend.experiences.dto.NewExperienceDto;
import memomeals.backend.experiences.dto.UpdateExperienceDto;
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

    public List<Experience> findAllExperiences() {
        return expRepository.findAll();
    }

    public Experience findExperienceById(String id) {
        return expRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Experience with id: " + id + " not found!"));
    }

    public Experience addExperience(NewExperienceDto newExperience) {
        String id = idService.randomId();

        Experience expToSave = new Experience(id, newExperience.name(), newExperience.listOfGames(), newExperience.listOfExpInstances());
        return expRepository.save(expToSave);
    }

    public Experience updateExperience(UpdateExperienceDto experience, String id) {
        Experience experienceToUpdate = new Experience(id, experience.name(), experience.listOfGames(), experience.listOfExpInstances());
        return expRepository.save(experienceToUpdate);
    }

    public Experience findExperienceByInstanceId(String id) {
        return expRepository.findAll().stream()
                .filter(exp -> exp.listOfExpInstances().stream()
                        .anyMatch(instance -> instance.gameCode().equals(id)))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Experience with id: " + id + " not found!"));
    }

    public void deleteExperience(String id) {
        expRepository.deleteById(id);
    }
}
