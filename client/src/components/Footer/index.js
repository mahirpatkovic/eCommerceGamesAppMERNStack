import { Col, Row } from 'antd';
import React from 'react';
import About from './About';
import ContactForm from './ContactForm';
import './style.css';

function Footer() {
    return (
        <div style={{ marginTop: -230 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="waveDown"><path fill="black" fillOpacity="1" d="M0,192L1440,32L1440,320L0,320Z"></path></svg>
            <div className='footer'>
                <div className='contact'>
                    <Row>
                        <Col xs={24} lg={{span: 7, offset: 2}}>
                            <About />
                        </Col>
                        <Col xs={24} lg={{ span: 10, offset: 3 }}>
                            <ContactForm />
                        </Col>
                    </Row>
                    <br/>
                    <Row justify='center'>
                        <p style={{color: 'white'}}>MSGames ©2021 Created by General IT and Software Solutions d.o.o. Sarajevo by Mahir Patkovic</p>
                    </Row>
                </div>
                <br />
            </div>
        </div>
    )
}

export default Footer;