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
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/Questions")]
    [Authorize]
    public class QuestionsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private UserManager<ApplicationUser> _userManager;

        public QuestionsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Questions
        [HttpGet]
        public IEnumerable<Question> GetQuestions()
        {
            return _context.Questions.Where(x => x.Answer == "").ToList();
        }

        // GET: api/GetQuestionsForUser
        [HttpGet("GetQuestionsForUser")]
        public async Task<IEnumerable<Question>> GetQuestionsForUserAsync()
        {
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);
            return _context.Questions.Where(x => x.CreatedBy == user.Id).ToList();
        }

        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuestion([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var question = await _context.Questions.SingleOrDefaultAsync(m => m.Id == id);

            if (question == null)
            {
                return NotFound();
            }

            return Ok(question);
        }

        // PUT: api/Questions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion([FromRoute] int id, [FromBody] Question question)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != question.Id)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
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

        // POST: api/Questions
        [HttpPost]
        public async Task<IActionResult> PostQuestion([FromBody] Question question)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestion", new { id = question.Id }, question);
        }

        // POST: api/Questions/answer
        [HttpPost("answer")]
        public async Task<IActionResult> AnswerQuestion([FromBody] AddAnswerModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var toChange = _context.Questions.FirstOrDefault(x => x.Id == model.id);
            toChange.Answer = model.answer;

            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var question = await _context.Questions.SingleOrDefaultAsync(m => m.Id == id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return Ok(question);
        }

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.Id == id);
        }
    }

    public class AddAnswerModel
    {
        [Required]
        public string answer { get; set; }
        [Required]
        public int id { get; set; }
    }
}