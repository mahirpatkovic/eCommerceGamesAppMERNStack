import { notification } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button, TextArea, Icon } from 'semantic-ui-react';
import Service from '../../../api/service';

function ContactForm() {
    const [values, setValues] = useState({
        fullName: '',
        email: '',
        message: '',
    });

    const isUserLoggedIn = useSelector((state) => state.auth.isAuthenticated);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const inputChangeHandler = (e) => {
        const { id, value } = e.target;
        if (!isUserLoggedIn) {
            setValues({ ...values, [id]: value });
        } else {
            setValues({
                fullName: currentUser.fullName,
                email: currentUser.email,
                message: value,
            });
        }
    };

    const sumbitFormHandler = () => {
        // console.log(values);
        Service.createContactMessage(values)
            .then(() => {
                notification.open({
                    message: `Message sent successfully`,
                    icon: <Icon name="check circle outline" />,
                });
                setValues({
                    fullName: '',
                    email: '',
                    message: '',
                });
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const isDisabled = !values.fullName || !values.email || !values.message;
    return (
        <div>
            <div style={{ overflow: 'hidden', width: 140 }}>
                <p
                    style={{
                        float: 'left',
                        color: 'white',
                        fontFamily: 'Open Sans',
                        fontSize: 25,
                    }}
                >
                    Contact
                </p>
                <p
                    style={{
                        float: 'right',
                        color: '#ffc107',
                        fontFamily: 'Open Sans',
                        fontSize: 25,
                    }}
                >
                    Us
                </p>
            </div>
            <Form>
                {!isUserLoggedIn && (
                    <Form.Field>
                        <label style={{ color: 'white' }}>Full Name</label>
                        <input
                            id="fullName"
                            placeholder="Full Name..."
                            value={values.fullName}
                            onChange={inputChangeHandler}
                        />
                    </Form.Field>
                )}
                {!isUserLoggedIn && (
                    <Form.Field>
                        <label style={{ color: 'white' }}>Email</label>
                        <input
                            id="email"
                            placeholder="Email..."
                            value={values.email}
                            onChange={inputChangeHandler}
                        />
                    </Form.Field>
                )}
                <Form.Field>
                    <label style={{ color: 'white' }}>Message</label>
                    <TextArea
                        placeholder="Message"
                        id="message"
                        value={values.message}
                        onChange={inputChangeHandler}
                    />
                </Form.Field>
                <Button onClick={sumbitFormHandler} disabled={isDisabled}>
                    Send
                </Button>
            </Form>
        </div>
    );
}

export default ContactForm;
