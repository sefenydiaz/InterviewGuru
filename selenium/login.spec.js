const { By, Builder } = require("selenium-webdriver");
const assert = require("assert");

const loginTest = async () => {
  let driver;

  try {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/");

    let title = await driver.getTitle();
    assert.equal("Interview Guru", title);

    await driver.manage().setTimeouts({ implicit: 500 });
  } catch (error) {
    console.log(error);
  } finally {
    await driver.quit();
  }
};
