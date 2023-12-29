import { createSlice, current } from '@reduxjs/toolkit';

const AdminData = {
    UserData: [],
    ReportData: [],
    Question: [],
    Course:[]
}


const AdminDataSlice = createSlice({
    name: AdminData,
    initialState: AdminData,
    reducers: {
        setAdminData: (state, action) => {
            let {  } = action.payload
            
        },



    }
})


export const { setAdminData } = AdminDataSlice.actions

export default AdminDataSlice.reducer