import React, {Component} from 'react';
import RecipeModal from './recipe_modal';
import RecipeList from './recipe_list';

class AddRecipe extends Component {
	constructor(props){
		super(props);
	}



	render(){
		return (
			<div>			
				<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#enterRecipeModal">
				  Add recipe
				</button>
				<RecipeModal saveRecipe={this.props.saveRecipe}/>
			</div>
		)
	}

}



export default AddRecipe;