using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class RolesController : ControllerBase
{
    private readonly RoleManager<IdentityRole> _roleManager;

    public RolesController(RoleManager<IdentityRole> roleManager)
    {
        _roleManager = roleManager;
    }

    // GET: api/Roles
    [HttpGet]
    public async Task<ActionResult<IEnumerable<IdentityRole>>> GetRoles()
    {
        return await _roleManager.Roles.ToListAsync();
    }

    // GET: api/Roles/5
    [HttpGet("{id}")]
    public async Task<ActionResult<IdentityRole>> GetRole(string id)
    {
        var role = await _roleManager.FindByIdAsync(id);

        if (role == null)
        {
            return NotFound();
        }

        return role;
    }

    // POST: api/Roles
    [HttpPost]
    public async Task<ActionResult<IdentityRole>> PostRole(IdentityRole role)
    {
        var result = await _roleManager.CreateAsync(role);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return CreatedAtAction(nameof(GetRole), new { id = role.Id }, role);
    }

    // PUT: api/Roles/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutRole(string id, IdentityRole role)
    {
        if (id != role.Id)
        {
            return BadRequest();
        }

        var existingRole = await _roleManager.FindByIdAsync(id);
        if (existingRole == null)
        {
            return NotFound();
        }

        existingRole.Name = role.Name;
        //existingRole.Description = role.Description;

        var result = await _roleManager.UpdateAsync(existingRole);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return NoContent();
    }

    // DELETE: api/Roles/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRole(string id)
    {
        var role = await _roleManager.FindByIdAsync(id);
        if (role == null)
        {
            return NotFound();
        }

        var result = await _roleManager.DeleteAsync(role);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return NoContent();
    }
}