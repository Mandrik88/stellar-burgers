import {
  ConstructorPage,
  ForgotPassword,
  Feed,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '../../components/app-header/app-header';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import { Modal } from '../../components/modal/modal';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { OrderInfo } from '../../components/order-info/order-info';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getUser } from '../../services/slices/userSlice/userSlice';
import { getIngredients } from '../../services/slices/ingredientSlice/ingredientSlice';
import { CentralComponent } from '../../components/central-component/central-component';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path='/ingredients/:id'
          element={
            <CentralComponent title={'Детали ингредиента'}>
              <IngredientDetails />
            </CentralComponent>
          }
        />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <CentralComponent title={`#${location.pathname.match(/\d+/)}`}>
              <OrderInfo />
            </CentralComponent>
          }
        />
        <Route element={<ProtectedRoute onlyUnAuth />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute onlyUnAuth={false} />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route
            path='/profile/orders/:number'
            element={
              <CentralComponent title={`#${location.pathname.match(/\d+/)}`}>
                <OrderInfo />
              </CentralComponent>
            }
          />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={() => {
                  history.back();
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${location.pathname.match(/\d+/)}`}
                onClose={() => {
                  history.back();
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route element={<ProtectedRoute onlyUnAuth={false} />}>
            <Route
              path='/profile/orders/:number'
              element={
                <Modal
                  title={`#${location.pathname.match(/\d+/)}`}
                  onClose={() => {
                    history.back();
                  }}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
