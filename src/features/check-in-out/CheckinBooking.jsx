import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';

import Spinner from '../../ui/Spinner';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';

import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Checkbox from '../../ui/Checkbox';

import BookingDataBox from '../../features/bookings/BookingDataBox';

import { useBooking } from '../../features/bookings/useBooking';
import { useMoveBack } from '../../hooks/useMoveBack';
// import { useCheckin } from '../../useCheckin';

import styled from 'styled-components';
import { useSettings } from '../../features/settings/useSettings';
import useCheckin from './useCheckin';

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();

  const { settings, isLoading: isLoadingSettings } =
    useSettings();

  const moveBack = useMoveBack();

  // Can't use as initial state, because booking will still be loading
  useEffect(
    () => setConfirmPaid(booking?.isPaid ?? false),
    [booking]
  );
  const { checkin, isCheckingIn } = useCheckin();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    numNights * settings.breakfastPrice * numGuests;

  // function handleCheckin() {
  //   if (!confirmPaid) return;
  //   checkin(bookingId);
  // }

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast)
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    else checkin({ bookingId, breakfast: {} });
  }

  // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">
          Check in booking #{bookingId}
        </Heading>
        <ButtonText onClick={moveBack}>
          &larr; Back
        </ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            // If the guest has already paid online, we can't even undo this
            id="breakfast"
          >
            I want to add breakfast for{' '}
            {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() =>
            setConfirmPaid((confirm) => !confirm)
          }
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the
          total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )}
              (${formatCurrency(totalPrice)}+ ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
      {/* LATER */}
      {/*  */}
    </>
  );
}

export default CheckinBooking;
