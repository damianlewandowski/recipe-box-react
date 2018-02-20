import React from 'react';
import propTypes from 'prop-types';

import './AddRecipeBtn.css';

const AddRecipeBtn = (props) => (
  <button 
    className="AddRecipeBtn"
    onClick={props.openModal}>New Recipe</button>
);

AddRecipeBtn.propTypes = {
  showModal: propTypes.func,
}


export default AddRecipeBtn;