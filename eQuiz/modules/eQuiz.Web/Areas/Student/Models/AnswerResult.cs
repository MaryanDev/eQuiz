using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eQuiz.Web.Areas.Student.Models
{
    public class AnswerResult
    {
        public int QuestionId;
        public int? AnswerId;
        public bool IsAutomatic;
        public string AnswerText;
        public DateTime AnswerTime;
        public int QuizBlock;
    }
}