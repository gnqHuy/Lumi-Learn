using LumiLearn.Data;
using LumiLearn.Domains;
using LumiLearn.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace LumiLearn.Repositories
{
    public interface INotificationRepository
    {
        Task SendNotificationWhenCreateLessonResource(Lesson lesson, CourseNotificationType type, string Title);
    }

    public class NotificationsRepository : INotificationRepository
    {
        private readonly IServiceProvider serviceProvider;

        public NotificationsRepository(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }
        public async Task SendNotificationWhenCreateLessonResource(Lesson lesson, CourseNotificationType type, string Title)
        {
            try
            {
                await using (var serviceScope = serviceProvider.CreateAsyncScope())
                {
                    var scopedDbContext = serviceScope.ServiceProvider.GetRequiredService<LumiLearnDbContext>();

                    var course = await scopedDbContext.Lessons
                        .Where(l => l.Id == lesson.Id)
                        .Select(l => new
                        {
                           Id = l.CourseId,
                           Title = l.Course.Title,
                        })
                        .FirstOrDefaultAsync();

                    // Create Notification
                    var stringType = Enum.GetName(typeof(CourseNotificationType), type) ?? "Unknown Resource";
                    var notification = new Notification
                    {
                        Id = Guid.NewGuid(),
                        Content = $"Instructor added a new {stringType}: \"{Title}\" to your Course: \"{course.Title}\" in Lesson: \"{lesson.Title}\". Check it in My Course Tab",
                        Type = stringType,
                        CreatedAt = DateTime.Now
                    };
                    await scopedDbContext.Notifications.AddAsync(notification);

                    // Notification -> CourseNotification
                    var courseNotification = new CourseNotification
                    {
                        CourseId = course.Id,
                        NotificationId = notification.Id,
                        Type = type,
                    };
                    await scopedDbContext.CourseNotifications.AddAsync(courseNotification);

                    // Notification -> All UserNotification Enrolled in Course
                    var usersInCourse = await scopedDbContext.Enrollments
                        .Where(e => e.CourseId == course.Id)
                        .Select(e => e.StudentId)
                        .ToListAsync();

                    var userNotifications = usersInCourse.Select(userId => new NotificationUser
                    {
                        UserId = userId,
                        NotificationId = notification.Id,
                        IsRead = false,
                    });
                    await scopedDbContext.NotificationUsers.AddRangeAsync(userNotifications);
                
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
