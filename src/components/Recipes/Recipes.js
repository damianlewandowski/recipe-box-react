import React from 'react'
import propTypes from 'prop-types'

import RecipeItem from '../RecipeItem/RecipeItem'

import './Recipes.css'

const Recipes = (props) => {  
  const recipesItems = props.recipes.map((recipeObj) => (
    <RecipeItem 
      key={recipeObj.id} 
      recipe={recipeObj} 
      loadRecipeToEditIntoModal={props.loadRecipeToEditIntoModal}
      deleteRecipe={props.deleteRecipe}/>
  ))
    
  return (
    <ul className="Recipes">
      {recipesItems}
    </ul>
  )
}

Recipes.propTypes = {
  loadRecipeToEditIntoModal: propTypes.func,
  deleteRecipe: propTypes.func,
  recipes: propTypes.array
}

export default Recipes