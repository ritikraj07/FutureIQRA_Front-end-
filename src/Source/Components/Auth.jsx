import {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate} from 'react-router-dom'
import { setUser } from '../Redux/Reducers/UserReducers';
import { GetDataFromToken, PostRequest } from '../Services/ApiCall';
import { useToast } from '@chakra-ui/react';



export default function Auth({ children }) {
  const url = import.meta.env.VITE_API_URL;
  let token = JSON.parse(localStorage.getItem("token"));
  const loggedin = useSelector((state) => state.User.isLoggedIn) || token
  const dispatch = useDispatch()
  const toast = useToast();
  const navigate = useNavigate()

  // console.log("1");
  useEffect(() => {
    // console.log("2", token)
    token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      // let result = GetDataFromToken(token)
      PostRequest(`${url}user/token`)
        .then((result) => {
          if (result?.status) {
            // console.log(result)
            dispatch(setUser(result?.data))
          } else {
            console.log(result)
            
            toast({
              title: result?.data,
              status:'error'
            })
            localStorage.clear();
            navigate("/login");
          }
      })
        
    }
  }, [])


  // console.log('=== >', loggedin)
    

  return loggedin ? (
    <> {children } </>
    ) : (
      <Navigate to="/login" replace={true} />
    );
}