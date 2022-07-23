import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ConfirmDelete = React.memo((props) => {
  console.log('confirm delete render again')
  const { handleDeleteObject, objectToDelete, ...rest } = props;
  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {
            props.objectToDelete.name
          } is about to be deleted. Confirm or cancel please.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.handleDeleteObject}>Confirm</Button>
        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
})
  