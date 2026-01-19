using insurance_brokerage.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace insurance_brokerage.Data
{
    public static class SeedData
    {
        private const string AdminUsername = "admin01";
        private const string AdminEmail = "admin01@gmail.com";
        private const string AdminPassword = "Admin@123";

        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            using var context = new AppDbContext(serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>());
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<UserProfile>>();


            //// Ensure database is created
            //await context.Database.MigrateAsync();

            // ================= CREATE ROLES =================
            string[] roleNames = { "Admin", "User" };

            foreach (var roleName in roleNames)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }

            // ================= CREATE ADMIN USER =================
            var adminUser = await userManager.FindByEmailAsync(AdminEmail);

            if (adminUser == null)
            {
                adminUser = new UserProfile
                {
                    UserName = AdminUsername,
                    Email = AdminEmail,
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(adminUser, AdminPassword);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }
            }
        }
    }
}
