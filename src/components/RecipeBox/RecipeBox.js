import React, { Component } from 'react'

import Recipes from "../Recipes/Recipes"
import AddRecipeBtn from "./AddRecipeBtn"
import RecipeModal from "../RecipeModal/RecipeModal"

import increment from '../../util/increment';

import './RecipeBox.css';

const DEFAULT_RECIPES = [
  {
    "id": 0,
    "recipeName": "Cheesecake",
    "ingredients": [
      "50g sugar",
      "50ml milk",
      "50g flour",
      "100ml water",
      "100g cottage cheese",
    ]
  },
  {
    "id": 1,    
    "recipeName": "Not Cheesecake",
    "ingredients": [
      "50g sugar",
      "50ml milk",
      "50g flour",
      "100ml water",
      "100g cottage cheese",
    ]
  },
  {
    "id": 2,    
    "recipeName": "Roasted Chicken",
    "ingredients": [
      "50g sugar",
      "1 chicken",
      "stuff",
      "100ml water",
      "100g cheesee",
    ]
  },
  {
    "id": 3,    
    "recipeName": "Definitely Not Cheesecake",
    "ingredients": [
      "50g sugar",
      "50ml milk",
      "50g flour",
      "100ml water",
      "100g mud",
    ]
  },
  {
    "id": 4,    
    "recipeName": "Cheeseburger",
    "ingredients": [
      "bum",
      "meat",
      "cheese",
      "onion",
      "ketchup",
    ]
  },
]


class RecipeBox extends Component {
  constructor() {
    super();

    this.state = {
      modalVisible: false,
      recipeToEditInModal: {},      // On clicking the Edit button get a Recipe Object from which within it was clicked
      recipes: [],                  // An array of objects containing data about each recipe
      editingMode: false,           // If editingMode: true -> call editRecipe() otherwise call addRecipe()
    }

    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.addRecipe = this.addRecipe.bind(this)
    this.editRecipe = this.editRecipe.bind(this)
    this.deleteRecipe = this.deleteRecipe.bind(this)
    this.loadRecipeToEditIntoModal = this.loadRecipeToEditIntoModal.bind(this)
    this.toggleEditMode = this.toggleEditMode.bind(this)
  }

  componentDidMount() {
    // localStorage.removeItem("recipes")
    let loadedRecipes = this.loadRecipes()  // returns null if no recipes, JSON object otherwise
    if(loadedRecipes) {
      typeof loadedRecipes === "string"
        ? JSON.parse(loadedRecipes)
        : loadedRecipes
    } else {
      loadedRecipes = DEFAULT_RECIPES
    }

    this.setState({
      recipes: loadedRecipes
    }, () => {
      // Initialize increment with number bigger by 1 than the highest id from recipes
        const highestId = this.state.recipes.reduce((biggestId, next) => {
          return biggestId > next.id ? biggestId : next.id
        }, 0)
        this.setState({
          increment: increment(highestId)
        })
      })

  }

  addRecipe(recipeObj) {
    let recipes = JSON.parse(JSON.stringify(this.state.recipes))
    recipes.push(recipeObj)

    // Update current state
    this.setState({ recipes: recipes })
    localStorage.setItem("recipes", JSON.stringify(recipes));    

    this.closeModal()
  }

  editRecipe(recipeObj) {
    let loadedRecipes = this.state.recipes.slice();
    const index = loadedRecipes.findIndex((recipe) => {
      return recipe.id === recipeObj.id
    })
    loadedRecipes[index] = recipeObj

    this.setState({recipes: loadedRecipes})
    localStorage.setItem("recipes", JSON.stringify(loadedRecipes));    

    this.closeModal()
  }

  loadRecipes() {
    const loadedRecipes = localStorage.getItem("recipes")
    return JSON.parse(loadedRecipes);
  }

  deleteRecipe(recipeId) {
    const index = this.state.recipes.findIndex((recipe) => {
      return recipe.id === recipeId
    })
    const recipes = this.loadRecipes()
    recipes.splice(index, 1)
    this.setState({ recipes })    
    localStorage.setItem("recipes", JSON.stringify(recipes))
  }

  showModal() {
    this.setState({ modalVisible: true })
  }

  closeModal() {
    this.setState({ 
      modalVisible: false, 
      recipeToEditInModal: {},
    })
  }

  loadRecipeToEditIntoModal(recipeObj) {
    this.setState({ recipeToEditInModal: recipeObj, editingMode: true })
    this.showModal();
  }

  toggleEditMode() {
    this.setState((prevState) => ({
        editingMode: !prevState.editingMode
      }
    ))
  }

  render() {
    return (
      <div className={this.state.modalVisible ? "RecipeBox modal-open" : "RecipeBox"}>
        <Recipes 
          loadRecipeToEditIntoModal={this.loadRecipeToEditIntoModal}
          deleteRecipe={this.deleteRecipe}
          recipes={this.state.recipes}/>
        <AddRecipeBtn openModal={this.showModal} />
        {
          this.state.modalVisible 
            ? <RecipeModal 
                recipe={this.state.recipeToEditInModal}
                closeModal={this.closeModal} 
                toggleEditMode={this.toggleEditMode}
                addRecipe={this.addRecipe}
                editRecipe={this.editRecipe}
                editMode={this.state.editingMode}
                increment={this.state.increment}/>
            : null
        }
      </div>      
    );
  }
}

export default RecipeBox;
