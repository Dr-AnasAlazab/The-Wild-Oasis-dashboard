import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { login as loginApi } from '../../services/apiAuth';

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) =>
      loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      console.error('ERROR:', error);
      toast.error(
        'Provided email or password are incorrect.'
      );
    },
  });

  return { login, isLoading };
}

export default useLogin;
