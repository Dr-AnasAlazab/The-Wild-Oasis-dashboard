import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'; // Fixed: should be 'react-router-dom'
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } =
    useMutation({
      mutationFn: ({ bookingId, breakfast }) =>
        updateBooking(bookingId, {
          status: 'checked-in',
          isPaid: true,
          ...breakfast, // Spread the breakfast object if it exists
        }),
      onSuccess: (data) => {
        toast.success(
          `Booking #${data.id} successfully checked in`
        );
        queryClient.invalidateQueries({ active: true });
        navigate('/');
      },

      // Invalidate active bookings query
      onError: () => {
        toast.error(
          `There was an error while checking in: `
        );
      },
    });

  return { checkin, isCheckingIn };
}

export default useCheckin;
