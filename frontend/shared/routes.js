import Home from './components/Home/Container';
import Search from './components/Search/Container';
import SignIn from './components/Auth/SignIn/Container';
import SignUp from './components/Auth/SignUp/Container';
import SignOut from './components/Auth/SignOut/Container';
import Activate from './components/Auth/Activate/Container';
import ResetPassword from './components/Auth/ResetPassword/Container';
import CreatePassword from './components/Auth/CreatePassword/Container';


const routes = [
  {
    path: '/',
    exact: true,
    component: SignIn
  },
  {
    path: '/accounts/login',
    component: SignIn
  },
  {
    path: '/accounts/signup',
    component: SignUp
  },
  {
    path: '/accounts/logout',
    component: SignOut
  },
  {
    path: '/accounts/reset-password',
    component: ResetPassword
  },
  {
    path: '/accounts/create-password',
    component: CreatePassword
  },
  {
    path: '/accounts/activate/:code',
    component: Activate
  },
  {
    path: '/search',
    component: Search
  }
];

export default routes;
