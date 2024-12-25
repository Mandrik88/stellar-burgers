import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
// import { Preloader } from '../ui/preloader';
import { getUserState } from '../../services/slices/userSlice/userSlice';

// type ProtectedRouteProps = {
//   // children: React.ReactElement;
//   // onlyUnAuth?: boolean;
// };

export const ProtectedRoute = () =>
  // {
  //   // children,
  //   // onlyUnAuth
  // }: ProtectedRouteProps
  {
    console.log('proteckted route');
    const location = useLocation();

    //   const data = useSelector(getUserState).userData;
    // const isAuthChecked = useSelector(getUserState).isAuthChecked;
    const isAuthenticated = useSelector(getUserState).isAuthenticated;
    console.log(isAuthenticated);

    // if (!onlyUnAuth && !isAuthenticated) {
    if (!isAuthenticated) {
      return <Navigate replace to='/login' state={{ from: location }} />;
    }

    // if (onlyUnAuth && isAuthenticated) {
    //   const from = location.state?.from || { pathname: '/' };
    //   return <Navigate replace to={from} />;
    // }

    return <Outlet />;
    // if (isAuthChecked) {
    //   // return <Preloader />;

    //   // return children;
    // }
    // return 'ghbdtn';
  };
