import { Select } from "selenium-webdriver/lib/select.js";

import { findTextField, findRadioField, findDropdown } from "./detector.js";

export async function runAutomation(driver, config) {
  const results = [];

  // FIRST NAME
  try {
    const firstName = await findTextField(driver, "First Name");

    await firstName.clear();
    await firstName.sendKeys(config.firstName);

    const actualName = await firstName.getAttribute("value");

    if (actualName === config.firstName) {
      results.push({
        field: "First Name",
        status: "PASS",
      });
    } else {
      throw new Error("First Name verification failed");
    }
  } catch (error) {
    results.push({
      field: "First Name",
      status: "FAIL",
      error: error.message,
    });
  }

  // GENDER
  try {
    const gender = await findRadioField(driver, "Gender", config.gender);

    await gender.click();

    if (await gender.isSelected()) {
      results.push({
        field: "Gender",
        status: "PASS",
      });
    } else {
      throw new Error("Gender verification failed");
    }
  } catch (error) {
    results.push({
      field: "Gender",
      status: "FAIL",
      error: error.message,
    });
  }

  // STATE
  try {
    const state = await findDropdown(driver, "State");

    const select = new Select(state);

    await select.selectByVisibleText(config.state);

    const selected = await select.getFirstSelectedOption();

    const actualState = await selected.getText();

    if (actualState.trim().toLowerCase() === config.state.toLowerCase()) {
      results.push({
        field: "State",
        status: "PASS",
      });
    } else {
      throw new Error("State verification failed");
    }
  } catch (error) {
    results.push({
      field: "State",
      status: "FAIL",
      error: error.message,
    });
  }

  return results;
}
