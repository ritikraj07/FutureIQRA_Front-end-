import { createSlice, current } from '@reduxjs/toolkit';

let dataFormate = {
    docs: [],
    totalDocs: 0,
    limit: 10,
    totalPages: 0,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
}
const AdminData = {
    UserData: dataFormate,
    ReportData: dataFormate,
    QuestionData: dataFormate,
    CourseData: dataFormate,
    WithdrawData: dataFormate,
    PaymentData: dataFormate
}


const AdminDataSlice = createSlice({
    name: 'AdminData',
    initialState: AdminData,
    reducers: {
        setAdminData: (state, action) => {
            let { UserData, CourseData, QuestionData, ReportData, WithdrawData, PaymentData } = action.payload
            state.UserData = UserData,
                state.ReportData = ReportData,
                state.CourseData = CourseData,
                state.WithdrawData = WithdrawData,
                state.QuestionData = QuestionData,
                state.PaymentData = PaymentData
        },
        AdminChangeWithdrawStatus: (state, action) => {
            let { _id, status } = action.payload;

            state.WithdrawData.docs = state.WithdrawData.docs.map((doc) => {
                if (doc._id === _id) {
                    return { ...doc, status: status };
                } else {
                    return doc;
                }
            });
        }




    }
})


export const { setAdminData,
    AdminChangeWithdrawStatus } = AdminDataSlice.actions

export default AdminDataSlice.reducer