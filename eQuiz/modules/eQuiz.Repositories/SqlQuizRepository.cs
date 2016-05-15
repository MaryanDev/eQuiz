using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using eQuiz.Entities;


namespace eQuiz.Repositories
{
    public class SqlQuizRepository : IQuizRepository
    {
        public IEnumerable<Quiz> GetAllQuizes()
        {
            List<Quiz> result;
            using (var context = new eQuizEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;

                var query = from quiz in context.Quizs
                            select quiz;

                result = query.ToList();
            }

            return result;
        }
    }
}
