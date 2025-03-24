package memomeals.memobackend.experiences.expection;

import memomeals.memobackend.experiences.dto.CustomErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public CustomErrorMessage handleNoSuchElementException(NoSuchElementException exception) {
        return new CustomErrorMessage(exception.getMessage(), LocalDateTime.now());
    }

    @ExceptionHandler(NoSuchExperienceException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public CustomErrorMessage handleNoSuchProductException(NoSuchExperienceException exception) {
        return new CustomErrorMessage(exception.getMessage(), LocalDateTime.now());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public CustomErrorMessage handleException(Exception exception) {
        return new CustomErrorMessage(exception.getMessage(), LocalDateTime.now());
    }

}
