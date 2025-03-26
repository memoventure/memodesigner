package memomeals.backend.experiences.dto;

import java.time.LocalDateTime;

public record CustomErrorMessage(
        String message,
        LocalDateTime timestamp
) {
}