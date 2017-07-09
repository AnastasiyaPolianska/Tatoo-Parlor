using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AspNetCoreSpa.DAL.Entities
{
    public class Question : IEntityBase
    {
        [Required]
        public string Category { get; set; }

        [Required]
        public string Theme { get; set; }

        [Required]
        public string QuestionName { get; set; }

        [Required]
        public long CreatedBy { get; set; }

        [Key]
        public int Id { get; set; }
    }
}