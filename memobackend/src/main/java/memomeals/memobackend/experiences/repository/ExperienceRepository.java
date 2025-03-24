package memomeals.memobackend.experiences.repository;

import memomeals.memobackend.experiences.model.Experience;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceRepository extends MongoRepository<Experience, String>{

}

