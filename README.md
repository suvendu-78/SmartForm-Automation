# Smart Form Automation

A dynamic web form automation project built using JavaScript and Selenium WebDriver.

## Features

- Automatically detects the First Name textbox.
- Selects a Gender radio button.
- Selects an option from the State dropdown.
- Verifies each field with PASS/FAIL results.
- Supports configurable URLs.
- Uses label-based detection and DOM relationships.

## Technologies

- JavaScript
- Node.js
- Selenium WebDriver
- Google Chrome

## Installation

```bash
git clone https://github.com/suvendu-78/SmartForm-Automation.git
cd SmartForm-Automation
npm install
```

## Run

```bash
npm start
```

## Configuration

Update the URL and test values in `config/config.js`.

You can also provide a different URL using the `TARGET_URL` environment variable.

## Testing

The automation was tested against the original CloudQA form and a local HTML test page.

| Test Scenario                  | Result |
| ------------------------------ | ------ |
| Original HTML structure        | PASS   |
| Changed IDs, names and classes | PASS   |
| Reordered fields               | PASS   |
| Similar-looking fields         | PASS   |
| Nested HTML structure          | PASS   |
| Combined changes               | PASS   |

## Approach

The application identifies form elements using visible labels, associated elements and DOM relationships instead of depending entirely on fixed IDs or CSS classes.

## Limitations

- Tested against the original CloudQA page and controlled local HTML variations.
- Complex or significantly different HTML structures may require improvements.
- The CloudQA dropdown is labelled State but contains country options. India was selected for testing.
