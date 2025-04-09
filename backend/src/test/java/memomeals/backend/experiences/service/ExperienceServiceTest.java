package memomeals.backend.experiences.service;

import memomeals.backend.experiences.dto.NewExperienceDto;
import memomeals.backend.experiences.dto.UpdateExperienceDto;
import memomeals.backend.expection.NoSuchExperienceException;
import memomeals.backend.experiences.model.Experience;
import memomeals.backend.experiences.model.ExperienceInstance;
import memomeals.backend.experiences.model.Quiz;
import memomeals.backend.experiences.model.QuizElement;
import memomeals.backend.experiences.repository.ExperienceRepository;
import memomeals.backend.utils.IdService;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.Mockito.*;

public class ExperienceServiceTest {

    ExperienceRepository experienceRepository = mock(ExperienceRepository.class);
    IdService idService = mock(IdService.class);
    ExperienceService experienceService = new ExperienceService(experienceRepository, idService);

    @Test
    void findAllExperiences() {

        //GIVEN
        //setup Experience Instance
        ExperienceInstance experienceInstance = new ExperienceInstance("1", "123", 5, 5);
        List<ExperienceInstance> expIstanceList = new ArrayList<>();
        expIstanceList.add(experienceInstance);

        //setup Quiz
        List<String> wrongAnswerList = Arrays.asList("Madrid", "Berlin");
        QuizElement quizElement = new QuizElement("What is the capital of Italy?", "Rome", wrongAnswerList);
        List<QuizElement> quizElementsList = new ArrayList<>();
        quizElementsList.add(quizElement);
        Quiz quiz = new Quiz("1", "quiz name", "Quiz", "quiz description", quizElementsList);

        //setup Experience
        List<Quiz> listOfQuizzes = new ArrayList<>();
        listOfQuizzes.add(quiz);

        Experience exp1 = new Experience("1", "Experience name 1", listOfQuizzes, expIstanceList);
        Experience exp2 = new Experience("2", "Experience name 2", listOfQuizzes, expIstanceList);
        Experience exp3 = new Experience("3", "Experience name 3", listOfQuizzes, expIstanceList);
        List<Experience> experiences = List.of(exp1, exp2, exp3);

        when(experienceRepository.findAll()).thenReturn(experiences);

        //WHEN
        List<Experience> actual = experienceService.findAllExperiences();

        //THEN

        verify(experienceRepository).findAll();
        assertEquals(experiences, actual);
    }

    @Test
    void findExperienceById_IfExists() {

        //GIVEN
        //setup Experience Instance
        ExperienceInstance experienceInstance = new ExperienceInstance("1", "123", 5, 5);
        List<ExperienceInstance> expIstanceList = new ArrayList<>();
        expIstanceList.add(experienceInstance);

        //setup Quiz
        List<String> wrongAnswerList = Arrays.asList("Madrid", "Berlin");
        QuizElement quizElement = new QuizElement("What is the capital of Italy?", "Rome", wrongAnswerList);
        List<QuizElement> quizElementsList = new ArrayList<>();
        quizElementsList.add(quizElement);
        Quiz quiz = new Quiz("1", "quiz name", "Quiz", "quiz description", quizElementsList);

        //setup Experience
        List<Quiz> listOfQuizzes = new ArrayList<>();
        listOfQuizzes.add(quiz);

        String id = "1";

        Experience exp1 = new Experience(id, "Experience name 1", listOfQuizzes, expIstanceList);

        when(experienceRepository.findById(id)).thenReturn(Optional.of(exp1));

        //WHEN
        Experience actual = experienceService.findExperienceById(id);

        //THEN

        verify(experienceRepository).findById(id);
        assertEquals(exp1, actual);

    }

    @Test
    void findExperienceById_IfInvalidId_ThenThrowException() {

        final String id = "1";

        when(experienceRepository.findById(id)).thenReturn(Optional.empty());

        //WHEN
        assertThrows(NoSuchExperienceException.class, () -> experienceService.findExperienceById(id));


        //THEN
        verify(experienceRepository).findById(id);
    }

    @Test
    void addExperience() {
        //GIVEN
        //setup Experience Instance
        ExperienceInstance experienceInstance = new ExperienceInstance("1", "123", 5, 5);
        List<ExperienceInstance> expIstanceList = new ArrayList<>();
        expIstanceList.add(experienceInstance);

        //setup Quiz
        List<String> wrongAnswerList = Arrays.asList("Madrid", "Berlin");
        QuizElement quizElement = new QuizElement("What is the capital of Italy?", "Rome", wrongAnswerList);
        List<QuizElement> quizElementsList = new ArrayList<>();
        quizElementsList.add(quizElement);
        Quiz quiz = new Quiz("1", "quiz name", "Quiz", "quiz description", quizElementsList);

        //setup Experience
        List<Quiz> listOfQuizzes = new ArrayList<>();
        listOfQuizzes.add(quiz);

        NewExperienceDto newExp = new NewExperienceDto("Experience name 1",  listOfQuizzes, expIstanceList);
        Experience expToSave =  new Experience("Test-Id", "Experience name 1", listOfQuizzes, expIstanceList);

        when(idService.randomId()).thenReturn("Test-Id");
        when(experienceRepository.save(expToSave)).thenReturn(expToSave);

        //WHEN

        Experience actual = experienceService.addExperience(newExp);

        //THEN
        verify(idService).randomId();
        verify(experienceRepository).save(expToSave);
        assertEquals(expToSave, actual);
    }

