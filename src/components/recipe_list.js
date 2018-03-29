import React, { Component } from 'react';
import AddRecipe from './add_recipe';
import RecipeModal from './recipe_modal';

class RecipeList extends Component {
	constructor(props){
		super(props);
		this.state = {
			editClicked: false
		}
	}



	render (){
		const editRecipe = () => {
			this.setState({editClicked: true});
		}

		const recipes = this.props.recipeList1.map((recipe) => {
			return (
				//accordion
				<div className="card" key={recipe.name}>
				    <div className="card-header" id="headingOne">
				      <h5 className="mb-0">
				        <button className="btn btn-link collapsed" data-toggle="collapse" data-target={"#"+recipe.name} aria-expanded="true" aria-controls="collapseOne">
				          {recipe.name}
				        </button>
				      </h5>
				    </div>

				    <div id={recipe.name} className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
				      <div className="card-body">
				      	<h2>Ingredients</h2>
				      	<hr/>
				      	{ 
				      		recipe.ingredients.map((ingredient, index) =>{
				    			return (
				    				<ul key={index} className="list-group">
				    					<li className="list-group-item">{ingredient}</li>
				    				</ul>
				    			)
				    		})
				      	}
				      	<button onClick={ editRecipe } type="button" className="btn btn-outline-dark">Edit</button>
				      	<button type="button" className="btn btn-danger">Delete</button>
				      </div>
				    </div>
				  </div>
				
			)
		})

		return (
			<div>
				<div id="accordion">
					{recipes}
				</div>
				{this.state.editClicked == true ? <RecipeModal/> : null}
			</div>
		)
	}
}



export default RecipeList;