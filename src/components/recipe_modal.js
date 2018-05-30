import React, { Component } from "react";

class RecipeModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			recipeName: "",
			recipeIngredients: ""
		};
	}

	componentDidMount() {
		if (this.props.recipeItems == undefined) {
			console.log("undef");
		} else
			//console.log('ghg' + this.props.recipeItems[0].name);
			this.setState({
				recipeName: this.props.recipeItems[0].name,
				recipeIngredients: this.props.recipeItems[0].ingredients
			}),
				(this.refs.recipeNameInput.value = "hello");
	}

	fillValues() {
		//console.log(this.props.recipeItems);
	}

	submitRecipe() {
		//call saveRecipe func and then clear state
		this.props.saveRecipe(this.state.recipeName, this.state.recipeIngredients);
		$("#enterRecipeModal").modal("hide");
		this.setState({ recipeName: "", recipeIngredients: "" });
	}

	render() {
		return (
			<div
				className="modal fade"
				id="enterRecipeModal"
				role="dialog"
				aria-hidden="true"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h3 className="modal-title" id="exampleModalLabel">
								Add a recipe
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
									ref="recipeNameInput"
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
									this.submitRecipe();
								}}
								type="button"
								className="btn btn-primary"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RecipeModal;
