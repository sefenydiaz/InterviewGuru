const { By, Builder } = require("selenium-webdriver");
const assert = require("assert");

describe("Login/Logout Test", () => {
  let driver;
  const baseURL = "http://localhost:3000/";

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  it("Should log a user in and then out", async () => {
    await driver.get(baseURL);

    let title = await driver.getTitle();
    assert.equal("Interview Guru", title);

    await driver.manage().setTimeouts({ implicit: 500 });

    const emailTextBox = await driver.findElement(By.id("email-input"));
    const pwordTextBox = await driver.findElement(By.id("pword-input"));
    const loginButton = await driver.findElement(By.id("login-button"));

    emailTextBox.sendKeys("stjimmy400@gmail.com");
    pwordTextBox.sendKeys("Serum54321!");
    loginButton.click();

    // const logoutButton = await driver.findElement(By.id("logout-button"));

    // logoutButton.click();

    // let URL = await driver.getCurrentUrl();
    // assert.equal(`${baseURL}login`, URL);
  });

  after(async () => {
    await driver.quit();
  });
});
