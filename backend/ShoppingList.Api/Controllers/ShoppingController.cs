using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingList.Api.Data;
using ShoppingList.Api.Models;

namespace ShoppingList.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ShoppingController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShoppingItem>>> GetItems()
        {
            return await _context.ShoppingItems.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<ShoppingItem>> AddItem(ShoppingItem item)
        {
            _context.ShoppingItems.Add(item);
            await _context.SaveChangesAsync();

            return Ok(item);
        }

    }
}
