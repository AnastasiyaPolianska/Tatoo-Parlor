using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AspNetCoreSpa.DAL;
using AspNetCoreSpa.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using AspNetCoreSpa.Server.Services.Abstract;
using System.IO;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/Products")]
    public class ProductsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private UserManager<ApplicationUser> _userManager;
        private readonly IFileUploader fileUploader;

        public ProductsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, IFileUploader fileDownloader)
        {
            _context = context;
            _userManager = userManager;
            this.fileUploader = fileDownloader;
        }

        // GET: api/Products
        [HttpGet, Authorize]
        public async Task<IActionResult> GetProductAsync()
        {
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);

            var userProducts = _context.UserProducts.Include(y => y.ProductInCart).Where(x => x.UserId == user.Id).Select(x => x.ProductInCart).ToList();
            var allProducts = _context.Product.ToList();

            var rezult = allProducts.Select(x => new { x.Id, x.ProductName, x.AmountLeft, x.Price, x.Description, x.StarRating, x.ImageUrl, isInCart=userProducts.Contains(x) }).ToList();

            return Ok(rezult);
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = await _context.Product.SingleOrDefaultAsync(m => m.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct([FromRoute] int id, [FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Products
        [HttpPost]
        public async Task<IActionResult> PostProduct([FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Product.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        [HttpPost("AddPhoto/{productId}")]
        public async Task AddScretchPhoto([FromRoute] long productId)
        {
            var product = _context.Product.First(x => x.Id == productId);
            using (Stream fs = Request.Form.Files[0].OpenReadStream())
            {
                product.ImageUrl = await this.fileUploader.UploadImage(fs, productId, "products");
            }
            _context.Update(product);
            await _context.SaveChangesAsync();
        }

        // POST: api/Products/change
        [HttpPost("change")]
        public async Task<IActionResult> ChangeProduct([FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var toChange = _context.Product.FirstOrDefault(x => x.Id == product.Id);
            toChange.ProductName = product.ProductName;
            toChange.Description = product.Description;
            toChange.ImageUrl = product.ImageUrl;
            toChange.Price = product.Price;
            toChange.AmountLeft = product.AmountLeft;

            var toChangeAmount = _context.UserProducts.Where(x => x.ProductId== product.Id);

            foreach (UserProduct item in toChangeAmount)
                if (item.Amount > item.ProductInCart.AmountLeft) item.Amount = item.ProductInCart.AmountLeft;

            await _context.SaveChangesAsync();

            return Ok();
        }

        //GET: api/Products/delete
        [HttpPost("delete")]
        public async Task<IActionResult> DeleteProduct([FromBody] int idProduct)
        {
            var toDelete = _context.Product.FirstOrDefault(x => x.Id == idProduct);
            _context.Product.Remove(toDelete);

            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool ProductExists(int id)
        {
            return _context.Product.Any(e => e.Id == id);
        }
    }
}