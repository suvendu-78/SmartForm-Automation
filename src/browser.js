import { Builder, Browser } from "selenium-webdriver";

export const createBrowser = async () => {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();

  await driver.manage().window().maximize();

  return driver;
};
