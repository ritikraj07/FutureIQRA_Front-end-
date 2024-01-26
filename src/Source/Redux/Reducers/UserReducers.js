import { createSlice, current } from '@reduxjs/toolkit';

const User = {
    name: "",
    wallet: 100,
    phone: "",
    photo: "",
    team: [],
    rank: 0,
    _id: "",
    isLoggedIn: false,
    isAdmin: false,
    referCode: "",
    userType: 'Basic',
    paymentHistory: []
}


const UserSlice = createSlice({
    name: User,
    initialState: User,
    reducers: {
        setUser: (state, action) => {
            // console.log('Action====>',action)
            let { name, phone, image, team, rank, _id, wallet, paymentHistory, isAdmin, referCode, userType } = action.payload
            state.name = name
            state.wallet = wallet,
                state.team = team,
                state.photo = image,
                state.rank = rank || 1,
                state.phone = phone,
                state.isLoggedIn = true,
                state.isAdmin = isAdmin,
                state._id = _id,
                state.referCode = referCode,
                state.userType = userType,
                state.paymentHistory = paymentHistory || []

            // console.log('current state',current(state))
        },
        setAvatar: (state, action) => {
            state.photo = action.payload
        },
        setLogout: (state, action) => {
            state.isLoggedIn = false;
        }
    }
})


export const { setUser, setAvatar, setLogout } = UserSlice.actions

export default UserSlice.reducer