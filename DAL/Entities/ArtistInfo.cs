using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AspNetCoreSpa.DAL.Entities
{
    public class ArtistInfo : IEntityBase
    {
        [Required]
        public string Name { get; set; }
        public string Works { get; set; }

        [Key]
        public int Id { get; set; }
    }
}
