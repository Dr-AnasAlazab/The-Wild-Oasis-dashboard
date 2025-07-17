import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabain';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({
  cabinToEdit = {},
  setShow,
  setShowForm,
  onCloseModel,
}) {
  const { id: editId, ...editValues } = cabinToEdit;
  console.log(editValues);

  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isEdititng, editCabin } = useEditCabin();

  const isWorking = isCreating || isEdititng;

  function onSubmit(data) {
    const image =
      typeof data.image === 'string'
        ? data.image
        : data.image[0];

    if (isEditSession)
      editCabin(
        {
          newCabinData: { ...data, image: image },
          id: editId,
        },
        {
          onSuccess: (data) => {
            setShow((show) => !show);
            reset();
            onCloseModel?.();
            console.log(data);
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            setShowForm((show) => !show);
            reset();
            onCloseModel?.();
            console.log(data);
          },
        }
      );
  }

  function onError(err) {
    console.log(err);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModel ? 'modal' : 'regular}'}
    >
      <FormRow
        label="Cabin name"
        error={errors?.name?.message}
      >
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label="Regular Price"
        error={errors?.regularPrice?.message}
        disabled={isWorking}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={errors?.discount?.message}
        disabled={isWorking}
      >
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount shoudl be less than regualr price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description"
        error={errors?.description?.message}
        disabled={isWorking}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label="Cabin photo"
        disabled={isWorking}
        defaultValue=""
      >
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register('image', {
            required: isEditSession
              ? false
              : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModel?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession
            ? 'Edit Cabin'
            : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
