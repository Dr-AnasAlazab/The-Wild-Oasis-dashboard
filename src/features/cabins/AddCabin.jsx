import { useState } from 'react';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import CabinTable from './CabinTable';

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModel, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button
//         onClick={() => setIsOpenModal((show) => !show)}
//       >
//         Add new cabin
//       </Button>
//       {isOpenModel && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm
//             onCloseModel={() => setIsOpenModal(false)}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
