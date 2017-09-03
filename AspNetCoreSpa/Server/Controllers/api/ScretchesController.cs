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

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/Scretches")]
    public class ScretchesController : Controller
    {
        private readonly ApplicationDbContext _context;
        private UserManager<ApplicationUser> _userManager;

        public ScretchesController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Scretches
        [HttpGet]
        public IEnumerable<Scretch> GetScretches()
        {
            var test = _context.Scretches.Where(x => x.Busy == false).ToList();
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

            _context.Scretches.Add(scretch);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetScretch", new { id = scretch.Id }, scretch);
        }

        // POST: api/Scretches
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
            temp.UserIdentifier = scretch.UserIdentifier;

            await _context.SaveChangesAsync();

            var user = _context.ApplicationUsers.Include(x => x.UserScretches).FirstOrDefault(x => x.Email == User.Identity.Name);
            user.UserScretches.Add(temp);

            _context.Scretches.Add(scretch);
            await _context.SaveChangesAsync();

            return Ok();
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