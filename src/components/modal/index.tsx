import React from "react";
import { Modal} from "react-bootstrap";

interface ModalProps {
 show: boolean;
  onHide: () => void;
  content: React.ReactNode;
  title: React.ReactNode;
  headerclose: React.ReactNode;
  footerclose: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({
    show, 
    onHide,
  content,
  title,
  headerclose,
  footerclose,
}) => {
  return (
    <>
     <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header>
      <div className="container_titulo">{title}</div>
              {headerclose}
      </Modal.Header>
      <Modal.Body>
      {content}
      </Modal.Body>
      <Modal.Footer>
      {footerclose}
      </Modal.Footer>
    </Modal>

    </>
  );
};

export default CustomModal;
