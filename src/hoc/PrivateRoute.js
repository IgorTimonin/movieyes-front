import { Navigate } from 'react-router-dom';

const PrivateRoute = (props) => {
  const loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
  return loginStatus ? props.children : <Navigate to="/" />;
};

export default PrivateRoute;
