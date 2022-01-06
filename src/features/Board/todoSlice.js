import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
    lastId: 0, //currently not use, however i left in the state, might be for future use
    status: 'idle', //same as lastId
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        addTask: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            console.log(action.payload + " type: " + action.type);
            state.todos.push(action.payload);
        },

        removeTask:(state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            let index_delete = 0;
            for(let i=0;i<state.todos.length; i++){
                if(state.todos[i].id === action.payload) {
                    index_delete = i;
                    break;
                }
            }
            state.todos.splice(index_delete,1);
        },

        updateTask:(state, action) => {
            let indexToUpdate = 0;
            for(let i=0;i<state.todos.length; i++){
                if(state.todos[i].id === action.payload) {
                    indexToUpdate = i;
                    break;
                }
            }

            state.todos[indexToUpdate].isCompleted = true;
        }
    }
});

export const { addTask, removeTask, updateTask } = todoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTodo = (state) => state.todo.todos;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default todoSlice.reducer;
