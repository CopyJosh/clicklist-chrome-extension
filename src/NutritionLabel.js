import cx from 'classnames';
import { array, arrayOf, bool, shape, string } from 'prop-types';
import React from 'react';
import './nutrition_label.css';

const getAmountWithUnit = (amount, unitOfMeasure) =>
  amount && unitOfMeasure ? `${ amount }${ unitOfMeasure }` : '';

const getDailyValueWithPercent = (dailyValue) => dailyValue ? `${dailyValue}%` : '';

const NutrientDetail = (props) => {
  const { title, amount, unitOfMeasure, dailyValue, isMacronutrient, isSubnutrient } = props;

  const subNutrients = props.subNutrients || defaultArray;
  const macroNutrientClass = {
    'is-macronutrient': isMacronutrient,
    'is-micronutrient': !isMacronutrient,
    'is-subnutrient': isSubnutrient
  };
  const amountWithUnit = getAmountWithUnit(amount, unitOfMeasure);
  const dailyValueWithPercent = getDailyValueWithPercent(dailyValue);

  return amountWithUnit || dailyValueWithPercent ? (
    <div>
      <div className="NutrientDetail">
        <span className="NutrientDetail-TitleAndAmount">
          <span className={ cx('NutrientDetail-Title', macroNutrientClass) }>
            { title }
          </span>
          { amountWithUnit }
        </span>
        <span className={ cx('NutrientDetail-DailyValue', macroNutrientClass) }>
          { dailyValueWithPercent }
        </span>
      </div>
      <div className="NutrientDetail-SubNutrients">
        {
          subNutrients.map(({ title, amount, unitOfMeasure, dailyValue, subNutrients }, index) =>
            <NutrientDetail
              key={ index }
              title={ title }
              amount={ amount }
              unitOfMeasure={ unitOfMeasure }
              dailyValue={ dailyValue }
              isMacronutrient={ isMacronutrient }
              isSubnutrient={ true }
              subNutrients={ subNutrients }
            />
          )
        }
      </div>
    </div>
  ) : null;
};

NutrientDetail.displayName = 'NutrientDetail';

NutrientDetail.propTypes = {
  title: string,
  amount: string,
  unitOfMeasure: string,
  dailyValue: string,
  isMacronutrient: bool,
  isSubnutrient: bool,
  subNutrients: arrayOf(shape({
    title: string,
    amount: string,
    unitOfMeasure: string,
    dailyValue: string,
    subNutrients: array
  }))
};

export const NutritionLabel = ({ nutritionFacts }) =>
  nutritionFacts ? <div className="NutritionLabel">
    <div className="NutritionLabel-NutritionFacts">
      Nutrition Facts
    </div>
    <div className="NutritionLabel-ServingsPerContainer">
      { nutritionFacts.servingsPerContainer } servings per container
    </div>
    <div className="NutritionLabel-ServingSize">
      <span>Serving size</span>
      <span>{ nutritionFacts.servingSize }</span>
    </div>

    <hr className="u-thickBar" />

    <div className="NutritionLabel-AmountPerServing">
      Amount per serving
    </div>
    <div className="NutritionLabel-Calories">
      <span>Calories</span>
      <span>{ nutritionFacts.caloriesPerServing }</span>
    </div>

    <hr className="u-thinBar" />

    <div className="NutritionLabel-DailyValueHeader">
      % Daily value*
    </div>
    {
      nutritionFacts.macronutrients.map(({ title, amount, unitOfMeasure, dailyValue, subNutrients }, index) =>
        <NutrientDetail
          key={ index }
          title={ title }
          amount={ amount }
          unitOfMeasure={ unitOfMeasure }
          dailyValue={ dailyValue }
          isMacronutrient={ true }
          isSubnutrient={ false }
          subNutrients={ subNutrients }
        />
      )
    }

    { nutritionFacts.micronutrients.length > 0 && <hr className="u-thickBar NutritionLabel-microNutrientsThickBar" /> }

    {
      nutritionFacts.micronutrients.map(({ title, amount, unitOfMeasure, dailyValue }, index) =>
        <NutrientDetail
          key={ index }
          title={ title }
          amount={ amount }
          unitOfMeasure={ unitOfMeasure }
          dailyValue={ dailyValue }
          isMacronutrient={ false }
          isSubnutrient={ false }
        />
      )
    }

    <hr className="u-thinBar" />

    <div className="NutritionLabel-DailyValueDisclaimer">
      <span>*</span>
      <span>
        The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000
        calories a day is used for general nutrition advice.
      </span>
    </div>

  </div> : null;

NutritionLabel.displayName = 'NutritionLabel';

NutritionLabel.propTypes = {
  nutritionFacts: shape({
    servingsPerContainer: string,
    servingSize: string,
    caloriesPerServing: string,
    macronutrients: arrayOf(shape({
      title: string,
      amount: string,
      unitOfMeasure: string,
      dailyValue: string,
      subNutrients: array
    })),
    micronutrients: arrayOf(shape({
      title: string,
      amount: string,
      unitOfMeasure: string,
      dailyValue: string
    }))
  })
};

// Taken from 'kroger-product-utils/src/constants'
export const defaultArray = Object.freeze([]);

// OG WEBPACK FOOTER //
// ../grids/src/components/nutrition/nutrition_label.js