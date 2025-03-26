package memomeals.backend.utils;

import org.springframework.stereotype.Service;

import java.util.UUID;

//Frage: Von Mongo nutzen????
@Service
public class IdService {

    public String randomId()  {
        return UUID.randomUUID().toString();
    }
}
