import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import LeaderBoard from "../Pages/LeaderBoard";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import QuestionAnswer from "../Pages/QuestionAnswer";
import Report from "../Pages/Report";
import ReferAndEarn from "../Pages/ReferAndEarn";
import AdminRouter from "../AdminPages/index.jsx";
import NoMatch from "../Components/NoMatch";
import AdminHome from "../AdminPages/AdminHome";
import AdminReports from "../AdminPages/AdminReports";
import AdminQnA from "../AdminPages/AdminQnA";
import Auth from "../Components/Auth.jsx";
import AdminAuth from "../AdminPages/AdminAuth.jsx";
import CourseDes from "../Pages/CourseDes.jsx";
import AdminCourse from "../AdminPages/AdminCourse.jsx";
import UnauthorizedPage from "../Components/Unauthorized.jsx";
import MyLearning from "../Pages/MyLearning.jsx";
import WatchCourse from "../Pages/WatchCourse.jsx";
import AddVideo from "../AdminPages/AddVideo.jsx";
import PrivacyPolicy from "../Components/PrivacyPolicy.jsx";
import TermsAndConditions from "../Components/Terms&Conditions.jsx";
import RefundsAndReturnsPolicy from "../Components/Refunds&ReturnsPolicy.jsx";
import AboutUs from "../Components/About.jsx";
import ThankYou from "../Pages/ThankYou.jsx";

export default function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Auth>
            <Home />
          </Auth>
        }
      />
      <Route path="/thank-you/:orderId" element={<ThankYou />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route
        path="/privacy&policy"
        element={
          <Auth>
            <PrivacyPolicy />
          </Auth>
        }
      />
      <Route
        path="/terms&conditions"
        element={
          <Auth>
            <TermsAndConditions />
          </Auth>
        }
      />

      <Route
        path="/refunds&returns-policy"
        element={
          <Auth>
            <RefundsAndReturnsPolicy />
          </Auth>
        }
      />
      <Route
        path="/report"
        element={
          <Auth>
            <Report />
          </Auth>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <Auth>
            <LeaderBoard />
          </Auth>
        }
      />
      <Route
        path="/course/:coursetype"
        element={
          <Auth>
            <CourseDes />
          </Auth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/signup/:refercode" element={<SignUp />} />
      <Route
        path="/q&a"
        element={
          <Auth>
            {" "}
            <QuestionAnswer />
          </Auth>
        }
      />
      <Route
        path="/refer&earn"
        element={
          <Auth>
            <ReferAndEarn />
          </Auth>
        }
      />

      <Route
        path="/my-learning"
        element={
          <Auth>
            <MyLearning />
          </Auth>
        }
      />
      <Route
        path="/my-learning/:course_name/:course_id/:video_no"
        element={
          <Auth>
            <WatchCourse />
          </Auth>
        }
      />
      <Route
        path="/admin/"
        element={
          <AdminAuth>
            <AdminRouter />
          </AdminAuth>
        }
      >
        <Route
          index
          path="dashboard"
          element={
            <AdminAuth>
              <AdminHome />
            </AdminAuth>
          }
        />
        <Route
          path="report"
          element={
            <AdminAuth>
              <AdminReports />
            </AdminAuth>
          }
        />
        <Route
          path="q&a"
          element={
            <AdminAuth>
              <AdminQnA />{" "}
            </AdminAuth>
          }
        />
        <Route
          path="course"
          element={
            <AdminAuth>
              <AdminCourse />{" "}
            </AdminAuth>
          }
        />

        <Route
          path="course/:course_name/:course_id"
          element={
            <AdminAuth>
              <AddVideo />
            </AdminAuth>
          }
        />
      </Route>
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<UnauthorizedPage />} />
    </Routes>
  );
}
