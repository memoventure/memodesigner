package memomeals.memobackend.experiences.controller;

import memomeals.memobackend.experiences.dto.NewExperienceDto;
import memomeals.memobackend.experiences.dto.ResponseExperienceDto;
import memomeals.memobackend.experiences.model.Experience;
import memomeals.memobackend.experiences.service.ExperienceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/experiences")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @GetMapping
    public List<Experience> getAllExperiences() {
        return experienceService.findAllExperiences();
    }

    @GetMapping("{id}")
    public Experience getExperienceById(@PathVariable String id) {
        return experienceService.findExperienceById(id);
    }

    @GetMapping("/instances/{id}")
    public Experience getExperienceByInstanceId(@PathVariable String id) {
        return experienceService.findExperienceByInstanceId(id);
    }

    @PostMapping
    public Experience postExperience(@RequestBody NewExperienceDto newExperience) {
        return experienceService.addExperience(newExperience);
    }

    @PutMapping("{id}")
    public Experience putExperience(@RequestBody ResponseExperienceDto experience, @PathVariable String id) {
        return experienceService.updateExperience(experience, id);
    }

    @DeleteMapping("{id}")
    public void deleteExperience(@PathVariable String id) {
        experienceService.deleteExperience(id);
    }

}
