package memomeals.memobackend.experiences.service;

import lombok.RequiredArgsConstructor;
import memomeals.memobackend.experiences.repository.ExperienceRepository;
import memomeals.memobackend.utils.IdService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ExperienceService {

    private final ExperienceRepository expRepository; // FRAGE: Muss ich hier ein extra Repo für die Quizzes machen?
    private final IdService idService;
}
