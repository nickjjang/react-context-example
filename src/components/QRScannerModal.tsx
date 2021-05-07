import React from "react";
import QrReader from "react-qr-reader";
import {
  Button,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import "./QRScannerModal.scss";

interface QRScannerProps {
  isOpen: boolean;
  toggle: () => void;
  onQRScanned: (qrcode: string | null) => void;
}

const QRScannerModal = ({ isOpen, toggle, onQRScanned }: QRScannerProps) => {
  const handleQRScanned = (result: string | null) => {
    onQRScanned(result);
    toggle();
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="qrscanner-modal">
      <ModalHeader toggle={toggle}>QR Scanner</ModalHeader>
      <ModalBody>
        <FormGroup>
          <QrReader
            onError={(error) => {
              console.log(error);
            }}
            onScan={handleQRScanned}
          />
        </FormGroup>
      </ModalBody>
    </Modal>
  );
};

export default QRScannerModal;
