import React, { Component } from 'react';
import RecipeList from './recipe_list';
import AddRecipe from './add_recipe';

export default class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			recipeItems: []
		}

	}

	saveRecipe(name, ingredients) {
		//console.log(name);
  		//console.log(this.state.recipeList);
  		//dont mutate state directly. make a copy here and add new value
		let splitIngredients = ingredients.split(",");
  		var arrayCopy = this.state.recipeItems.slice();
  		arrayCopy.push({name: name, ingredients: splitIngredients});
  		//console.log(arrayCopy);
		this.setState({recipeItems: arrayCopy});
	}

  render() {
    return (
      <div>
      	<RecipeList recipeList1 = {this.state.recipeItems} />
      	<AddRecipe saveRecipe = {this.saveRecipe.bind(this)} />
      </div>
    );
  }
}
