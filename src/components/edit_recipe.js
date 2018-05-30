import React, { Component } from "react";
//import RecipeModal from './recipe_modal';
import RecipeList from "./recipe_list";

class EditRecipe extends Component {
	constructor(props) {
		super(props);

		this.state = {
			recipeId: this.props.recipeDetail[0],
			recipeName: this.props.recipeDetail[1],
			recipeIngredients: this.props.recipeDetail[2]
		};
	}

	componentDidMount() {
		$("#editRecipeModal").modal("show");
	}

	updateRecipe() {
		//call updateRecipe func and then clear state
		this.props.updateRecipe(
			this.state.recipeId,
			this.state.recipeName,
			this.state.recipeIngredients
		);
		$("#editRecipeModal").modal("hide");
		this.setState({ recipeName: "", recipeIngredients: "" });
	}

	render() {
		return (
			<div>
				<div
					className="modal fade"
					id="editRecipeModal"
					role="dialog"
					aria-hidden="true"
				>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h3 className="modal-title" id="exampleModalLabel">
									Edit a recipe
								</h3>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
								>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>

							<div className="modal-body">
								<div className="form-group">
									<label>Recipe name</label>
									<input
										id="recipeNameInput"
										value={this.state.recipeName}
										onChange={event => {
											this.setState({ recipeName: event.target.value });
										}}
										type="text"
										className="form-control"
										placeholder="Enter recipe name"
									/>
								</div>
								<div className="form-group">
									<label>Ingredients</label>
									<input
										id="ingredientsInput"
										value={this.state.recipeIngredients}
										onChange={event => {
											this.setState({ recipeIngredients: event.target.value });
										}}
										type="text"
										className="form-control"
										placeholder="Enter ingredients separated by commas"
									/>
								</div>
							</div>

							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									data-dismiss="modal"
								>
									Close
								</button>
								<button
									onClick={() => {
										this.updateRecipe();
									}}
									type="button"
									className="btn btn-primary"
								>
									Edit
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EditRecipe;
