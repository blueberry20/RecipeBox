import React, {Component} from 'react';

class RecipeModal extends Component {

	constructor(props){
		super(props);

		this.state = {
			recipeName: "",
			recipeIngredients: ""
		}
	}



	submitRecipe(){
		//console.log(this.state.recipeName);
		this.props.saveRecipe(this.state.recipeName, this.state.recipeIngredients);
		$('#enterRecipeModal').modal('hide');
		//this.refs.recipeNameInput.value = "";
	}


	render(){
		return (
			<div className="modal fade" id="enterRecipeModal" role="dialog"  aria-hidden="true">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">

			      <div className="modal-header">
			        <h5 className="modal-title" id="exampleModalLabel">Add a recipe</h5>
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>

			      <div className="modal-body">
			      	<div className="form-group">
					    <label>Recipe name</label>
					    <input id="recipeNameInput" ref="recipeNameInput" value={this.state.recipeName} onChange = { (event) => {this.setState({recipeName: event.target.value})}} type="text" className="form-control" placeholder="Enter recipe name"/>
					</div>
					<div className="form-group">
					    <label>Ingredients</label>
					    <input id="ingredientsInput" value={this.state.recipeIngredients} onChange = { (event) => {this.setState({recipeIngredients: event.target.value})}}   type="text" className="form-control" placeholder="Enter ingredients separated by commas"/>
					</div>
			      </div>

			      <div className="modal-footer">
			        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			        <button onClick={ () => { this.submitRecipe()}} type="button" className="btn btn-primary">Save</button>
			      </div>

			    </div>
			  </div>
			</div>
		)
	}
}

export default RecipeModal;