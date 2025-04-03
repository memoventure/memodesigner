package memomeals.backend.experiences.controller;

import memomeals.backend.experiences.model.Experience;
import memomeals.backend.experiences.model.ExperienceInstance;
import memomeals.backend.experiences.model.Quiz;
import memomeals.backend.experiences.model.QuizElement;
import memomeals.backend.experiences.repository.ExperienceRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
public class ExperienceControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ExperienceRepository expRepository;

    @Test
    void getAllExperiences() throws Exception {

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
        Experience experience = new Experience("1", "Experience name", listOfQuizzes, expIstanceList);

        expRepository.save(experience);

        //WHEN
        mockMvc.perform(get("/api/experiences"))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json(""" 
                        [
                            {
                                "id": "1",
                                "name": "Experience name",
                                "listOfGames": [
                                {
                                  "id": "1",
                                  "name": "quiz name",
                                  "description": "quiz description",
                                  "listOfQuizElements": [
                                  {
                                    "question": "What is the capital of Italy?",
                                    "correctAnswer": "Rome",
                                    "listOfWrongAnswers": ["Madrid", "Berlin"]
                                  }
                                  ]
                                }
                                ],
                                "listOfExpInstances": [
                                {
                                    "id": "1",
                                    "gameCode": "123",
                                    "points": 5
                                }
                                ]
                            }
                        ]
                        """));
    }

    @Test
    void expectEmptyListOnGet() throws Exception {
        //GIVEN

        //WHEN
        mockMvc.perform(get("/api/experiences"))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                          {
                          }
                        ]
                        """));

    }

    @Test
    @DirtiesContext
    void getById() throws Exception {

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
        Experience experience = new Experience("1", "Experience name", listOfQuizzes, expIstanceList);

        expRepository.save(experience);

        //WHEN
        mockMvc.perform(get("/api/experiences/1"))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                         {
                            "id": "1",
                            "name": "Experience name",
                            "listOfGames": [
                            {
                              "id": "1",
                              "name": "quiz name",
                              "description": "quiz description",
                              "listOfQuizElements": [
                              {
                                "question": "What is the capital of Italy?",
                                "correctAnswer": "Rome",
                                "listOfWrongAnswers": ["Madrid", "Berlin"]
                              }
                              ]
                            }
                            ],
                            "listOfExpInstances": [
                            {
                                "id": "1",
                                "gameCode": "123",
                                "points": 5
                            }
                            ]
                        }
                        """));

    }

    @Test
    @DirtiesContext
    void getByIdTest_whenInvalidId_thenStatus404() throws Exception {
        //GIVEN
        //WHEN

        mockMvc.perform(get("/api/experiences/1"))
                //THEN
                .andExpect(status().isNotFound());

    }

    @Test
    @DirtiesContext
    void postExperience() throws Exception {
        //GIVEN

        //WHEN
        mockMvc.perform(post("/api/experiences")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "name": "Experience name",
                                    "listOfGames": [
                                    {
                                      "id": "1",
                                      "name": "quiz name",
                                      "description": "quiz description",
                                      "listOfQuizElements": [
                                      {
                                        "question": "What is the capital of Italy?",
                                        "correctAnswer": "Rome",
                                        "listOfWrongAnswers": ["Madrid", "Berlin"]
                                      }
                                      ]
                                    }
                                    ],
                                    "listOfExpInstances": [
                                    {
                                        "id": "1",
                                        "gameCode": "123",
                                        "gameStep": 0,
                                        "points": 5
                                    }
                                    ]
                                }
                                """)
                )
                //THEN
                .andExpect(status().isCreated())
                .andExpect(content().json("""       
                        {
                            "name": "Experience name",
                            "listOfGames": [
                            {
                              "id": "1",
                              "name": "quiz name",
                              "description": "quiz description",
                              "listOfQuizElements": [
                              {
                                "question": "What is the capital of Italy?",
                                "correctAnswer": "Rome",
                                "listOfWrongAnswers": ["Madrid", "Berlin"]
                              }
                              ]
                            }
                            ],
                            "listOfExpInstances": [
                            {
                                "id": "1",
                                "gameCode": "123",
                                "gameStep": 0,
                                "points": 5
                            }
                            ]
                        }
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    void putExperience() throws Exception {
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
        Experience experience = new Experience("1", "Experience name", listOfQuizzes, expIstanceList);

        expRepository.save(experience);

        //WHEN
        mockMvc.perform(put("/api/experiences/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "name": "Experience name 2",
                                "listOfGames": [
                                {
                                  "id": "1",
                                  "name": "quiz name 2",
                                  "description": "quiz description 2",
                                  "listOfQuizElements": [
                                  {
                                    "question": "What is the capital of Spain?",
                                    "correctAnswer": "Madrid",
                                    "listOfWrongAnswers": ["Rome", "Berlin"]
                                  }
                                  ]
                                }
                                ],
                                "listOfExpInstances": [
                                {
                                    "id": "2",
                                    "gameCode": "456",
                                    "points": 10
                                }
                                ]
                            }
                            """))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            {
                                "id": "1",
                                "name": "Experience name 2",
                                "listOfGames": [
                                {
                                  "id": "1",
                                  "name": "quiz name 2",
                                  "description": "quiz description 2",
                                  "listOfQuizElements": [
                                  {
                                    "question": "What is the capital of Spain?",
                                    "correctAnswer": "Madrid",
                                    "listOfWrongAnswers": ["Rome", "Berlin"]
                                  }
                                  ]
                                }
                                ],
                                "listOfExpInstances": [
                                {
                                    "id": "2",
                                    "gameCode": "456",
                                    "points": 10
                                }
                                ]
                            }
                        """));
    }

    @Test
    @DirtiesContext
    void deleteExperienceById() throws Exception {
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
        Experience experience = new Experience("1", "Experience name", listOfQuizzes, expIstanceList);

        expRepository.save(experience);

        //WHEN
        mockMvc.perform(delete("/api/experiences/1"))
                //THEN
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void deleteWorkout_shouldReturnNotFound_whenExperienceDoesNotExist() throws Exception {

        mockMvc.perform(delete("/api/experiences/{id}", "nonexistent-id"))
                .andExpect(status().isNotFound());

    }
}