    @Test
    void updateExperienceById_ExperienceFound() {
        //GIVEN
        //setup Experience Instance
        ExperienceInstance experienceInstance = new ExperienceInstance("1", "123", 5, 5);
        List<ExperienceInstance> expIstanceList = new ArrayList<>();
        expIstanceList.add(experienceInstance);

        //setup Quiz
        List<String> wrongAnswerList = Arrays.asList("Madrid", "Berlin");
        QuizElement quizElement = new QuizElement("What is the capital of Italy?", "Rome", wrongAnswerList);
        List<QuizElement> quizElementsList = new ArrayList<>();
        quizElementsList.add(quizElement);
        Quiz quiz = new Quiz("1", "quiz name", "Quiz", "quiz description", quizElementsList);

        //setup Experience
        List<Quiz> listOfQuizzes = new ArrayList<>();
        listOfQuizzes.add(quiz);
        String id = "1";

        UpdateExperienceDto expToUpdate = new UpdateExperienceDto("test-name", listOfQuizzes, expIstanceList);

        Experience updatedExp = new Experience("1", "test-name", listOfQuizzes, expIstanceList);

        when(experienceRepository.save(updatedExp)).thenReturn(updatedExp);
        when(experienceRepository.existsById(id)).thenReturn(true);

        //WHEN

        Experience actual = experienceService.updateExperience(expToUpdate, id);

        //THEN
        verify(experienceRepository).save(updatedExp);

        assertEquals(updatedExp, actual);
    }

    @Test
    void updateExperienceById_ExperienceNotFound() {
        //GIVEN
        //setup Experience Instance
        ExperienceInstance experienceInstance = new ExperienceInstance("1", "123", 5, 5);
        List<ExperienceInstance> expIstanceList = new ArrayList<>();
        expIstanceList.add(experienceInstance);

        //setup Quiz
        List<String> wrongAnswerList = Arrays.asList("Madrid", "Berlin");
        QuizElement quizElement = new QuizElement("What is the capital of Italy?", "Rome", wrongAnswerList);
        List<QuizElement> quizElementsList = new ArrayList<>();
        quizElementsList.add(quizElement);
        Quiz quiz = new Quiz("1", "quiz name", "Quiz", "quiz description", quizElementsList);

        //setup Experience
        List<Quiz> listOfQuizzes = new ArrayList<>();
        listOfQuizzes.add(quiz);
        String id = "1";

        UpdateExperienceDto expToUpdate = new UpdateExperienceDto("test-name", listOfQuizzes, expIstanceList);

        when(experienceRepository.existsById(id)).thenReturn(false);

        // WHEN & THEN
        NoSuchExperienceException exception = assertThrows(NoSuchExperienceException.class,
                () -> experienceService.updateExperience(expToUpdate, id));

        assertEquals("Experience with id: 1 not found!", exception.getMessage());

        //THEN
        verify(experienceRepository, never()).save(any(Experience.class));

    }

    @Test
    void findExperienceByInstanceId_IfExists() {
        //GIVEN
        //setup Experience Instance
        ExperienceInstance experienceInstance = new ExperienceInstance("1", "123", 5, 5);
        List<ExperienceInstance> expIstanceList = new ArrayList<>();
        expIstanceList.add(experienceInstance);

        //setup Quiz
        List<String> wrongAnswerList = Arrays.asList("Madrid", "Berlin");
        QuizElement quizElement = new QuizElement("What is the capital of Italy?", "Rome", wrongAnswerList);
        List<QuizElement> quizElementsList = new ArrayList<>();
        quizElementsList.add(quizElement);
        Quiz quiz = new Quiz("1", "quiz name", "Quiz", "quiz description", quizElementsList);

        //setup Experience
        List<Quiz> listOfQuizzes = new ArrayList<>();
        listOfQuizzes.add(quiz);

        String gameCode = "123";

        Experience experience = new Experience("1", "test-name", listOfQuizzes, expIstanceList);

        when(experienceRepository.findAll()).thenReturn(Collections.singletonList(experience));

        //WHEN
        Experience actual = experienceService.findExperienceByInstanceId(gameCode);

        //THEN
        assertEquals(experience, actual);
    }

    @Test
    void findExperienceByInstanceId_IfNotExists() {
        //GIVEN
        String instanceId = "1";

        // WHEN & THEN
        NoSuchExperienceException exception = assertThrows(NoSuchExperienceException.class,
                () -> experienceService.findExperienceByInstanceId(instanceId));

        assertEquals("Experience instance with id: 1 not found!", exception.getMessage());

    }

    @Test
    void deleteExperience_whenExists() {
        //GIVEN
        String id = "1";
        doNothing().when(experienceRepository).deleteById(id);
        when(experienceRepository.existsById(id)).thenReturn(true);

        //WHEN
        experienceService.deleteExperience(id);

        //THEN
        verify(experienceRepository).existsById(id);
        verify(experienceRepository).deleteById(id);
    }

    @Test
    void deleteExperience_whenNotExists_thenThrowException() {
        //GIVEN
        String id = "1";

        when(experienceRepository.existsById(id)).thenReturn(false);

        // WHEN & THEN
        assertThrows(NoSuchExperienceException.class, () -> experienceService.deleteExperience(id));

        //THEN
        verify(experienceRepository, never()).deleteById(id);
    }

}
