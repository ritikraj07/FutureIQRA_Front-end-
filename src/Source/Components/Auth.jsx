import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setUser } from "../Redux/Reducers/UserReducers";
import { GetDataFromToken, PostRequest } from "../Services/ApiCall";
import { useToast } from "@chakra-ui/react";
import ReactLoading from "react-loading";

export default function Auth({ children }) {
  const url = import.meta.env.VITE_API_URL;
  let token = JSON.parse(localStorage.getItem("token"));
  const loggedin = useSelector((state) => state.User.isLoggedIn) || token;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // console.log("1");
  useEffect(() => {
    console.log("20 auth file");
    setIsLoading(true)
    if (token) {
      console.log("token hai");
      PostRequest(`${url}user/token`).then((result) => {
        if (result?.status) {
          // console.log(result)

          dispatch(setUser(result?.data));
          setIsLoading(false)
        } else {
          console.log(result);

          toast({
            title: result?.data,
            status: "error",
          });
          localStorage.clear();
          navigate("/login");
          setIsLoading(false);
        }
      });

    }
  }, []);

  // console.log('=== >', isLoading)

  return (
    <>
      {isLoading ? (
        <div style={{ position: 'fixed', width: '50vh', height: '50vh', top: '45%', left: '45%' }}>
          <ReactLoading
            type={"bars"}
            color={"white"}
            height={"100px"}
            width={"100px"}

          />
        </div>
      ) : loggedin ? (
        <> {children} </>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
}
