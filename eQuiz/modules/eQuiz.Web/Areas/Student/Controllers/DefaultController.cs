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
        private IQuizRepository _quizRepo;
        private IQuestionTypeRepository _questionTypeRepo;
        private IQuizQuestionRepository _quizQuestionRepo;
        private IQuizVariantRepository _questionVariantRepo;
        private IQuestionRepository _questionRepo;
        private IQuestionAnswerRepository _questionAnswerRepo;
        private IAnswerRepository _answerRepo;



        public DefaultController()
        {
            _quizRepo = new SqlQuizRepository();
            _questionTypeRepo = new SqlQuestionTypeRepository();
            _quizQuestionRepo = new SqlQuizQuestionRepository();
            _questionVariantRepo = new SqlQuizVariantRepository();
            _questionRepo = new SqlQuestionRepository();
            _questionAnswerRepo = new SqlQuestionAnswerRepository();
            _answerRepo = new SqlAnswerRepository();
        }
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Details()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Dashboard()
        {
            return View();
        }

        
        public ActionResult QuizInRun()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetQuizes()
        {
            var quizzes = from q in _quizRepo.GetAllQuizzes()
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

        public JsonResult GetQuestionsById(int id)
        {
            int questionId = id;
            var listQuizes = _quizRepo.GetAllQuizzes();
            var listQuestions = _questionRepo.GetAllQuestions();
            var listQuestionTypes = _questionTypeRepo.GetAllQuestionTypes();
            var listQuizQuestions = _quizQuestionRepo.GetAllQuizQuestions();
            var listQuizVariants = _questionVariantRepo.GetAllVariants();
            var listQuestionAnswers = _questionAnswerRepo.GetAllQuestionAnswers();
            var listAnswers = _answerRepo.GetAllAnswers();

            var quizInfo = from quiz in listQuizes
                           join variant in listQuizVariants on quiz.Id equals variant.QuizId
                           join quizQuestion in listQuizQuestions on variant.Id equals quizQuestion.QuizVariantId
                           join question in listQuestions on quizQuestion.QuestionId equals question.Id
                           join questionType in listQuestionTypes on question.QuestionTypeId equals questionType.Id

                           //join questionAnswers in listQuestionAnswers on question.Id equals questionAnswers.QuestionId
                           where quiz.Id == questionId
                           select new
                           {
                               Id = question.Id,
                               Text = question.QuestionText,
                               IsAutomatic = questionType.IsAutomatic,
                               //Not a best solution but only one i have found
                               Answers = from questAnswer in listQuestionAnswers
                                         join answer in listAnswers on questAnswer.AnswerId equals answer.Id
                                         where questAnswer.QuestionId == question.Id
                                         select new
                                         {
                                             Text = answer.AnswerText,
                                             Id = answer.Id
                                         },    
                               QuizBlock = quizQuestion.QuizBlockId
                           };
            var quizInfoList = quizInfo.ToList();
            return Json(quizInfoList, JsonRequestBehavior.AllowGet);
        }
    }
}