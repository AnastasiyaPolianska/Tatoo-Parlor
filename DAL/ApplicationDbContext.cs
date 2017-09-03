using AspNetCoreSpa.DAL.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreSpa.DAL
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<ApplicationRole> ApplicationRoles { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Content> Content { get; set; }
        public DbSet<ContentText> ContentText { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<ArtistInfo> ArtistInfo { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<UserProduct> UserProducts { get; set; }
        public DbSet<Scretch> Scretches { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserProduct>().HasOne(x => x.User).WithMany(y => y.ProductsInCart).HasForeignKey(k => k.UserId);
            modelBuilder.Entity<UserProduct>().HasOne(x => x.ProductInCart).WithMany(y => y.Clients).HasForeignKey(k => k.ProductId);

            modelBuilder.Entity<UserProduct>().HasKey(x => new { x.ProductId, x.UserId });

            modelBuilder.Entity<Scretch>().HasOne(x => x.User).WithMany(y => y.UserScretches);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}