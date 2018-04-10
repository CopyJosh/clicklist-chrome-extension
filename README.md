This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## About

This is an initial proof of concept for a larger idea to combine 3rd party nutritional information in an online grocery shopping experience. This is also a first-time experiment in creating a browser extension.

The App piggy-backs the NutritionLabel React component, already developed in the Kroger website. The component is fed data from the Nutritionix API (https://www.nutritionix.com) using Kroger's parsed URL in the API's natural language search.

The DV%'s are computed based on information from the FDA and USDA.

## Example

Before installing the extension, visit a product page such as https://kroger.com/p/asparagus/0000000004080.
After installing the extension, a Nutrition Info tab will appear such as found here https://www.kroger.com/p/coca-cola/0004900002890

See before.png and after.png for screenshots.

## Disclaimer

This app is not associated in any way with Kroger (http://www.kroger.com/).
