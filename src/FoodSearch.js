import React from "react";
import Client from "./Client";
import { NutritionLabel } from "./NutritionLabel";

class FoodSearch extends React.Component {
  state = {
    foods: [],
    facts: [],
    showRemoveIcon: false,
    searchValue: ""
  };

  componentDidMount() {
    // this.state.searchValue for the search
    // this.handleSearchChange to initiate
    console.log("Mounted", window.location.href);
    
    /**
     * Regex the Kroger Product URL
     * i.e: https://www.kroger.com/p/coca-cola/0004900002890
     * 0 => /p/coca-cola
     * 1 => /p/
     * 2 => coca-cola
     */
    let url = window.location.href.match(`(/p/)([^:/]+)`);
    if(url && url.length > 1) {

        // This isn't a full-proof IF but our chrome extension
        // already has a load limit on our URL for a /p/* page

        console.log("url parsed", url[2]);

        Client.search(url[2], foods => {
          this.setState({
            foods: foods
          });
        });

    }

  };

  componentWillReceiveProps(nextProps){
      if(this.props.foods !== nextProps.foods) {
        this.setState({foods: nextProps.foods})
      }
  }

  render() {

    const { foods } = this.state;

    console.log('foods', foods);

    var renderNutrition;
    if(foods.length !== 0) {
        renderNutrition = <NutritionLabel nutritionFacts={foods} />;
    } else {
        renderNutrition = "Hello World";
    }

    return (   
        
        <div className="NutritionInfo">
            <div className="NutritionInfo-LabelContainer">
                {renderNutrition}
            </div>
            <div className="NutritionInfo-IngredientsContainer">
                <div className="NutritionIngredients">
                    <p className="NutritionIngredients-Ingredients"><strong>Ingredients:<br /></strong>
                    </p>
                    <div className="NutritionIngredients-NutritionIndicators"></div>
                    <p className="NutritionIngredients-Disclaimer"><strong>Disclaimer:<br /></strong><span>
                    Actual product packaging and materials may contain additional and/or different ingredient, 
                    nutritional, or proper usage information than the information displayed on our website. 
                    You are responsible for reading labels, warnings, and directions prior to using or consuming 
                    a product. If you have food sensitivities or allergies, you should always read the actual 
                    product labels to confirm the safety of the product for your situation. Content on this 
                    website is for general reference purposes only and is not intended to substitute for advice 
                    by a physician, pharmacist, or other licensed health care professional. You should not use 
                    the information presented on this website for self-diagnosis or for treating a health problem. 
                    All products may not be available in all stores. See your local store for specific offerings. 
                    Kroger assumes no liability for inaccuracies or misstatements regarding any product.</span></p>
                </div>
            </div>
        </div>
    );
  }
}

export default FoodSearch;