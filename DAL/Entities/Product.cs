
using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace AspNetCoreSpa.DAL.Entities
{
    public class Product : IEntityBase
    {
        [Required, MaxLength(100)]
        public string ProductName { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public double StarRating { get; set; }
        public string ImageUrl { get; set; }
        public int AmountLeft { get; set; }
        public List<UserProduct> Clients { get; set; }

        [Key]
        public int Id { get; set; }
    }

}