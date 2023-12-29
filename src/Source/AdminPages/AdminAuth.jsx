import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom'
import { GetDataFromToken } from '../Services/ApiCall';
import { setUser } from '../Redux/Reducers/UserReducers';
import UnauthorizedPage from '../Components/Unauthorized';
export default function AdminAuth({ children }) {
    const isAdmin = useSelector((state) => state.User.isAdmin);
    let dispatch = useDispatch()
    useEffect(() => {
        
      const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
          let result = GetDataFromToken(token);
          dispatch(setUser(result.data));
        }
    },[])
  

  if (isAdmin) {
    return <>{children}</>
  } else {
    return <UnauthorizedPage />
  }
  
  
  // return isAdmin ? <>{children}</>
    
  //   : <Navigate to="/login" replace={true} />;
}
