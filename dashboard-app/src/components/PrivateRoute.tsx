
import { useNavigate } from 'react-router-dom';
import { auth } from '../services';
import Loading from './Loading';
import { useAuthState } from 'react-firebase-hooks/auth';

function PrivateRoute(props: any) {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const { children } = props;

  if (loading) {
    return <Loading />;
  }

  if (error || !user) {
    navigate(`/`, {
      replace: true
    });
  }

  return (children);
}

export default PrivateRoute;
