import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { logout as logoutApi } from '../../services/apiAuth';

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();

      navigate('/login', { replace: true });
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });

  return { logout, isLoading };
}

export default useLogout;
