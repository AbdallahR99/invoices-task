using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ITRootsAPI.Models
{
    public class PagedResult<T>
    {

        public List<T> Result { set; get; }

        public int TotalCount { set; get; }

    }
}