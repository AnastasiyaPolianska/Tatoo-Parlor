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

        // GET: api/Cart
        [HttpGet, Authorize]
        public async Task<IActionResult> GetProductsInCart() 
        {
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);

            var rezult = _context.UserProducts.Where(x => x.UserId == user.Id).Select(y => new { y.ProductInCart.Id, y.ProductInCart.ProductName, y.ProductInCart.AmountLeft, y.Amount, y.ProductInCart.Price, y.ProductInCart.Description, y.ProductInCart.StarRating, y.ProductInCart.ImageUrl}).ToList();

            return Ok(rezult);
        }

        //GET: api/Cart/delete
        [HttpPost("delete")]
        public async Task<IActionResult> DeleteProduct([FromBody] int idProduct)
        {
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);

            var toDelete = _context.UserProducts.FirstOrDefault(x => x.ProductId == idProduct && x.UserId == user.Id);
            _context.UserProducts.Remove(toDelete);

            await _context.SaveChangesAsync();

            return Ok();
        }

        //POST: api/Cart/buyall
        [HttpPost("buyall")]
        public async Task<IActionResult> BuyAll()
        {
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);

            var toDelete = _context.UserProducts.Include(x => x.ProductInCart).Where(x => x.UserId == user.Id);

            foreach (var item in toDelete) {
                item.ProductInCart.AmountLeft = item.ProductInCart.AmountLeft - (int)item.Amount;
            }

            _context.UserProducts.RemoveRange(toDelete);

            await _context.SaveChangesAsync();

            return Ok();
        }

        //POST: api/Cart/deleteall
        [HttpPost("deleteall")]
        public async Task<IActionResult> DeleteAll()
        {
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);

            var toDelete = _context.UserProducts.Where(x => x.UserId == user.Id);
            _context.UserProducts.RemoveRange(toDelete);

            await _context.SaveChangesAsync();

            return Ok();
        }

        //GET: api/Cart/5/changeamount
        [HttpPost("{id}/changeamount")]
        public async Task<IActionResult> ChangeAmount([FromRoute] int id, [FromBody] int amount)
        {
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);

            var userproduct = _context.UserProducts.FirstOrDefault(x => x.UserId == user.Id && x.ProductId == id);
            userproduct.Amount = amount;

            await _context.SaveChangesAsync();

            return Ok();
        }

        //GET: api/Cart/5/isInCart
        [HttpGet("{idProduct}/isInCart")]
        public async Task<bool> GetProduct(int idProduct)
        {
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);

            var temp = _context.UserProducts.Any(x => (x.ProductId == idProduct && x.UserId == user.Id));
            return temp;
        }

        //GET: api/Cart/totalsum
        [HttpGet("totalsum")]
        public async Task<double> GetTotalSum()
        {
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);

            var temp = _context.UserProducts.Include(x => x.ProductInCart).Where(x => (x.UserId == user.Id));

            var sum = 0.0;
            foreach (var item in temp) {
                sum += item.ProductInCart.Price * item.Amount;
            }

            return sum;
        }

        //GET: api/Cart/totalsum
        [HttpGet("totalamount")]
        public async Task<double> GetTotalAmount()
        {
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);

            var temp = _context.UserProducts.Include(x => x.ProductInCart).Where(x => (x.UserId == user.Id));

            var amount = 0;
            foreach (var item in temp)
            {
                amount += (int)item.Amount;
            }

            return amount;
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
    }
}