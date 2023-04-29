import { test, expect } from "@playwright/test";

test.describe("router", () => {
  // test.beforeEach(async ({ page }) => {
  //   await page.goto("http://localhost:5177/#/");
  // });

  test("logoff", async ({ page }) => {
    await page.goto("http://localhost:5177/#/");

    const conduit = page.getByRole("link", { name: "conduit" });

    await conduit.first().click();
    expect(page.url()).toBe("http://localhost:5177/#/");

    await page.getByRole("link", { name: "conduit" }).last().click();
    expect(page.url()).toBe("http://localhost:5177/#/");

    await page.getByRole("link", { name: "implementations" }).click();
    expect(page.url()).toBe("http://localhost:5177/#/implementations");

    await page.getByRole("link", { name: "Global Feed" }).click();
    expect(page.url()).toBe("http://localhost:5177/#/");

    await page.getByRole("link", { name: "welcome" }).click();
    expect(page.url()).toBe("http://localhost:5177/#/welcome");

    await page.getByRole("link", { name: "codebaseShow" }).click();
    expect(page.url()).toBe("http://localhost:5177/#/codebaseShow");

    await page.getByRole("link", { name: "cupiditate" }).click();
    expect(page.url()).toBe("http://localhost:5177/#/cupiditate");

    await page.getByRole("link", { name: "quia" }).click();
    expect(page.url()).toBe("http://localhost:5177/#/quia");

    await page.getByRole("link", { name: "deserunt" }).click();
    expect(page.url()).toBe("http://localhost:5177/#/deserunt");

    await page.getByRole("link", { name: "login" }).click();
    await page.waitForTimeout(1000);
    expect(page.url()).toBe("http://localhost:5177/#/login");
    await page.getByRole("link", { name: "register" }).click();
    expect(page.url()).toBe("http://localhost:5177/#/register");
    await page.getByRole("link", { name: "Have an account?" }).click();
    expect(page.url()).toBe("http://localhost:5177/#/login");
    await page.getByRole("link", { name: "Need an account?" }).click();
    expect(page.url()).toBe("http://localhost:5177/#/register");
    const button = page.getByRole("link", { name: "register" });
    await expect(button).toHaveCSS("color", "rgba(0, 0, 0, 0.8)");
    await expect(page.getByPlaceholder("Your Name")).toHaveCount(1);
  });

  test("logon", async ({ page }) => {
    await page.goto("http://localhost:5177/#/login");
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill("jinbe@jinbe.com");
    await page.getByPlaceholder("Email").press("Tab");
    await page.getByPlaceholder("Password").fill("1234");
    // await page.getByPlaceholder("Password").press("Enter");
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.waitForURL("http://localhost:5177/#/");

    expect(page.url()).toBe("http://localhost:5177/#/");

    // last child of navigation

    /// REVIEW - this is not working
    await page.locator("header").getByRole("link", { name: "jinbe" }).click();
    expect(page.url()).toBe("http://localhost:5177/#/profile/@jinbe");
    // expect(page.url()).toBe("http://localhost:5177/#/profile/@jinbe");
    // await page.getByRole("link", { name: "jinbe" }).click();
    // expect(page.url()).toBe("http://localhost:5177/#/profile/@jinbe");

    // await page.waitForURL("http://localhost:5177/#/profile/@jinbe");
    // expect(page.url()).toBe("http://localhost:5177/#/profile/@jinbe");

    // await page.getByRole("button", { name: " Edit Profile settings" }).click();
    // expect(page.url()).toBe("http://localhost:5177/#/settings");

    // // expect url of profile picture
    // expect(page.getByPlaceholder("URL of profile picture").textContent).toBe(
    //   "https://api.realworld.io/images/smiley-cyrus.jpeg"
    // );
    // expect(page.getByPlaceholder("Your Name").textContent).toBe("jinbe");

    // await page.getByPlaceholder("URL of profile picture").click();
    // await page.getByPlaceholder("Short bio about you").click();
    // await page.getByPlaceholder("Email").click();
  });
});
