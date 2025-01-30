using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class StockOperationsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public StockOperationsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<StockOperation>>> GetStockOperations()
    {
        return await _context.StockOperations.Include(so => so.Product).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<StockOperation>> GetStockOperation(int id)
    {
        var stockOperation = await _context.StockOperations.FindAsync(id);

        if (stockOperation == null)
        {
            return NotFound();
        }

        return stockOperation;
    }

    [HttpPost]
    public async Task<ActionResult<StockOperation>> PostStockOperation(StockOperation stockOperation)
    {
        var product = await _context.Products.FindAsync(stockOperation.ProductId);
        if (product == null)
        {
            return BadRequest("Товар не найден");
        }

        if (stockOperation.Type == "In")
        {
            product.Quantity += stockOperation.Quantity;
        }
        else if (stockOperation.Type == "Out")
        {
            if (product.Quantity < stockOperation.Quantity)
            {
                return BadRequest("Недостаточно товаров на складе");
            }
            product.Quantity -= stockOperation.Quantity;
        }

        _context.StockOperations.Add(stockOperation);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetStockOperation), new { id = stockOperation.Id }, stockOperation);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutStockOperation(int id, StockOperation stockOperation)
    {
        if (id != stockOperation.Id)
        {
            return BadRequest();
        }

        _context.Entry(stockOperation).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!StockOperationExists(id))
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
    public async Task<IActionResult> DeleteStockOperation(int id)
    {
        var stockOperation = await _context.StockOperations.FindAsync(id);
        if (stockOperation == null)
        {
            return NotFound();
        }

        _context.StockOperations.Remove(stockOperation);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool StockOperationExists(int id)
    {
        return _context.StockOperations.Any(e => e.Id == id);
    }
}