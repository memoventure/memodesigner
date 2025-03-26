package memomeals.backend.experiences.expection;

import java.util.NoSuchElementException;

public class NoSuchExperienceException extends NoSuchElementException {
    public NoSuchExperienceException(String message) {
        super(message);
    }
}
