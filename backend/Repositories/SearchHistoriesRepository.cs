using LumiLearn.Data;
using LumiLearn.Domains;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LumiLearn.Repositories
{
    public interface ISearchHistoriesReposity
    {
        Task CreateSearchHistory(Guid userId ,string content);
    }

    public class SearchHistoriesRepository : ISearchHistoriesReposity
    {
        private readonly IServiceProvider serviceProvider;
        public SearchHistoriesRepository(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public async Task CreateSearchHistory(Guid userId , string content)
        {
            try
            {
                await using (var serviceScope = serviceProvider.CreateAsyncScope())
                {
                    var scopedDbContext = serviceScope.ServiceProvider.GetRequiredService<LumiLearnDbContext>();

                    var existedSearchHistory = await scopedDbContext.SearchHistories
                        .FirstOrDefaultAsync(sh => sh.UserId == userId && sh.Content == content);

                    // Exist -> Update Searched At
                    if (existedSearchHistory != null)
                    {
                        existedSearchHistory.SearchedAt = DateTime.Now;
                        await scopedDbContext.SaveChangesAsync();

                        return;
                    }

                    var searchHistory = new SearchHistory
                    {
                        UserId = userId,
                        Content = content,
                        SearchedAt = DateTime.Now,
                    };

                    await scopedDbContext.SearchHistories.AddAsync(searchHistory);
                    await scopedDbContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

        }
    }
}
