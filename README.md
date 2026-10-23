This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## About

This is an initial proof of concept for a larger idea to combine 3rd party nutritional information in an online grocery shopping experience. This is also a first-time experiment in creating a browser extension.

The App piggy-backs the NutritionLabel React component, already developed in the Kroger website. The component is fed data from the Nutritionix API (https://www.nutritionix.com) using Kroger's parsed URL in the API's natural language search.

The DV%'s are computed based on information from the FDA and USDA.

## Example

Before installing the extension, visit a product page such as https://kroger.com/p/asparagus/0000000004080.
After installing the extension, a Nutrition Info tab will appear such as found here https://www.kroger.com/p/coca-cola/0004900002890

See before.png and after.png for screenshots.

## Installation

Install and build, and upload the build folder via Load Unpacked Extensions in google chrome.
Essentially, step 2 & 5: https://www.cnet.com/how-to/how-to-install-chrome-extensions-manually/

## Disclaimer

This app is not associated in any way with Kroger (http://www.kroger.com/).


## Security status (2026-10-23)

Nutrition search is disabled. Browser code cannot keep the provider API credential private.
The extension displays a disabled message and sends no provider request.
No credential rotation occurred. Removal from this branch does not remove values from Git history.

TODO before any reuse:

- Replace the ejected Webpack 3 and Jest 20 toolchain with supported tools.
- Migrate the Manifest V2 extension to Manifest V3.
- Add an authenticated server API with limits before restoring nutrition search.
- Verify the current Kroger page selectors and the provider response contract with that server API.
- Review the remaining dependency advisories. An advisory match does not prove a live exploit.

The source update refreshes compatible dependency versions. It does not complete the toolchain migration.
No deployment or extension publication occurred.
