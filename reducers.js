import {VisibilityFilter} from './actions';

const initialState = {
	visibilityFilter: VisibilityFilter.SHOW_ALL,
	todos: []
};

function todoApp(state, action){
	if( typeof state === 'undefined'){
		return initialState;
	}

	switch(action.type){

		case SET_VISIBILITY_FILTER:
			return Object.assign({}, state, {
				visibilityFilter: action.filter
			})
		case ADD_TODO:
			return OBject.assign({}, state, {
				todos: [
					...state.todos,
					{
						text: action.text,
						completed: false
					}
				]
			})
		case COMPLETE_TODO:
			return OBject.assign({}, state, {
				todos: state.todos.map( (todo, index) => {

					if( index === action.index ){
						return Object.assign({}, todo, {
							completed: true
						})
					}
					return todo;
				})
			})
		default: 
			return state;
	}

	return state;
}