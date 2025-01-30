using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
public class RoleInitializer
{
    public static async Task InitializeAsync(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        string[] roles = new[] { "Administrator", "Operator" };

        foreach (var roleName in roles)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        // Создание администратора по умолчанию, если он еще не существует
        string adminEmail = "admin@example.com";
        string adminPassword = "YourStrongPassword!";

        var adminUser = await userManager.FindByEmailAsync(adminEmail);
        if (adminUser == null)
        {
            var newUser = new IdentityUser { UserName = adminEmail, Email = adminEmail };
            var result = await userManager.CreateAsync(newUser, adminPassword);

            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(newUser, "Administrator");
            }
            else
            {
                // Обработка ошибок при создании пользователя
                foreach (var error in result.Errors)
                {
                    Console.WriteLine(error.Description);
                }
            }
        }
    }
}