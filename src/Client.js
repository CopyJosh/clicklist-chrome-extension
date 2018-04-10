/* eslint-disable no-undef */

/**
 * This component fetches our nutrition information from our API
 * We then map the data to a json format that the NutritionLabel
 * component is prepared to receive. The json is based on intercepted
 * http requests on the Kroger clicklist website.
 */

// search API for a food
function search(query, cb) {

    return fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-app-id': '6f812326',
                'x-app-key': '5e4d76d60110068b62760cfba5754e99',
                'x-remote-user-id': '1'
            },
            body: JSON.stringify({
                'query': `${query}`,
                'num_servings': 1,
                'use_raw_foods': true,                
            })
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(checkSearch)
        .then(cb);
}
  
// check API response
function checkStatus(response) {

    // api returned a successful response
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    // else throw an error and record to console
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    
    console.log(error); // eslint-disable-line no-console
    throw error;
}
  
function parseJSON(response) {
    return response.json();
}

/**
 * Calculate the percentage of daily value 
 * Function takes the amount of the present nutrient and a recommended
 * daily value. The dv parameter is based on data from the FDA.
 * 
 * Micronutrients seem to commonly round to the nearest tenth while 
 * Macronutrients seem to round to the nearest whole percent. We pass
 * a boolean to accomodate when to round and when not to round.
 * 
 * @param {*} amt
 * @param {*} dv 
 * @param {*} round 
 */
function evalDV(amt, dv, round = true) {
    if(!amt)
        return 0;

    dv = (amt / dv * 100).toFixed(1);

    if(round)
        return Math.round(dv);

    return dv;
}

// check the API search result and map json appropriately
function checkSearch(response) {

    /*
    * API returns a 404 error if there are no results
    */
    if (response.hasOwnProperty(`errors`)) {
        const error = new Error(`HTTP Error ${response.errors.error[0].message}`);
        error.status = response.errors.error[0].status;
        error.response = response;
        
        console.log(error);
        throw error;
    }
    
    /**
     * We'll use the first returned food item based on our search.
     * This is not full-proof, but based on our search query filter for group IDs, 
     * this will work with high probability for all fruit and vegetable items,
     * which this proof-of-concept is focused on evaluating.
     */
    let food = response.foods[0];
    
    console.log(food);

    // Convert the full_nutrients prop from an array of objects to an array
    // This will make fetching nutrient values based on attr_id for our json much easier
    var fullNutrients = [];
    food.full_nutrients.forEach((v) => {
        fullNutrients[v.attr_id] = v.value;
    });

    console.log(fullNutrients);

    // Daily Value calculated from FDA for Adults and Children >= 4
    // https://www.fda.gov/downloads/food/guidanceregulation/guidancedocumentsregulatoryinformation/labelingnutrition/ucm513814.pdf

    // Micronutrients calculated from:
    // https://www.eatforhealth.gov.au/page/eat-health-calculators/calculated/1467294092

    let nutritionInfo = {
        "servingsPerContainer": null,
        "servingSize": null,
        "caloriesPerServing": `${Math.round(food.nf_calories) || 0}`,
        "macronutrients": [
          {
            "title": "Total Fat",
            "amount": `${food.nf_total_fat.toFixed(1) || 0}`,
            "unitOfMeasure": "g",
            "dailyValue": `${evalDV(food.nf_total_fat, 78)}`, // 78g
            "subNutrients": [
              {
                "title": "Saturated Fat",
                "amount": `${food.nf_saturated_fat.toFixed(1) || 0}`,
                "unitOfMeasure": "g",
                "dailyValue": `${evalDV(food.nf_saturated_fat, 20)}`, // 20g
                "subNutrients": null
              },
              {
                "title": "Trans Fat",
                "amount": `${fullNutrients[605].toFixed(1) || 0}`, // attribute id 605
                "unitOfMeasure": "g",
                "dailyValue": "",
                "subNutrients": null
              }
            ]
          },
          {
            "title": "Cholesterol",
            "amount": `${food.nf_cholesterol.toFixed(1) || 0}`,
            "unitOfMeasure": "mg",
            "dailyValue": `${evalDV(food.nf_cholesterol, 300)}`, // 300mg
            "subNutrients": null
          },
          {
            "title": "Sodium",
            "amount": `${food.nf_sodium.toFixed(1) || 0}`,
            "unitOfMeasure": "mg",
            "dailyValue": `${evalDV(food.nf_sodium, 2300)}`, // 2,300mg
            "subNutrients": null
          },
          {
            "title": "Total Carbohydrate",
            "amount": `${food.nf_total_carbohydrate.toFixed(1) || 0}`,
            "unitOfMeasure": "g",
            "dailyValue": `${evalDV(food.nf_total_carbohydrate, 275)}`, // 275g
            "subNutrients": [
              {
                "title": "Dietary Fiber",
                "amount": `${food.nf_dietary_fiber.toFixed(1) || 0}`,
                "unitOfMeasure": "g",
                "dailyValue": `${evalDV(food.nf_dietary_fiber, 28)}`, // 28g
                "subNutrients": [
                  
                ]
              },
              {
                "title": "Sugars",
                "amount": `${food.nf_sugars.toFixed(1) || 0}`,
                "unitOfMeasure": "g",
                "dailyValue": null,
                "subNutrients": null
              }
            ]
          },
          {
            "title": "Protein",
            "amount": `${food.nf_protein.toFixed(1) || 0}`,
            "unitOfMeasure": "g",
            "dailyValue": `${evalDV(food.nf_protein, 50)}`, // 50g
            "subNutrients": null
          }
        ],
        "micronutrients": [
          {
            "title": "Calcium",
            "amount": `${Math.round(fullNutrients[301]) || ''}`, // attribute id 301
            "unitOfMeasure": null,
            "dailyValue": `${evalDV(fullNutrients[301], 1000, false)}`, // 1000mg
            "subNutrients": null
          },
          {
            "title": "Iron",
            "amount": `${Math.round(fullNutrients[303]) || ''}`, // attribute id 303
            "unitOfMeasure": null,
            "dailyValue": `${evalDV(fullNutrients[303], 8, false)}`, // 8mg
            "subNutrients": null
          },
          {
            "title": "Vitamin A",
            "amount": `${Math.round(fullNutrients[315]) || ''}`, // attribute id 315
            "unitOfMeasure": null,
            "dailyValue": `${evalDV(fullNutrients[315], 900, false)}`, // 900micrograms
            "subNutrients": null
          },
          {
            "title": "Vitamin C",
            "amount": `${Math.round(fullNutrients[401]) || ''}`, // attribute id 401
            "unitOfMeasure": null,
            "dailyValue": `${evalDV(fullNutrients[401], 45, false)}`, // 45mg
            "subNutrients": null
          }
        ]
      };

    console.log(nutritionInfo);

    return nutritionInfo;
}

const Client = { search };
export default Client;