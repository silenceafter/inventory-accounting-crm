using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class SuppliesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SuppliesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Supply>>> GetSupplies()
    {
        return await _context.Supplies.Include(s => s.Supplier).Include(s => s.SupplyItems).ThenInclude(si => si.Product).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Supply>> GetSupply(int id)
    {
        var supply = await _context.Supplies
            .Include(s => s.Supplier)
            .Include(s => s.SupplyItems).ThenInclude(si => si.Product)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (supply == null)
        {
            return NotFound();
        }

        return supply;
    }

    [HttpPost]
    public async Task<ActionResult<Supply>> PostSupply(Supply supply)
    {
        foreach (var item in supply.SupplyItems)
        {
            var product = await _context.Products.FindAsync(item.ProductId);
            if (product == null)
            {
                return BadRequest("Товар не найден");
            }
            product.Quantity += item.Quantity;
        }

        _context.Supplies.Add(supply);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSupply), new { id = supply.Id }, supply);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutSupply(int id, Supply supply)
    {
        if (id != supply.Id)
        {
            return BadRequest();
        }

        _context.Entry(supply).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!SupplyExists(id))
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
    public async Task<IActionResult> DeleteSupply(int id)
    {
        var supply = await _context.Supplies.FindAsync(id);
        if (supply == null)
        {
            return NotFound();
        }

        _context.Supplies.Remove(supply);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool SupplyExists(int id)
    {
        return _context.Supplies.Any(e => e.Id == id);
    }
}