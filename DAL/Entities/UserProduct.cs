﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AspNetCoreSpa.DAL.Entities
{
    public class UserProduct
    {
        [Required]
        public ApplicationUser User { get; set; }

        [Required]
        public Product ProductInCart { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public long Amount { get; set; }
    }
}