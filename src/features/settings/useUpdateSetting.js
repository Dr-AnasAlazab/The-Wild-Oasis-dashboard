import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { updateSetting as updateSettingsApi } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const {
    mutate: updateSetting,
    isLoading: isUpdating,
  } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      toast.success(
        'setting successdfully edited'
      );
      queryClient.invalidateQueries({
        querKey: ['settings'],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateSetting };
}
