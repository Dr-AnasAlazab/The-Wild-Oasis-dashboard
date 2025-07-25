import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

export function useUpdatedUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isEdititng } =
    useMutation({
      mutationFn: updateCurrentUser,
      onSuccess: ({ user }) => {
        toast.success('User account successdfully edited');

        queryClient.setQueryData(['user'], user);
        // queryClient.invalidateQueries({
        //   queryKey: ['user'],
        // });
      },
      onError: (err) => toast.error(err.message),
    });
  return { updateUser, isEdititng };
}
