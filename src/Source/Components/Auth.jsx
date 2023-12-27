import {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom'
import { setUser } from '../Redux/Reducers/UserReducers';
import { GetDataFromToken } from '../Services/ApiCall';


export default function Auth({ children }) {
  let token = JSON.parse(localStorage.getItem("token"));
  const loggedin = useSelector((state) => state.User.isLoggedIn) || token
  const dispatch = useDispatch()
  // console.log("1");
  useEffect(() => {
    // console.log("2", token)
    token = JSON.parse(localStorage.getItem("token"));
    if (token) {
        let result = GetDataFromToken(token)
      dispatch(setUser(result.data))
        
    }
  }, [])


  // console.log('=== >', loggedin)
    

  return loggedin ? (
    <> {children } </>
    ) : (
      <Navigate to="/login" replace={true} />
    );
}