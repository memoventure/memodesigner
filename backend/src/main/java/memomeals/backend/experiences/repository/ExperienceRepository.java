package memomeals.backend.experiences.repository;

import memomeals.backend.experiences.model.Experience;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceRepository extends MongoRepository<Experience, String>{

}

