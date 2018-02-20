import React from 'react';

import './IngredientInput.css';

const IngredientInput = (props) => (
  <div className="form-control">
    <label 
      htmlFor={props.id}>
      {`Ingredient ${parseInt(props.id, 10) + 1}`}</label>
    <input 
      id={props.id}
      type="text"
      value={props.ingredient}
      onChange={props.handleInputChange}/>
  </div>
);

export default IngredientInput;