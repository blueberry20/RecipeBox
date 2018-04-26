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
		//console.log(name);
  		//console.log(this.state.recipeList);
  		//dont mutate state directly. make a copy here and add new value
		let splitIngredients = ingredients.split(",");
  		let arrayCopy = this.state.recipeItems.slice();
  		arrayCopy.push({name: name, ingredients: splitIngredients});
  		//console.log(arrayCopy);
		this.setState({recipeItems: arrayCopy});
	}

	editRecipe(){
		console.log('edit');
		//this.setState({editClicked: true});
		$('#enterRecipeModal').modal('show');
		//this.setState({editClicked : true})

	}

	handleClick(name, ingredients) {
		console.log(name);		
		this.setState({editClicked: true});
		let recipeToEditCopy = [];
		recipeToEditCopy.push(name, ingredients);
		this.setState({recipeToEdit: recipeToEditCopy});
		$('#editRecipeModal').modal('show');
	}

  render() {
    return (
      <div>
      	<RecipeList handleClick = {this.handleClick.bind(this)} recipeList = {this.state.recipeItems} />
      	<AddRecipe saveRecipe = {this.saveRecipe.bind(this)} />
      	{this.state.editClicked == true ? <EditRecipe recipeDetail = {this.state.recipeToEdit} /> : null}
      	<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#enterRecipeModal">Add Recipe</button>
      </div>
    );
  }
}
