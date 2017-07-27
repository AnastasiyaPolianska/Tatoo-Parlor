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

        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordVm model)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);
                if (user != null)
                {
                    var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
                    if (result == IdentityResult.Success)
                    {
                        return Ok(new { });
                    }
                }
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new[] { "Unable to change password" });
            }
            catch (Exception ex)
            {
                _logger.LogError(1, ex, "Unable to change password");
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
                    user.FirstName = newFirstName;
                    var result = await _userManager.UpdateAsync(user);
                    if (result == IdentityResult.Success)
                    {
                        return Ok();
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

        //GET: api/Profile/changelastname/newLastName
        [HttpGet("changelastname/{newLastName}")]
        public async Task<IActionResult> ChangeLastName([FromRoute] string newLastName)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);
                if (user != null)
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
            try
            {
                var user = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);
                if (user != null)
                {
                    var temp = await _userManager.CheckPasswordAsync(user, changeEmail.password);
                    if (temp) user.Email = changeEmail.newEmail;

                    var result = await _userManager.UpdateAsync(user);
                    if (result == IdentityResult.Success)
                    {
                        return Ok();
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
    }

    public class ChangeEmailModel
    {
        [Required]
        [EmailAddress]
        public string newEmail { get; set; }
        [Required]
        public string password { get; set; }
    }
}
