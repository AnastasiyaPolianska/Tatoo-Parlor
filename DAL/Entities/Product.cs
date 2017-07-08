
using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata;
using System.ComponentModel.DataAnnotations.Schema;

namespace AspNetCoreSpa.DAL.Entities
{
    public class Product:IEntityBase
    {
        [Required, MaxLength(100)]
        public string productName { get; set; }
        public int productCode { get; set; }
        public DateTime releaseDate { get; set; }
        public double price { get; set; }
        public string description { get; set; }
        public double starRating { get; set; }
        public string imageUrl { get; set; }
        [Key]
        public int Id { get; set; }
    }

}