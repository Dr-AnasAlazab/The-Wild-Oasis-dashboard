import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBooking } from '../../services/apiBookings';

function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingout } =
    useMutation({
      mutationFn: (bookingId) =>
        updateBooking(bookingId, {
          status: 'checked-out',
        }),
      onSuccess: (data) => {
        toast.success(
          `Booking #${data.id} successfully checked out!`,
          queryClient.invalidateQueries({
            active: true,
          })
        );
      },
      onError: () => {
        toast.error(
          `There was an error while checkout out: `
        );
      },
    });

  return { checkout, isCheckingout };
}

export default useCheckout;
