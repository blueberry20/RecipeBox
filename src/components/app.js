import React, { Component } from 'react';
import RecipeList from './recipe_list';
import AddRecipe from './add_recipe';
import EditRecipe from './edit_recipe';

export default class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			recipeItems: [],
			editClicked: false,
			recipeToEdit: []
		}

	}

	saveRecipe(name, ingredients) {
  		//dont mutate state directly. make a copy here and add new value
  		if (name.length < 2) {
  			//this.state.error = true;
  			console.log(this.state.error);
  			return;
  		}
		let splitIngredients = ingredients.split(",");
  		let arrayCopy = this.state.recipeItems.slice();
  		arrayCopy.push({name: name, ingredients: splitIngredients});
		this.setState({recipeItems: arrayCopy});
	}

	updateRecipe(name, ingredients) {
		let splitIngredients = ingredients.split(",");
		let arrayCopy = this.state.recipeItems.slice();

		//Find index of specific object using findIndex method.    
		let objIndex = arrayCopy.findIndex((obj => obj.name == name));

		//Update object's name property.
		arrayCopy[objIndex].ingredients = splitIngredients

		this.setState({recipeItems: arrayCopy});
		this.setState({editClicked: false});

	}


	handleEditClick(name, ingredients) {
		//console.log(name);		
		this.setState({editClicked: true});
		let recipeToEditCopy = [];
		recipeToEditCopy.push(name, ingredients);
		this.setState({recipeToEdit: recipeToEditCopy});
		//console.log(this.state.recipeToEdit);
		$('#editRecipeModal').modal('show');

	}

  render() {
    return (
      <div>
      	<RecipeList handleEditClick = {this.handleEditClick.bind(this)} recipeList = {this.state.recipeItems} />
      	<AddRecipe saveRecipe = {this.saveRecipe.bind(this)} />
      	{this.state.editClicked == true ? <EditRecipe updateRecipe = {this.updateRecipe.bind(this)} recipeDetail = {this.state.recipeToEdit} /> : null}
      	<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#enterRecipeModal">Add Recipe</button>
      </div>
    );
  }
}
