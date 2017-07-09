using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AspNetCoreSpa.DAL;
using AspNetCoreSpa.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/Cart")]
    public class CartController : Controller
    {
        private readonly ApplicationDbContext _context;
        private UserManager<ApplicationUser> _userManager;

        public CartController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Products
        //[HttpGet, Authorize]
        //public IEnumerable<Product> GetProduct()
        //{
        //    var test = _context.Product.ToList();
        //    return _context.Product;
        //}

        // GET: api/Products/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetProduct([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var product = await _context.Product.SingleOrDefaultAsync(m => m.Id == id);

        //    if (product == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(product);
        //}

        //// PUT: api/Products/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutProduct([FromRoute] int id, [FromBody] Product product)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != product.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(product).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ProductExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //GET: api/Cart/5/isInCart
        [HttpGet("{idProduct}/isInCart")]
        public async Task<bool> GetProduct(int idProduct)
        {
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);

            var temp = _context.UserProducts.Any(x => (x.ProductId == idProduct && x.UserId == user.Id));
            return temp;
        }

        //POST: api/Cart
        [HttpPost]
        public async Task<IActionResult> PostProduct([FromBody] int idProduct)
        {
            if(!_context.Product.Any(x => (x.Id == idProduct))){
                 return BadRequest("Product with such ID does not exist.");
             }

             var user = await _userManager.FindByEmailAsync(User.Identity.Name);

             _context.UserProducts.Add(new UserProduct {Amount=1, ProductId= idProduct, UserId=user.Id} );

             await _context.SaveChangesAsync();

            return Ok();
        }

        //// DELETE: api/Products/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var product = await _context.Product.SingleOrDefaultAsync(m => m.Id == id);
        //    if (product == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Product.Remove(product);
        //    await _context.SaveChangesAsync();

        //    return Ok(product);
        //}

        //private bool ProductExists(int id)
        //{
        //    return _context.Product.Any(e => e.Id == id);
        //}
    }
}