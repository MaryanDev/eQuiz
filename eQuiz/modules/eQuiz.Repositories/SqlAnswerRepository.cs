using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using eQuiz.Entities;

namespace eQuiz.Repositories
{
    public class SqlAnswerRepository : IAnswerRepository
    {
        public IEnumerable<Answer> GetAllAnswers()
        {
            List<Answer> result;
            using (var context = new eQuizEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;

                var query = from answer in context.Answers.Include("tblQuestionAnswers")
                            select answer;

                result = query.ToList();
            }

            return result;
        }
    }
}
