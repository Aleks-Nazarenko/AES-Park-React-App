import Modal from 'react-bootstrap/Modal';
import {useState, useEffect } from "react";
import close from "./assets/BTN_Schliessen.png";
import { useTranslation } from 'react-i18next';

const AESTourModal = ({showModal, closeModal, tourId}) => {
    const [modalContent, setModalContent] = useState('');
    const {t, i18n} = useTranslation();
    useEffect(() => {
        const getModalContent = (id) => {
            if (id === 0) {
                return (
                    <>
                    <div className="modal-text-title">{t('modal.title.0')}</div>
                    <div className="modal-text-text">{t('modal.0')}</div>
                    </>
                );
            } else if (id === 1) {
                return (
                    <>
                        <div className="modal-text-title">{t('modal.title.1')}</div>
                        <div className="modal-text-text">{t('modal.1')}</div>
                    </>
                );
            } else if (id === 2)  {
                return (
                    <>
                        <div className="modal-text-title">{t('modal.title.2')}</div>
                        <div className="modal-text-text">{t('modal.2')}</div>
                    </>
                );
            }else if (id === 3)  {
                return (
                    <>
                        <div className="modal-text-title">{t('modal.title.3')}</div>
                        <div className="modal-text-text">{t('modal.3')}</div>
                    </>
                );
            }else if (id === 4)  {
                return (
                    <>
                        <div className="modal-text-title">{t('modal.title.4')}</div>
                        <div className="modal-text-text">{t('modal.4')}</div>
                    </>
                );
            }else if (id === 5)  {
                return (
                    <>
                        <div className="modal-text-title">{t('modal.title.5')}</div>
                        <div className="modal-text-text">{t('modal.5')}</div>
                    </>
                );
            }else{ closeModal(); }
        }
        setModalContent(getModalContent(tourId));
    },[tourId,t]);
    return(
     <Modal show={showModal} onHide={closeModal}>
         <Modal.Body>
             {modalContent}
         </Modal.Body>
         <Modal.Footer className="d-flex justify-content-center">
             <img src={close} alt="close" onClick={closeModal}/>
         </Modal.Footer>
     </Modal>
 );
}
export default AESTourModal;