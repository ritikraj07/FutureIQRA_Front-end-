import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { GetDataFromToken, GetRequest, PostRequest } from "../Services/ApiCall";
import UnauthorizedPage from "../Components/Unauthorized";
import { setAdminData } from "../Redux/Reducers/AdminReducers";
import { setUser } from "../Redux/Reducers/UserReducers";
export default function AdminAuth({ children }) {
  const url = import.meta.env.VITE_API_URL;
  const isAdmin = useSelector((state) => state.User.isAdmin);
  let dispatch = useDispatch();
  // console.log(isAdmin)

  useEffect(() => {
    if (!isAdmin) {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        let result = GetDataFromToken(token);
        dispatch(setUser(result.data));
      }
    }

    GetRequest(`${url}admin/all`)
      .then((res) => {
        // console.log(res);
        dispatch(setAdminData(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isAdmin) {
    return <>{children}</>;
  } else {
    return <UnauthorizedPage />;
  }
}
