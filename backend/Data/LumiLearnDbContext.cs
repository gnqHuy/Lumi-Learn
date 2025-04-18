using LumiLearn.Domains;
using Microsoft.EntityFrameworkCore;

namespace LumiLearn.Data
{
    public class LumiLearnDbContext : DbContext
    {
        public LumiLearnDbContext(DbContextOptions<LumiLearnDbContext> options): base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Enrollment>()
                .HasKey(e => new { e.StudentId, e.CourseId });

            modelBuilder.Entity<NotificationUser>()
                .HasKey(nu => new { nu.UserId, nu.NotificationId });

            modelBuilder.Entity<CourseNotification>()
                .HasKey(cn => new { cn.CourseId, cn.NotificationId });

            /*modelBuilder.Entity<CourseNotification>()
                .HasOne(cn => cn.Notification)
                .WithOne(n => n.CourseNotification)
                .HasForeignKey<CourseNotification>(cn => cn.NotificationId);*/


            base.OnModelCreating(modelBuilder); 
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Topic> Topic { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<FeedBack> FeedBacks { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<FlashCardSet> FlashCardSets { get; set; }
        public DbSet<FlashCard> FlashCards { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<AnswerOption> AnswerOptions { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<NotificationUser> NotificationUsers { get; set; }
        public DbSet<CourseNotification> CourseNotifications { get; set; }

    }
}
