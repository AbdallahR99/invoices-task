using ITRootsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using AutoMapper;

namespace ITRootsAPI.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/Invoicess")]
    public class InvoicesController : ApiController
    {
        private readonly itrootsDBEntities _context = new itrootsDBEntities();

        public IHttpActionResult Get()
        {
            var list = _context.Invoices.ToList();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<Invoices, InvoiceDto>());

            var mapper = new Mapper(config);
            var invoiceToReturn = mapper.Map<List<Invoices>, List<InvoiceDto>>(list);

            return Ok(invoiceToReturn);
        }

        // GET api/values/5
        public IHttpActionResult Get(int id)
        {
            var invoice = _context.Invoices.FirstOrDefault(a => a.ID == id);
            if (invoice == null) return NotFound();
            return Ok(invoice);
        }

        // POST api/values
        public IHttpActionResult Post([FromBody] InvoiceDto invoiceDto)
        {
           
            if (invoiceDto.UserID == null) return Unauthorized();

            if (ModelState.IsValid)
            {
                var config = new MapperConfiguration(cfg => cfg.CreateMap< InvoiceDto, Invoices>());

                var mapper = new Mapper(config);
                var invoiceDB = mapper.Map<InvoiceDto, Invoices>(invoiceDto);

            
                invoiceDB.CreatedDate = DateTime.Now;

                _context.Invoices.Add(invoiceDB);

                if (_context.SaveChanges() > 0)
                    return Ok();

                else
                    return BadRequest();

            }
            else
            {
                return BadRequest();
            }

        }

        [HttpPost]
        [Route("GetAllByPagination")]
        public IHttpActionResult GetAllByPagination([FromBody] PaginatedItemsViewModel pagingVM)
        {
            var pagedResult = new PagedResult<Invoices>();

            pagingVM.PageNumber = (pagingVM.PageNumber == 0) ? 1 : pagingVM.PageNumber;
            pagingVM.PageSize = (pagingVM.PageSize == 0) ? 20 : pagingVM.PageSize;

            var source = _context.Invoices
                    .Where(a =>
                    (String.IsNullOrWhiteSpace(pagingVM.SearchBy) ||
                    a.Product.ToLower().Contains(pagingVM.SearchBy ?? "")
                   
                    )
                    ).AsQueryable();
            int CurrentPage = pagingVM.PageNumber;

            // Parameter is passed from Query string if it is null then it default Value will be pageSize:20  
            int PageSize = pagingVM.PageSize;
            List<Invoices> listToReturn = source.Skip((CurrentPage - 1) * PageSize).Take(PageSize).ToList();
            pagedResult.TotalCount = source.ToList().Count();//
            pagedResult.Result = listToReturn;
            return Ok(pagedResult);
        }

        // PUT api/values/5
        public IHttpActionResult Put([FromBody] InvoiceDto invoiceDto)
        {
           
            if (invoiceDto.UserID == null) return Unauthorized();

            if (ModelState.IsValid)
            {
                var config = new MapperConfiguration(cfg => cfg.CreateMap< InvoiceDto, Invoices>());

                var mapper = new Mapper(config);

                var invoiceDB = _context.Invoices.Find(invoiceDto.ID);
                if (invoiceDB == null) return NotFound();
                invoiceDB = mapper.Map<InvoiceDto, Invoices>(invoiceDto);

                if (_context.SaveChanges() > 0)
                    return Ok();

                else
                    return BadRequest();

            }
            else
            {
                return BadRequest();
            }

        }

        // DELETE api/values/5
        public IHttpActionResult Delete(int id)
        {
            var invoiceDB = _context.Invoices.Find(id);
            if (invoiceDB == null) return NotFound();

            _context.Invoices.Remove(invoiceDB);

            if (_context.SaveChanges() > 0)
                return Ok();

            else
                return BadRequest();
        }
    }
}
