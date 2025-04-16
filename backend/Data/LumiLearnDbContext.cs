using Microsoft.EntityFrameworkCore;

namespace LumiLearn.Data
{
    public class LumiLearnDbContext : DbContext
    {
        public LumiLearnDbContext(DbContextOptions<LumiLearnDbContext> options): base(options)
        {
        }
    }
}
