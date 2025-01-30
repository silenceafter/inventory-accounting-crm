using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

[ApiController]
public class AccountController : ControllerBase
{
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly UserManager<IdentityUser> _userManager;

    public AccountController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
        if (result.Succeeded)
        {
            return Ok(new { message = "Успешно" });
        }

        return BadRequest(new { message = "Неудачная попытка входа" });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        var user = new IdentityUser { UserName = model.Email, Email = model.Email };
        var result = await _userManager.CreateAsync(user, model.Password);
        if (result.Succeeded)
        {
            await _signInManager.SignInAsync(user, isPersistent: false);
            return Ok(new { message = "Registration successful" });
        }

        return BadRequest(result.Errors.Select(e => e.Description));
    }

    //[Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok(new { message = "Logout successful" });
    }

    [HttpGet("check-auth-status")]
    public async Task<IActionResult> CheckAuthStatus()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var user = await _userManager.GetUserAsync(User);
        if (user != null && _signInManager.IsSignedIn(User))
        {
            return Ok(true);
        }

        return Ok(false);
    }

    [HttpGet("roles")]
    [Authorize]
    public async Task<IActionResult> GetUserRoles()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var user = await _userManager.GetUserAsync(User);

        if (user != null && _signInManager.IsSignedIn(User))
        {
            // Получаем роли пользователя
            var roles = await _userManager.GetRolesAsync(user);
            return Ok(new { roles = roles });            
        }
        return Ok(null);
    }
}