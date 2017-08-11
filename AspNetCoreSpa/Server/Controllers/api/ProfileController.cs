using System;
using System.Net;
using System.Threading.Tasks;
using AspNetCoreSpa.DAL.Entities;
using AspNetCoreSpa.Server.Extensions;
using AspNetCoreSpa.Server.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AspNetCoreSpa.DAL;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using System.Linq;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Route("api/[controller]")]
    public class ProfileController : BaseController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;

        public ProfileController(ILoggerFactory loggerFactory, UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _logger = loggerFactory.CreateLogger<ProfileController>();
            _userManager = userManager;
            _context = context;
        }

        [HttpGet("username")]
        public async Task<IActionResult> MeGet()
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);
                if (user != null)
                {
                    return Ok(new { FirstName = user.FirstName, LastName = user.LastName, Email = user.Email });
                }
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(ModelState.GetModelErrors());
            }
            catch (Exception ex)
            {
                _logger.LogError(1, ex, "Unable to get profile of user");
                return BadRequest();
            }

        }

        [HttpPost("username")]
        public async Task<IActionResult> MePost([FromBody]UserNameViewModel model)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);
                if (user != null)
                {
                    user.FirstName = model.FirstName;
                    user.LastName = model.LastName;
                    var result = await _userManager.UpdateAsync(user);
                    if (result == IdentityResult.Success)
                    {
                        return Ok(new { FirstName = model.FirstName, LastName = model.LastName });
                    }
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json("Unable to update user");
                }
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(ModelState.GetModelErrors());
            }
            catch (Exception ex)
            {
                _logger.LogError(1, ex, "Unable to save user name");

                return BadRequest();
            }

        }

        [HttpGet("id")]
        public async Task<IActionResult> MyId()
        {
            try
            {

                var user = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);
                if (user != null)
                {
                    return Ok(user.Id);
                }
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(ModelState.GetModelErrors());
            }
            catch (Exception ex)
            {
                _logger.LogError(1, ex, "Unable to get profile of user");
                return BadRequest();
            }

        }

        //GET: api/Profile/changefirstname/newFirstName
        [HttpGet("changefirstname/{newFirstName}")]
        public async Task<IActionResult> ChangeFirstName([FromRoute] string newFirstName)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);
                if (user != null)
                {
                    Regex regex = new Regex("[^a-zA-Z0-9_'-]");
                    MatchCollection matches = regex.Matches(newFirstName);
                    if (matches.Count > 0 || newFirstName.Length<4 || newFirstName.Length > 15)
                    {
                        throw new System.ArgumentException("Invalid argument", "newFirstName");
                    }
                    else
                    {
                        user.FirstName = newFirstName;
                        var result = await _userManager.UpdateAsync(user);
                        if (result == IdentityResult.Success)
                        {                       
                            return Ok();
                        }
                        Response.StatusCode = (int)HttpStatusCode.BadRequest;
                        return Json("Unable to update user");                
                    }      
                }
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(ModelState.GetModelErrors());
            }
            catch (Exception ex)
            {
                _logger.LogError(1, ex, "Unable to save user name");

                return BadRequest();
            }
        }

        //GET: api/Profile/changelastname/newLastName
        [HttpGet("changelastname/{newLastName}")]
        public async Task<IActionResult> ChangeLastName([FromRoute] string newLastName)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);
                if (user != null)
                {
                    Regex regex = new Regex("[^a-zA-Z0-9_'-]");
                    MatchCollection matches = regex.Matches(newLastName);
                    if (matches.Count > 0 || newLastName.Length < 4 || newLastName.Length > 15)
                    {
                        throw new System.ArgumentException("Invalid argument", "newLastName");
                    }
                    else
                    {
                        user.LastName = newLastName;
                        var result = await _userManager.UpdateAsync(user);
                        if (result == IdentityResult.Success)
                        {
                            return Ok();
                        }
                        Response.StatusCode = (int)HttpStatusCode.BadRequest;
                        return Json("Unable to update user");
                    }
                }
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(ModelState.GetModelErrors());
            }
            catch (Exception ex)
            {
                _logger.LogError(1, ex, "Unable to save user name");

                return BadRequest();
            }
        }

        //GET: api/Profile/changeemail
        [HttpPost("changeemail")]
        public async Task<IActionResult> ChangeEmail([FromBody] ChangeEmailModel changeEmail)
        {
            var user = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);
            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "Error while changing the email: user isn't logged in");
                return BadRequest(ModelState.GetModelErrors());
            }

            if (!ModelState.IsValid)
            {
                ModelState.AddModelError(string.Empty, "Error while changing the email: enter your real current email address");
                return BadRequest(ModelState.GetModelErrors());
            }
      
            if (_context.Users.Any(x => x.Email == changeEmail.newEmail))
            {
                ModelState.AddModelError(string.Empty, "Error while changing the email: user with such email already exists");
                return BadRequest(ModelState.GetModelErrors());
            }

            var temp = await _userManager.CheckPasswordAsync(user, changeEmail.password);
            if (!temp)
            {
                ModelState.AddModelError(string.Empty, "Error while changing the email: enter your current password correctly");
                return BadRequest(ModelState.GetModelErrors());
            }

            await _userManager.SetEmailAsync(user, changeEmail.newEmail);
            await _userManager.SetUserNameAsync(user, changeEmail.newEmail);

            var result = await _userManager.UpdateAsync(user);
            if (result == IdentityResult.Success)
                {
                    return Ok("good");
                }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            throw new System.Exception("Error while changing the email: unable to update user");
        }

        //GET: api/Profile/changeemail
        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel changePassword)
        {
            var user = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);
            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "Error while changing the email: user isn't logged in");
                return BadRequest(ModelState.GetModelErrors());
            }

            if (changePassword.newPassword.Length < 6)
            {
                ModelState.AddModelError(string.Empty, "Error while changing the password: check the length");
                return BadRequest(ModelState.GetModelErrors());
            }

            var result = await _userManager.ChangePasswordAsync(user, changePassword.password, changePassword.newPassword);
            if (result == IdentityResult.Success)
            {
                return Ok("good");
            }

            ModelState.AddModelError(string.Empty, "Error while changing the password: enter your current password correctly");
            return BadRequest(ModelState.GetModelErrors());
        }       
    }

    public class ChangeEmailModel
    {
        [Required]
        [EmailAddress]
        public string newEmail { get; set; }
        [Required]
        public string password { get; set; }
    }

    public class ChangePasswordModel
    {
        [Required]
        public string newPassword { get; set; }
        [Required]
        public string password { get; set; }
    }
}