import { By, until } from "selenium-webdriver";

// Find a visible label by its text
async function findLabel(driver, labelText) {
  const labels = await driver.findElements(By.css("label"));

  for (const label of labels) {
    const text = (await label.getText()).trim().toLowerCase();

    if (text === labelText.toLowerCase()) {
      return label;
    }
  }

  throw new Error(`Label not found: ${labelText}`);
}

// Find First Name textbox
export async function findTextField(driver, labelText) {
  const label = await findLabel(driver, labelText);

  // First try the label's associated control
  const forValue = await label.getAttribute("for");

  if (forValue) {
    const associated = await driver.findElements(By.id(forValue));

    for (const element of associated) {
      if (await element.isDisplayed()) {
        const type = await element.getAttribute("type");

        if (type === "text") {
          return element;
        }
      }
    }
  }

  // Fallback: search inside the nearby form group
  const group = await label.findElement(By.xpath(".."));

  const inputs = await group.findElements(By.css("input[type='text']"));

  for (const input of inputs) {
    if (await input.isDisplayed()) {
      return input;
    }
  }

  throw new Error(`Textbox not found: ${labelText}`);
}

// Find Gender radio button
export async function findRadioField(driver, groupText, optionText) {
  const label = await findLabel(driver, groupText);

  const group = await label.findElement(By.xpath(".."));

  const radios = await group.findElements(By.css("input[type='radio']"));

  for (const radio of radios) {
    const value = await radio.getAttribute("value");

    const id = await radio.getAttribute("id");

    let visibleText = value || "";

    if (id) {
      const matchingLabels = await group.findElements(By.css("label"));

      for (const item of matchingLabels) {
        if ((await item.getAttribute("for")) === id) {
          visibleText = await item.getText();
        }
      }
    }

    if (visibleText.toLowerCase() === optionText.toLowerCase()) {
      return radio;
    }

    // The CloudQA form uses adjacent span elements
    const parent = await radio.findElement(By.xpath(".."));

    const spans = await parent.findElements(By.css("span"));

    for (const span of spans) {
      const text = (await span.getText()).trim();

      if (text.toLowerCase() === optionText.toLowerCase()) {
        return radio;
      }
    }
  }

  throw new Error(`Radio option not found: ${optionText}`);
}

// Find State dropdown
export async function findDropdown(driver, labelText) {
  const label = await findLabel(driver, labelText);

  const forValue = await label.getAttribute("for");

  if (forValue) {
    const elements = await driver.findElements(By.id(forValue));

    for (const element of elements) {
      if (
        (await element.isDisplayed()) &&
        (await element.getTagName()).toLowerCase() === "select"
      ) {
        return element;
      }
    }
  }

  const group = await label.findElement(By.xpath(".."));

  const selects = await group.findElements(By.css("select"));

  for (const select of selects) {
    if (await select.isDisplayed()) {
      return select;
    }
  }

  throw new Error(`Dropdown not found: ${labelText}`);
}
