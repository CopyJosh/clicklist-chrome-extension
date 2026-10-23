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

Nutrition search stays disabled. Browser code cannot keep the provider API credential private.
The extension displays a disabled message and sends no provider request.
No credential rotation occurred. Removed values remain in Git history.

The extension now uses Manifest V3, React 19, and esbuild.
The package contains one content script and its CSS. It requests no extra permissions or remote code.
The host match stays limited to `https://www.kroger.com/p/*`.
The old Webpack 3, Jest 20, service-worker template, and ejected build dependencies are removed.
The full and runtime npm audits each report zero findings at the tested graph.

Use Node 24 and npm 11.19.1:

```sh
npm ci
npm run lint
npm test
```

Load the `build` directory as an unpacked extension. No publication occurred.
The build keeps stable `static/js/main.js` and `static/js/main.css` names for the manifest.
The artifact test executes the actual minified bundle in a DOM.
It checks the disabled message, no requests, duplicate injection, absent product containers, and existing product tabs.
A real browser also loaded the generated bundle and CSS against a local product fixture without requests.

Before reuse, configure an authenticated server API with limits and verify the current Kroger selectors.
The existing-tab early return stays in place. The tests do not verify the current Kroger site or extension installation in Chrome.
No deployment, production write, credential rotation, approval, or merge occurred.
