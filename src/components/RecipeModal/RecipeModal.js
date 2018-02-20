import React, { Component } from 'react';

import IngredientInput from './IngredientInput';

import './RecipeModal.css';

class RecipeModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      recipeName: props.recipe.recipeName || "",
      ingredients: props.recipe.ingredients || [""],
    }

    this.addNewIngredientInput = this.addNewIngredientInput.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleRecipenameChange = this.handleRecipenameChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  addNewIngredientInput() {
    const ingredients = this.state.ingredients.slice()
    ingredients.push("")
    this.setState({ ingredients })
  }

  handleRecipenameChange(e) {
    this.setState({
      recipeName: e.target.value,
    })
  }

  handleInputChange(e) {
    const target = e.target
    const value = target.value
    const index = target.id

    const ingredients = this.state.ingredients.slice();
    ingredients[index] = value
    this.setState({ ingredients })
  }

  handleFormSubmit(e) {
    e.preventDefault()

    if(this.props.editMode) {
      let recipe = JSON.parse(JSON.stringify(this.props.recipe))
      recipe.ingredients = this.state.ingredients.slice()  
      recipe.recipeName = this.state.recipeName
      this.props.editRecipe(recipe)
      this.props.toggleEditMode()
    } else {
      let recipe = {}      
      recipe.id = this.props.increment()
      recipe.recipeName = this.state.recipeName
      recipe.ingredients = this.state.ingredients.slice()  
      this.props.addRecipe(recipe)
    }
  }

  render() {
    const ingredients = this.state.ingredients.map((ingredient, index) => (
      <IngredientInput 
        key={index}
        id={index} 
        ingredient={ingredient}
        handleInputChange={this.handleInputChange} />
    ))

    return (
      <div className="RecipeModal">
        {/* Darky background */}
        <div onClick={this.props.closeModal} className="backdrop"></div>

        <div className="RecipeModal-form-container">
          <button onClick={this.props.closeModal} className="exit-modal-btn">x</button>
          <form className="RecipeModal-form" onSubmit={this.handleFormSubmit}> 
            <div className="form-control RecipeModal-recipe-name">
              <label htmlFor="recipe-name">Recipe Name</label>
              <input 
                id="recipe-name"
                name="recipeName"
                type="text" 
                value={this.state.recipeName} 
                onChange={this.handleRecipenameChange}/>
            </div>

            {ingredients}

            <button onClick={this.addNewIngredientInput} type="button" className="RecipeModal-add-btn">+</button>          
            <input className="RecipeModal-submit-btn" type="submit" value="Submit"/>
          </form>
        </div>

        
      </div>      
    );
  }
}

export default RecipeModal;