import toast from 'react-hot-toast';
import { signUp as singUpApi } from '../../services/apiAuth';
import { useMutation } from '@tanstack/react-query';

function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: singUpApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address"
      );
    },
  });
  return { signUp, isLoading };
}

export default useSignUp;
