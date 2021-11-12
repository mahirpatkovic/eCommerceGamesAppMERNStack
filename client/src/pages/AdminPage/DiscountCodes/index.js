import React, { useEffect, useState } from 'react';
import { Card, Table, Col, Row } from 'antd';
import { Button } from 'semantic-ui-react';
import AddDiscountCodeModal from './AddDiscountCodeModal';
import { useSelector } from 'react-redux';
import Service from '../../../api/service';

function DiscountCodesTable() {
    const [codes, setCodes] = useState([]);
    const [isAddDiscountCodeModalVisible, setIsAddDiscountCodeModalVisible] =
        useState(false);

    const currentUser = useSelector((state) => state.auth.currentUser);

    useEffect(() => {
        const getAllDiscountCodes = async () => {
            await Service.getAllDiscountCodes().then((res) => {
                setCodes(res.data.discountCodes);
            });
        };

        getAllDiscountCodes();
    }, []);

    const discountCodesColumns = [
        {
            title: 'Code',
            dataIndex: 'codeId',
            key: 'codeId',
        },
        {
            title: 'Added By',
            dataIndex: 'addedBy',
            key: 'addedBy',
        },
    ];

    const openAddDiscountCodeModalHandler = () => {
        setIsAddDiscountCodeModalVisible(true);
    };

    const closeAddDiscountCodeModalHandler = (code, isOk) => {
        if (isOk === true) {
            let tmpCodes = codes;
            tmpCodes.push({ codeId: code, addedBy: currentUser.fullName });
            setCodes([...tmpCodes]);
        }
        setIsAddDiscountCodeModalVisible(false);
    };
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
                                padding: 8,
                                paddingLeft: 15,
                                backgroundColor: '#ffc107',
                                fontSize: 16,
                                borderRadius: 3,
                            }}
                        >
                            <Row>
                                <Col span={16} style={{ marginTop: 5 }}>
                                    Discount Codes List
                                </Col>
                                <Col span={8}>
                                    <Button
                                        secondary
                                        onClick={
                                            openAddDiscountCodeModalHandler
                                        }
                                    >
                                        Add Discount Code
                                    </Button>
                                </Col>
                            </Row>
                        </p>
                    </div>
                }
            >
                <Table
                    columns={discountCodesColumns}
                    dataSource={codes}
                    rowKey="codeId"
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 400 }}
                />
            </Card>
            {isAddDiscountCodeModalVisible && (
                <AddDiscountCodeModal
                    visible={isAddDiscountCodeModalVisible}
                    onClose={closeAddDiscountCodeModalHandler}
                />
            )}
        </div>
    );
}

export default DiscountCodesTable;
