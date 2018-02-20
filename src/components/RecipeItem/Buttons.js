import React from 'react';
import propTypes from 'prop-types'

import './Buttons.css';

const Buttons = (props) => (
  <div className="Buttons">
    <button 
      className="btn edit-btn"
      onClick={props.loadRecipeToEditIntoModal.bind(null, props.recipe, true)}>Edit</button>
    <button 
      className="btn del-btn"
      onClick={props.deleteRecipe.bind(null, props.recipe.id)}>Delete</button>
  </div>
);

Buttons.propTypes = {
  loadRecipeToEditIntoModal: propTypes.func,
  deleteRecipe: propTypes.func,
}

export default Buttons;