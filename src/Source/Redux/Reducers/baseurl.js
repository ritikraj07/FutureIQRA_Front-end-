import { createSlice, current } from '@reduxjs/toolkit';



const BaseUrlSlice = createSlice({
    name: "BaseUrl",
    initialState: {
        url: 'http://localhost:8000/'
    },
    reducers: {

    }
})


export const { } = BaseUrlSlice.actions
export default BaseUrlSlice.reducer