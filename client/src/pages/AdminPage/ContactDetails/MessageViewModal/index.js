import React, { useEffect } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import Service from '../../../../api/service';

function MessageViewModal(props) {
    useEffect(() => {
        Service.contactMessageOpened({ messageId: props.selected._id });
    }, [props.selected._id]);

    const contact = props.selected;
    return (
        <div>
            <Modal
                onClose={props.onClose}
                onOpen={props.visible}
                open={props.visible}
                style={{
                    height: 'auto',
                    top: 'auto',
                    left: 'auto',
                    bottom: 'auto',
                    right: 'auto',
                }}
                size="tiny"
            >
                <Modal.Header>Message</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>
                            <strong>Contact Person:</strong> {contact.fullName}
                        </p>
                        <p>
                            <strong>Email:</strong> {contact.email}
                        </p>
                        <p>
                            <strong>Message:</strong> {contact.message}
                        </p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="black" onClick={props.onClose}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export default MessageViewModal;
