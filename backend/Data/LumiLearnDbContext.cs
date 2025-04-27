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

            modelBuilder.Entity<Course>()
                .HasIndex(c => new { c.InstructorId, c.Title })
                .IsUnique();

            modelBuilder.Entity<Feedback>()
                .HasKey(f => new {f.UserId, f.CourseId});

            base.OnModelCreating(modelBuilder); 
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<FlashCardSet> FlashCardSets { get; set; }
        public DbSet<FlashCard> FlashCards { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<AnswerOption> AnswerOptions { get; set; }
        public DbSet<QuizResult> QuizResult { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<NotificationUser> NotificationUsers { get; set; }
        public DbSet<CourseNotification> CourseNotifications { get; set; }
        public DbSet<SearchHistory> SearchHistories { get; set; }

    }
}
