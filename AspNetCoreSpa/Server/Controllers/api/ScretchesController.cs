using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AspNetCoreSpa.DAL;
using AspNetCoreSpa.DAL.Entities;
using Microsoft.AspNetCore.Identity;
using AspNetCoreSpa.Server.Services.Abstract;
using System.IO;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/Scretches")]
    public class ScretchesController : Controller
    {
        private readonly ApplicationDbContext _context;
        private UserManager<ApplicationUser> _userManager;
        private readonly IFileUploader fileUploader;

        public ScretchesController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, IFileUploader fileUploader)
        {
            _context = context;
            _userManager = userManager;
            this.fileUploader = fileUploader;
        }

        // GET: api/Scretches
        [HttpGet]
        public IEnumerable<Scretch> GetScretches()
        {
            var test = _context.Scretches.Where(x => x.Busy == false).ToList();
            return test;
        }

        // GET: api/Scretches/ForUser
        [HttpGet("ForUser")]
        public async Task<IEnumerable<Scretch>> GetScretchesForUserAsync()
        {
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);

            var test = _context.Scretches.Where(x => x.IdentifierOfUser == user.Id).ToList();
            return test;
        }

        // GET: api/Scretches/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetScretch([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var scretch = await _context.Scretches.SingleOrDefaultAsync(m => m.Id == id);

            if (scretch == null)
            {
                return NotFound();
            }

            return Ok(scretch);
        }

        // PUT: api/Scretches/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutScretch([FromRoute] int id, [FromBody] Scretch scretch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != scretch.Id)
            {
                return BadRequest();
            }

            _context.Entry(scretch).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScretchExists(id))
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

        // POST: api/Scretches
        [HttpPost]
        public async Task<IActionResult> PostScretch([FromBody] Scretch scretch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(User.Identity.Name);
            scretch.ScretchName = "Scretch for user " + user.Email;
            scretch.IdentifierOfUser = user.Id;

            _context.Scretches.Add(scretch);
            await _context.SaveChangesAsync();

            return Ok(scretch.Id);
        }

        // POST: api/Scretches/SetId
        [HttpPost("SetId")]
        public async Task<IActionResult> PostScretchWithId([FromBody] Scretch scretch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var temp = _context.Scretches.FirstOrDefault(x => x.Id == scretch.Id);
            temp.Date = scretch.Date;
            temp.Busy = scretch.Busy;

            var user = await _userManager.FindByEmailAsync(User.Identity.Name);
            temp.IdentifierOfUser = user.Id;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("AddPhoto/{scretchId}")]
        public async Task AddScretchPhoto([FromRoute] long scretchId)
        {
            var scretch = _context.Scretches.First(x => x.Id == scretchId);
            using (Stream fs = Request.Form.Files[0].OpenReadStream())
            {
               scretch.ImageUrl = await this.fileUploader.UploadImage(fs, scretchId, "scratches");
            }
            _context.Update(scretch);
            await _context.SaveChangesAsync();
        }

        // DELETE: api/Scretches/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScretch([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var scretch = await _context.Scretches.SingleOrDefaultAsync(m => m.Id == id);
            if (scretch == null)
            {
                return NotFound();
            }

            _context.Scretches.Remove(scretch);
            await _context.SaveChangesAsync();

            return Ok(scretch);
        }

        private bool ScretchExists(int id)
        {
            return _context.Scretches.Any(e => e.Id == id);
        }
    }
}