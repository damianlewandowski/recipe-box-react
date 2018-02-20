import React, { Component } from 'react'
import Transition from 'react-transition-group/Transition'
import propTypes from 'prop-types';

import Ingredients from './Ingredients'
import Buttons from './Buttons';

import './RecipeItem.css';


const transitionStyles = {
  entering: { 
    maxHeight: 0,
    transform: "scaleY(0)",
    transformOrigin: "top" 
  },
  entered: { 
    transform: "scaleY(1)",
    maxHeight: "600px"
  },
  exiting: { 
    maxHeight: 0,
    transform: "scaleY(0)",
    transformOrigin: "bottom",
  },

};

class RecipeItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false
    }

    this.toggleActive = this.toggleActive.bind(this)
  }

  toggleActive() {
    this.setState({
      active: !this.state.active
    })
  }

  render() {
    return (
      <li className="RecipeItem">
        <h3 
          className={this.state.active ? "recipe-name recipe-active" : "recipe-name"}
          onClick={this.toggleActive}>
          {this.props.recipe.recipeName}</h3>
        {
        <Transition 
          in={this.state.active} 
          timeout={{
            enter: 0,
            exit: 300
          }}
          unmountOnExit={true}>
            {(state) => (
              <div className="RecipeItem-detail" style={{
                ...transitionStyles[state]
              }}>
                <Ingredients ingredients={this.props.recipe.ingredients}/>
                <Buttons 
                  recipe={this.props.recipe}
                  loadRecipeToEditIntoModal={this.props.loadRecipeToEditIntoModal} 
                  deleteRecipe={this.props.deleteRecipe}/>
              </div>
            )}
        </Transition>
        }

      </li>
    )
  }
}

RecipeItem.propTypes = {
  recipe: propTypes.object,
}

export default RecipeItem;