using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ITRootsAPI.Models
{
    public class PaginatedItemsViewModel
    {
        //const int MaxPageSize = 10;
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SearchBy { get; set; }

    }

}