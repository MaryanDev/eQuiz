using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eQuiz.Web.Areas.Student.Models
{
    public class QuizResult
    {
        public int QuizId;
        public List<AnswerResult> AnswerResults;
        public DateTime StartDate;
        public DateTime FinishDate;
    }
}