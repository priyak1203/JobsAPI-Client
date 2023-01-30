import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';

function PrivateRoute({ children }) {
  const { user } = useGlobalContext();
  return user ? children : <Navigate to="/" />;
}

export default PrivateRoute;
