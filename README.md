# Smart Form Automation

A dynamic web form automation project built using **JavaScript and Selenium WebDriver**.

The project automatically identifies and interacts with form elements using visible labels and DOM relationships instead of depending entirely on fixed element IDs or class names.

## Features

- Automatically detects the First Name textbox.
- Identifies and selects a Gender radio button.
- Detects and selects an option from the State dropdown.
- Verifies whether each interaction was successful.
- Generates a PASS/FAIL test report.
- Supports configurable target URLs.
- Uses JavaScript ES Modules.

## Tech Stack

- JavaScript (Node.js)
- Selenium WebDriver
- Google Chrome
- Nodemon

## Project Structure

```text
smart-form-automation/
│
├── config/
│   └── config.js
│
├── src/
│   ├── browser.js
│   ├── detector.js
│   └── automation.js
│
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/suvendu-78/SmartForm-Automation.git
```

Navigate to the project directory:

```bash
cd SmartForm-Automation
```

Install dependencies:

```bash
npm install
```

## Configuration

Update `config/config.js`:

```javascript
export const config = {
  url:
    process.env.TARGET_URL ||
    "https://app.cloudqa.io/home/AutomationPracticeForm",

  firstName: "Suvendu",
  gender: "Male",
  state: "India",
};
```

You can change the URL and test values without modifying the automation logic.

## Run the Project

Start the automation:

```bash
npm start
```

Run in development mode:

```bash
npm run dev
```

## Automation Approach

The project uses a label-based detection approach:

1. Finds form labels using their visible text.
2. Uses label associations and nearby DOM relationships to locate the corresponding input elements.
3. Identifies radio options using their associated values or visible text.
4. Selects dropdown options by visible text.
5. Verifies the result after every interaction.

This approach reduces dependency on fixed IDs and class names.

## Test Results

The automation was tested on the CloudQA Automation Practice Form.

| Field      | Operation    | Result |
| ---------- | ------------ | ------ |
| First Name | Enter text   | PASS   |
| Gender     | Select Male  | PASS   |
| State      | Select India | PASS   |

**Note:** The dropdown is labelled "State" on the target page, but its available options are countries. India was selected for testing.

## Limitations

- The current implementation has been tested on the original target page.
- It has not yet been validated against every possible DOM structure change.
- Complex nested layouts and iframe-based forms may require additional handling.
- Similar-looking labels and ambiguous form elements may require stronger disambiguation logic.
