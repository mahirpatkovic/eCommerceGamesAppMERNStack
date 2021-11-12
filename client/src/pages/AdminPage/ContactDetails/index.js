import React, { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import { Icon } from 'semantic-ui-react';
import MessageViewModal from './MessageViewModal';
import Service from '../../../api/service';

function ContactDetails() {
    const [contactDetails, setContactDetails] = useState([]);
    const [isMessageViewModalVisible, setIsMessageViewModalVisible] =
        useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        Service.getAllContactDetails()
            .then((res) => {
                setContactDetails(res.data.messages);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const openMessageModalHandler = (record) => {
        setSelectedMessage(record);
        for (let contact of contactDetails) {
            if (contact._id === record._id) {
                contact.isOpen = true;
            }
        }
        let tmpContacts = [...contactDetails];
        setContactDetails(tmpContacts);
        setIsMessageViewModalVisible(true);
    };

    const closeMessageModalHandler = () => {
        setIsMessageViewModalVisible(false);
    };

    const contactDetailsColumns = [
        {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: 'Open Message',
            dataIndex: 'isOpen',
            key: 'isOpen',
            align: 'center',
            render: (value, record) => (
                <Icon
                    name={value === true ? 'envelope open outline' : 'envelope'}
                    size="large"
                    style={{ cursor: 'pointer' }}
                    onClick={() => openMessageModalHandler(record)}
                />
            ),
        },
    ];

    return (
        <div>
            <Card
                bordered={false}
                size="small"
                style={{ backgroundColor: 'transparent' }}
                cover={
                    <div>
                        <p
                            style={{
                                fontWeight: 'bold',
                                padding: 15,
                                backgroundColor: '#ffc107',
                                fontSize: 16,
                                borderRadius: 3,
                            }}
                        >
                            Contact Details
                        </p>
                    </div>
                }
            >
                <Table
                    columns={contactDetailsColumns}
                    dataSource={contactDetails}
                    rowKey="_id"
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 400 }}
                />
                {isMessageViewModalVisible && (
                    <MessageViewModal
                        visible={isMessageViewModalVisible}
                        onClose={closeMessageModalHandler}
                        selected={selectedMessage}
                    />
                )}
            </Card>
        </div>
    );
}

export default ContactDetails;
