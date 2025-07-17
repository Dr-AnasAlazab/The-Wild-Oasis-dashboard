import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEdititng } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('cabbin successdfully edited');
      queryClient.invalidateQueries({
        querKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEdititng, editCabin };
}
