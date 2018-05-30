import React, { Component } from "react";
import AddRecipe from "./add_recipe";
//import RecipeModal from './recipe_modal';

class RecipeList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const recipes = this.props.recipeList.map(recipe => {
			return (
				//accordion
				<div className="card" key={recipe.id}>
					<div className="card-header" id="headingOne">
						<div className="mb-0">
							<button
								className="btn btn-link collapsed"
								data-toggle="collapse"
								data-target={"#" + recipe.name}
								aria-expanded="true"
								aria-controls="collapseOne"
							>
								<h2>{recipe.name}</h2>
							</button>
						</div>
					</div>

					<div
						id={recipe.name}
						className="collapse"
						aria-labelledby="headingOne"
						data-parent="#accordion"
					>
						<div className="card-body">
							<h3>Ingredients</h3>
							<hr />
							{recipe.ingredients.map((ingredient, index) => {
								return (
									<ul key={index} className="list-group">
										<li className="list-group-item">{ingredient}</li>
									</ul>
								);
							})}
							<div className="topPadding">
								<button
									onClick={() => {
										this.props.handleEditClick(
											recipe.id,
											recipe.name,
											recipe.ingredients
										);
									}}
									type="button"
									className="btn btn-outline-dark"
								>
									Edit
								</button>
								<button
									onClick={() => {
										this.props.deleteRecipe(recipe.name);
									}}
									type="button"
									className="btn btn-danger"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		});

		return (
			<div>
				<div id="accordion">{recipes}</div>
			</div>
		);
	}
}

export default RecipeList;
