import {BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/userHome';
import Login from './pages/userLogin';
import Signup from './pages/userSignup';
import {Toaster} from 'react-hot-toast'
import PublicRouteUser from './components/publicRouteUser/publicRouteUser';


function App() {
  return (
    <>
    <BrowserRouter>
    <div><Toaster/></div>
      <Routes>
        <Route path='/signup' element={<PublicRouteUser><Signup/></PublicRouteUser>}/>
        <Route path='/login' element={<PublicRouteUser><Login/></PublicRouteUser>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
