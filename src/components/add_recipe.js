import React, {Component} from 'react';
//import RecipeModal from './recipe_modal';
import RecipeList from './recipe_list';

class AddRecipe extends Component {
	constructor(props){
		super(props);

		this.state = {
			recipeName: "",
			recipeIngredients: "",
			nameError: false,
			ingredientsError: false,
			formValid: false
		}
	}

	//validate each form field
	validateForm(){
		this.validateField('name', this.state.recipeName);
		this.validateField('ingredients', this.state.recipeIngredients);
	}


	//update state if any errors are found
	validateField(fieldName, value){
		let nameMistake = this.state.nameError;
		let ingredientsError = this.state.ingredientsError;

		switch(fieldName){
			case 'name':
					nameMistake = value.length < 2;
					this.setState({nameError: nameMistake}, this.submitRecipe)
				break;
			case 'ingredients':
					ingredientsError = value.length < 2;
					this.setState({ingredientsError: ingredientsError}, this.submitRecipe)
				break;
			default:
				break;
		}
	}


	//if form valid, submit Recipe
	submitRecipe(){
		if (this.state.nameError == false && this.state.ingredientsError == false){
			//call saveRecipe func and then clear state
			let id = this.state.recipeName + Date.now();
			this.props.saveRecipe(id, this.state.recipeName, this.state.recipeIngredients);
			$('#enterRecipeModal').modal('hide');
			this.setState({recipeName: "", recipeIngredients: ""});
		}	

	}


	render(){
		return (
			<div>	
				<div className="modal fade" id="enterRecipeModal" role="dialog"  aria-hidden="true">
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">

				      <div className="modal-header">
				        <h5 className="modal-title text-center" id="exampleModalLabel">Add a recipe</h5>
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>

				      <div className="modal-body">
				      	<div className="form-group">
						    <label>Recipe name</label>
						    <input id="recipeNameInput" ref="recipeNameInput" value={this.state.recipeName} onChange = { (event) => {this.setState({recipeName: event.target.value})}} type="text" className="form-control" placeholder="Enter recipe name"/>
						    {this.state.nameError == true ? <div className="alert alert-danger">Please enter a valid name</div> : null}
						</div>
						<div className="form-group">
						    <label>Ingredients</label>
						    <input id="ingredientsInput" value={this.state.recipeIngredients} onChange = { (event) => {this.setState({recipeIngredients: event.target.value})}}   type="text" className="form-control" placeholder="Enter ingredients separated by commas"/>
							 {this.state.ingredientsError == true ? <div className="alert alert-danger">Please enter at least one ingredient</div> : null}
						</div>
				      </div>

				      <div className="modal-footer">
				        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
				        <button onClick={ () => { this.validateForm()}} type="button" className="btn btn-primary">Save</button>
				      </div>

				    </div>
				  </div>
				</div>
			</div>
		)
	}




}

export default AddRecipe;