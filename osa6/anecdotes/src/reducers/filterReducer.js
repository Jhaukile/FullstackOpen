import {createSlice} from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterChange(state, action) {
            return action.payload
        }
    }
})

export const { filterChange} = filterSlice.actions
export default filterSlice.reducer


// const filterReducer = (state = null, action) => {
//     //console.log('ACTION: ', action)
//     switch (action.type){
//         case 'SET_FILTER':
//             return action.filter
//         default: return state
//     }
// }

// export const filterChange = (filter) => {
//     return {
//         type: 'SET_FILTER',
//         filter,
//     }
// }


// export default filterReducer