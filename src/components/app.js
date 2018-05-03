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

	//add new recipe to recipeItems array
	saveRecipe(name, ingredients) {
  		//dont mutate state directly. make a copy here and add new value
		let splitIngredients = ingredients.split(",");
  		let recipeItemsCopy = this.state.recipeItems.slice();
  		recipeItemsCopy.push({name: name, ingredients: splitIngredients});
		this.setState({recipeItems: recipeItemsCopy});
	}

	//when edit clicked update recipe details
	updateRecipe(name, ingredients) {
		let splitIngredients = ingredients.split(",");
		let recipeItemsCopy = this.state.recipeItems.slice();

		//Find index of specific object using findIndex method.    
		let objIndex = recipeItemsCopy.findIndex((obj => obj.name == name));

		//Update ingredients
		recipeItemsCopy[objIndex].ingredients = splitIngredients;

		this.setState({recipeItems: recipeItemsCopy});
		this.setState({editClicked: false});

	}

	//save in state which recipe needs to be edited and pass as a prop to EditRecipe component
	handleEditClick(name, ingredients) {		
		this.setState({editClicked: true});
		let recipeToEditCopy = [];
		recipeToEditCopy.push(name, ingredients);
		this.setState({recipeToEdit: recipeToEditCopy});
		$('#editRecipeModal').modal('show');
	}

	deleteRecipe(name) {
		let recipeItemsCopy = this.state.recipeItems.slice();
		let objIndex = recipeItemsCopy.findIndex((obj => obj.name == name));
		recipeItemsCopy.splice(objIndex, 1);
		this.setState({recipeItems: recipeItemsCopy});
	}

  render() {
    return (
      <div>
      	<RecipeList deleteRecipe = {this.deleteRecipe.bind(this)} handleEditClick = {this.handleEditClick.bind(this)} recipeList = {this.state.recipeItems} />
      	<AddRecipe saveRecipe = {this.saveRecipe.bind(this)} />
      	{this.state.editClicked == true ? <EditRecipe updateRecipe = {this.updateRecipe.bind(this)} recipeDetail = {this.state.recipeToEdit} /> : null}
      	<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#enterRecipeModal">Add Recipe</button>
      </div>
    );
  }
}
