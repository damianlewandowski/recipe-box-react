import React from 'react'
import propTypes from 'prop-types';

import './Ingredients.css';

const Ingredients = (props) => {
  const ingredients = props.ingredients.map(ingredient => (
    <li 
      className="ingredient" 
      key={ingredient}>
      {ingredient}
    </li>
  ))

  return (
    <ul className="ingredients">
      {ingredients}
    </ul>
  )
}

Ingredients.propTypes = {
  ingredients: propTypes.array,
}

export default Ingredients;