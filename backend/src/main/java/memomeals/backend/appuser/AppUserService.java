package memomeals.backend.appuser;

import lombok.RequiredArgsConstructor;
import memomeals.backend.expection.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppUserService {


    private final AppUserRepository appUserRepository;

    public List<AppUser> getAppUsers() {
        return appUserRepository.findAll();
    }

    public AppUser getAppUserById(String id) {
        return appUserRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id " + id + " not found"));
    }

    public AppUser updateUserRole(String id, AppUserDto userData) {
        AppUser appUserToUpdate = getAppUserById(id);
        AppUser appUserToSave = appUserToUpdate.withRole(userData.role());
        return appUserRepository.save(appUserToSave);
    }

    public void deleteUser(String id) {
        appUserRepository.deleteById(id);
    }

}
