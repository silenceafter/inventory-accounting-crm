using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class SettingsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SettingsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Setting>>> GetSettings()
    {
        return await _context.Settings.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Setting>> GetSetting(int id)
    {
        var setting = await _context.Settings.FindAsync(id);

        if (setting == null)
        {
            return NotFound();
        }

        return setting;
    }

    [HttpPost]
    public async Task<ActionResult<Setting>> PostSetting(Setting setting)
    {
        _context.Settings.Add(setting);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSetting), new { id = setting.Id }, setting);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutSetting(int id, Setting setting)
    {
        if (id != setting.Id)
        {
            return BadRequest();
        }

        _context.Entry(setting).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!SettingExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSetting(int id)
    {
        var setting = await _context.Settings.FindAsync(id);
        if (setting == null)
        {
            return NotFound();
        }

        _context.Settings.Remove(setting);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool SettingExists(int id)
    {
        return _context.Settings.Any(e => e.Id == id);
    }
}