using eQuiz.Repositories;
using eQuiz.Web.Code;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace eQuiz.Web.Areas.Student.Controllers
{
    public class DefaultController : BaseController
    {
        private SqlQuizRepository _quizRepo;

        public DefaultController()
        {
            _quizRepo = new SqlQuizRepository();
        }
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Details()
        {
            return View();
        }

        public ActionResult Dashboard()
        {
            return View();
        }

        public JsonResult GetQuizes()
        {
            var quizzes = from q in _quizRepo.GetAllQuizes()
                          select new
                          {
                              Id = q.Id,
                              Name = q.Name,
                              StartDate = q.StartDate.HasValue ? q.StartDate.Value.ToString() : "No start date",
                              TimeLimitMinutes = q.TimeLimitMinutes,
                              InternetAccess = q.InternetAccess
                          };
            var quizzesList = quizzes.ToList();

            return Json(quizzesList, JsonRequestBehavior.AllowGet);
        }
    }
}