import React from "react";
import {
  Button,
  CustomInput,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

interface QRScannerProps {
  open: boolean;
  toggle: () => void;
  onQRScanned: (qrcode: string) => void;
}

const QRScannerModal = ({ open, toggle, onQRScanned }: QRScannerProps) => {
  return (
    <Modal isOpen={open} toggle={toggle} className="qrscanner-modal">
      <ModalHeader toggle={toggle}>QR Scanner</ModalHeader>
      <ModalBody>
        <FormGroup>
          <div className="video-container">
            <video className="video"></video>
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="imageFileBrowser">Browse a image</Label>
          <CustomInput
            className="imageFile"
            type="file"
            id="imageFileBrowser"
            name="imageFile"
            label="Pick a QR image"
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle} className="mr-2">
          Cancel
        </Button>
        <Button color="primary" onClick={toggle}>
          OK
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default QRScannerModal;
