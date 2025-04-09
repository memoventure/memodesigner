package memomeals.backend.appuser;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;

    @GetMapping
    public List<AppUser> getAppUsers(){
        return appUserService.getAppUsers();
    }

    @GetMapping("/{id}")
    public AppUserDto getAppUserById(@PathVariable String id) {
        AppUser user = appUserService.getAppUserById(id);
        return new AppUserDto(user.role(), user.username(), user.id());
    }

    @PutMapping("/{id}")
    public AppUserDto updateUserRole(@PathVariable String id, @RequestBody AppUserDto userData) {
        AppUser updatedUser = appUserService.updateUserRole(id, userData);
        return new AppUserDto(updatedUser.role(), userData.username(), userData.id());
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id){
        appUserService.deleteUser(id);
    }
}
