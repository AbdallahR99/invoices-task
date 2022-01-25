using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ITRootsAPI.Models
{
    public class UserDto
    {
        public int ID { get; set; }

        [Required]
        [MaxLength(255)]
        public string FullName { get; set; }

        [Required]
        [MaxLength(255)]
        public string Username { get; set; }

        [Required]
        [MaxLength(255)]
        public string Password { get; set; }


        [Required]
        [MaxLength(255)]
        public string ConfirmPassword { get; set; }

        [Required]
        [MaxLength(255)]
        public string Email { get; set; }

        public bool IsAdmin { get; set; }

        [Required]
        [MaxLength(20)]
        public string Phone { get; set; }
       
    }
}