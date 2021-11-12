import React from 'react';
import UsersTable from './UsersTable';
import './style.css';
import { Col, Row } from 'antd';
import DiscountCodes from './DiscountCodes';

import { Divider } from 'semantic-ui-react'
import AddGamesSection from './AddGamesSection';
import ContactDetails from './ContactDetails';
function AdminPage() {
    return (
        <div style={{ display: 'flex' }}>
            <div className='adminPage'>
                <Row gutter={[10, 10]}>
                    <Col xs={24} lg={12} xl={12}>
                        <UsersTable />
                    </Col>
                    <Col xs={24} lg={12} xl={12}>
                        <DiscountCodes />
                    </Col>
                </Row>
                <Divider />
                <Row gutter={[10, 10]}>
                    <Col xs={24} lg={12} xl={12}>
                        <AddGamesSection />
                    </Col>
                    <Col xs={24} lg={12} xl={12}>
                        <ContactDetails />
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default AdminPage;