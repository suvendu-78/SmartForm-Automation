import { createBrowser } from "./src/browser.js";

import { runAutomation } from "./src/automation.js";

import { config } from "./config/config.js";

async function main() {
  const driver = await createBrowser();

  try {
    console.log("Opening website...");

    await driver.get(config.url);

    console.log("Website opened successfully!");

    const results = await runAutomation(driver, config);

    console.log("\n========== TEST REPORT ==========\n");

    for (const result of results) {
      console.log(`${result.field}: ${result.status}`);

      if (result.error) {
        console.log("Reason:", result.error);
      }
    }

    const passed = results.filter((item) => item.status === "PASS").length;

    const failed = results.filter((item) => item.status === "FAIL").length;

    console.log("\n=================================");

    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);

    console.log(failed === 0 ? "FINAL RESULT: PASSED" : "FINAL RESULT: FAILED");
  } catch (error) {
    console.error("Automation error:", error.message);
  } finally {
    await driver.quit();
  }
}

main();
