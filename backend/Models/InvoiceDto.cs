using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ITRootsAPI.Models
{
    public class InvoiceDto
    {
        public int ID { get; set; }
        public string Product { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int? UserID { get; set; }
        public System.DateTime CreatedDate { get; set; }

        public Users Users { get; set; }
    }
}