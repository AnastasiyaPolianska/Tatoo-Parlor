
using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace AspNetCoreSpa.DAL.Entities
{
    public class Scretch : IEntityBase
    {
        [Required, MaxLength(100)]
        public string ScretchName { get; set; }

        public int IdentifierOfUser { get; set; }

        public double Price { get; set; }

        public double Width { get; set; }

        public double Height { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public bool Busy { get; set; }

        public DateTime Date { get; set; }

        [Key]
        public int Id { get; set; }
    }

}