import './App.css'
import Menulist from './component/Menulist'
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Menu from './pages/Menu/Menu';
import { Toaster } from 'react-hot-toast';
import ResaturentMenu from './component/RestaurentMenu/RestaurentMenu';
import { Provider, useSelector } from 'react-redux';
import { persistor, store } from './store/store.js';
import { selectLoggedInUser } from './store/user/userSlice.js';
import { PersistGate } from 'redux-persist/integration/react';
// store

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Main />
      </PersistGate>
    </Provider>
  );
}

const Main = () => {

  const currentUser = useSelector(selectLoggedInUser);

  // console.log("App.jsx value:- ", currentUser);
  // console.log("Line 28", currentUser.user);


  return (
    <div>
      {/* <Menulist /> */}
      <Router>
        <Routes>
          <Route path='/' element={<Menu />} />
          {/* LAndin page what we provide change after this */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={currentUser.user !== null ? <Menu /> : <Navigate to="/login" replace />} />
          <Route path='/:restaurantSlug/menu' element={<ResaturentMenu />} />
          {/* Public route where menulist will be dispalyed */}
          <Route path="/menulist" element={<Menulist />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  )
}

export default App
