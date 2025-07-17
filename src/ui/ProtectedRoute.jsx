import styled from 'styled-components';
import Spinner from './Spinner';
import { useUser } from '../features/authentication/useUser';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoaidng, fetchStatus } =
    useUser();

  useEffect(() => {
    if (
      !isAuthenticated &&
      !isLoaidng &&
      fetchStatus !== 'fetching'
    ) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, isLoaidng, fetchStatus]);

  if (isLoaidng)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
