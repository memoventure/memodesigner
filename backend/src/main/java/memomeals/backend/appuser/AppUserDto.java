package memomeals.backend.appuser;
import lombok.Builder;

@Builder
public record AppUserDto(
        AppUserRole role,
        String username,
        String id
) {
}
