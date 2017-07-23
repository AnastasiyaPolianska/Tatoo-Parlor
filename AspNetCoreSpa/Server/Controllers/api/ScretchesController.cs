using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AspNetCoreSpa.DAL;
using AspNetCoreSpa.DAL.Entities;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/Scretches")]
    public class ScretchesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ScretchesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Scretches
        [HttpGet]
        public IEnumerable<Scretch> GetScretches()
        {
            var test = _context.Scretches.ToList();
            return _context.Scretches;
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