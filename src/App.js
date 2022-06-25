import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./component/Header";
import Register from "./component/pages/Register";
import AuthProvider from "./context/authContext";
import Login from "./component/pages/Login";
import Homepage from "./component/pages/Homepage";
import PrivateRoute from "./component/pages/PrivateRoute";
import ProfileInfo from "./component/pages/ProfileInfo";
import Settings from "./component/pages/Settings";
import PostPage from "./component/pages/PostPage";
import Footer from "./component/Footer";

// import GeneralInformation from "./component/pages/GeneralInformation";
const GeneralInformation = React.lazy(() =>
  import("./component/pages/GeneralInformation")
);
// import ChangePassword from "./component/pages/ChangePassword";
const ChangePassword = React.lazy(() =>
  import("./component/pages/ChangePassword")
);
// import ChangeDisplayName from "./component/pages/ChangeDisplayName";
const ChangeDisplayName = React.lazy(() =>
  import("./component/pages/ChangeDisplayName")
);
//import ChangeDisplayPicture from "./component/pages/ChangeDisplayPicture";
const ChangeDisplayPicture = React.lazy(() =>
  import("./component/pages/ChangeDisplayPicture")
);

function App() {

  const location = useLocation();

  function checkWhichPage() {
    // eslint-disable-next-line
    if (location.pathname != '/login' && location.pathname != '/register' && location.pathname != '/profile-name') {
      return ('grow shrink-0 xsm:flex xsm:w-full px-1 xsm:px-6 pb-4 bg-slate-100 bg-opacity-40 xl:bg-opacity-0');
    } else {
      return;
    }
  }

  return (
    <AuthProvider>
      <div
        className='container mx-auto max-w-6xl min-h-screen flex flex-col xsm:after:bg-purple-900 xsm:after:bg-[url(./img/heropattern.svg)] bg-center
        xsm:after:[mask-image:linear-gradient(90deg,white_0%,rgba(255,255,255,0.3)_20%,rgba(255,255,255,0.3)_80%,white_100%)]
      xsm:after:fixed xsm:after:inset-0 xsm:after:-z-10'>
        <Header />
        <div className={`${checkWhichPage()}`}>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route
              path='/'
              exact
              element={
                <PrivateRoute>
                  <Homepage />
                </PrivateRoute>
              }
            />
            <Route path='/profile-name' element={<ProfileInfo />} />
            <Route
              path='settings/*'
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }>
              <Route
                index
                element={
                  <PrivateRoute>
                    <React.Suspense fallback={<>...</>}>
                      <GeneralInformation />
                    </React.Suspense>
                  </PrivateRoute>
                }
              />
              <Route
                path='change-password'
                element={
                  <PrivateRoute>
                    <React.Suspense fallback={<>...</>}>
                      <ChangePassword />
                    </React.Suspense>
                  </PrivateRoute>
                }
              />
              <Route
                path='change-display-name'
                element={
                  <PrivateRoute>
                    <React.Suspense fallback={<>...</>}>
                      <ChangeDisplayName />
                    </React.Suspense>
                  </PrivateRoute>
                }
              />
              <Route
                path='change-display-picture'
                element={
                  <PrivateRoute>
                    <React.Suspense fallback={<>...</>}>
                      <ChangeDisplayPicture />
                    </React.Suspense>
                  </PrivateRoute>
                }
              />
              <Route path=':random' element={<Navigate to='/settings' />} />
            </Route>
            <Route
              path='post/:postId'
              element={
                <PrivateRoute>
                  <PostPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
