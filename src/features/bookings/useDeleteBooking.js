import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deletebooking } =
    useMutation({
      mutationFn: deleteBooking,
      onSuccess: () => {
        queryClient.invalidateQueries({
          querKey: ['bookings'],
        });
        toast.success('Booking successsfully deleted');
      },
      onError: (err) => toast.error(err.message),
    });

  return { isDeleting, deletebooking };
}

export default useDeleteBooking;
