import uuid from 'node-uuid';
import { combineReducers } from 'redux';
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions';
const { SHOW_ALL } = VisibilityFilters;

const initialState = {
	visibilityFilter: VisibilityFilters.SHOW_ALL,
	todos: []
};

function todos(state = [], action){

	switch(action.type){

		case ADD_TODO:
			return [
				...state,
				{
					id: uuid.v4(),
					text: action.text,
					completed: false
				}
			]
		case TOGGLE_TODO:
			return state.map( (todo) => {
				
				if( todo.id === action.id ){
					return Object.assign({}, todo, {
						completed: !todo.completed
					})
				}
				return todo;
			})
		default: 
			return state;
	}
}

function visibilityFilter(state = SHOW_ALL, action){
	switch(action.type){
		case SET_VISIBILITY_FILTER:
			return action.filter
		default:
			return state
	}
}

const todoApp = combineReducers({
	visibilityFilter,
	todos
});

export default todoApp;