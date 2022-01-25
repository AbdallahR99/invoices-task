using AutoMapper;
using ITRootsAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ITRootsAPI.Controllers
{

    [RoutePrefix("api/Users")]
    public class UsersController : ApiController
    {
        private readonly db_a79052_rootdbEntities _context = new db_a79052_rootdbEntities();

        public IHttpActionResult Get()
        {
            return Ok(_context.SelectUserList());
        }

        // GET api/users/5
        public IHttpActionResult Get(int id)
        {
            var user = _context.SelectUserList().FirstOrDefault(a => a.ID == id);
            if (user == null) return NotFound();
            return Ok(user);
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("GetAllByPagination")]
        public IHttpActionResult GetAllByPagination([FromBody] PaginatedItemsViewModel pagingVM)
        {
            var pagedResult = new PagedResult<Users>();

            pagingVM.PageNumber = (pagingVM.PageNumber == 0) ? 1 : pagingVM.PageNumber;
            pagingVM.PageSize = (pagingVM.PageSize == 0) ? 20 : pagingVM.PageSize;

            var source = _context.SelectUserList()
                    .Where(a =>
                    (String.IsNullOrWhiteSpace(pagingVM.SearchBy) ||
                    a.Username.ToLower().Contains(pagingVM.SearchBy ?? "")
                    || a.FullName.ToLower().Contains(pagingVM.SearchBy ?? "")
                    )
                    );
            int CurrentPage = pagingVM.PageNumber;

            // Parameter is passed from Query string if it is null then it default Value will be pageSize:20  
            var config = new MapperConfiguration(cfg => cfg.CreateMap<SelectUserList_Result, Users>());

            var mapper = new Mapper(config);
            //var usersDB = mapper.ProjectTo<Users>((List<SelectUserList_Result>)source);
            int PageSize = pagingVM.PageSize;
            List<SelectUserList_Result> list = source.AsQueryable().Skip((CurrentPage - 1) * PageSize).Take(PageSize).ToList();
            List<Users> listToReturn = mapper.Map<List<SelectUserList_Result>, List<Users>>(list);
            pagedResult.TotalCount = 5;//
            pagedResult.Result = listToReturn;
            return Ok(pagedResult);
        }




        [AllowAnonymous]
        // POST api/users
        public IHttpActionResult Post([FromBody] UserDto userDto)
        {
            if (ModelState.IsValid)
            {
                var isExisting = _context.SelectUserList().Any(a => a.Username == userDto.Username || a.Email == userDto.Email);
                if (isExisting) return BadRequest("This user is already exists");
                var config = new MapperConfiguration(cfg => cfg.CreateMap<UserDto, Users>());

                var mapper = new Mapper(config);
                var userDB = mapper.Map<UserDto, Users>(userDto);

                var isAdmin = _context.SelectUserList().Count() == 0;
                userDB.IsAdmin = isAdmin;
                userDB.CreatedDate = DateTime.Now;
                userDB.Password = EncodePasswordToBase64(userDto.Password);

                _context.Users.Add(userDB);

                if (_context.SaveChanges() > 0)
                {
                    var user = _context.Users.FirstOrDefault(a => a.Username == userDto.Username);
                    return Ok(user);
                }

                else
                    return BadRequest();

            }
            else
            {
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        // POST api/users
        public IHttpActionResult Login([FromBody] UserDto userDto)
        {

            var userDB = _context.SelectUserList().FirstOrDefault(a => a.Username == userDto.Username);
            if (userDB == null) return NotFound();

            userDB.IsAdmin = userDto.IsAdmin;

            if (DecodeFrom64(userDB.Password) == userDto.Password)
                return Ok(userDB);

            else
                return BadRequest("Password not correct");
        }

        // PUT api/users/5
        public IHttpActionResult Put([FromBody] UserDto userDto)
        {
            if (ModelState.IsValid)
            {
                var config = new MapperConfiguration(cfg => cfg.CreateMap<UserDto, Users>());

                var mapper = new Mapper(config);
                //  var userDB = mapper.Map<UserDto, Users>(userDto);

                var userDB = _context.Users.Find(userDto.ID);
                if (userDB == null) return NotFound();

                userDB = mapper.Map<UserDto, Users>(userDto);
                _context.Entry(userDB).State = EntityState.Modified;

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

        // DELETE api/users/5
        public IHttpActionResult Delete(int id)
        {
            return Ok(_context.DeleteUser(id));
        }


        private string EncodePasswordToBase64(string password)
        {
            try
            {
                byte[] encData_byte = new byte[password.Length];
                encData_byte = System.Text.Encoding.UTF8.GetBytes(password);
                string encodedData = Convert.ToBase64String(encData_byte);
                return encodedData;
            }
            catch (Exception ex)
            {
                throw new Exception("Error in base64Encode" + ex.Message);
            }
        }

        public string DecodeFrom64(string encodedData)
        {
            System.Text.UTF8Encoding encoder = new System.Text.UTF8Encoding();
            System.Text.Decoder utf8Decode = encoder.GetDecoder();
            byte[] todecode_byte = Convert.FromBase64String(encodedData);
            int charCount = utf8Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);
            char[] decoded_char = new char[charCount];
            utf8Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);
            string result = new String(decoded_char);
            return result;
        }
    }
}
