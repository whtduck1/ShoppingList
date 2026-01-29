using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ShoppingList.Api.Data;
using ShoppingList.Api.Hubs;
using ShoppingList.Api.Models;

namespace ShoppingList.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<ShoppingHub> _hubContext;

        public ShoppingController(AppDbContext context, IHubContext<ShoppingHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
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
            await _hubContext.Clients.All.SendAsync("ReceiveItemsUpdate");
            return Ok(item);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.ShoppingItems.FindAsync(id);
            if (item == null) return NotFound();

            _context.ShoppingItems.Remove(item);
            await _context.SaveChangesAsync();

            await _hubContext.Clients.All.SendAsync("ReceiveItemsUpdate");

            return NoContent();
        }
    }
}
