import React, { useEffect, useState } from 'react';
import { Card, Popconfirm, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { useSelector } from 'react-redux';
import Service from '../../../api/service';

function UsersTable() {
    const [users, setUsers] = useState([]);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const currentUser = useSelector((state) => state.auth.currentUser);
    useEffect(() => {
        const getAllUsers = async () => {
            await Service.getAllUsers().then((res) => {
                if (currentUser.role === 'superadmin') {
                    setIsSuperAdmin(true);
                }
                setUsers(res.data.allUsers);
            });
        };

        getAllUsers();
    }, [currentUser.role]);

    const addUserAsAdminHandler = async (user) => {
        await Service.addUserAsAdmin({ userId: user._id }).then((res) => {
            for (let usr of users) {
                if (usr.id === user.id) {
                    user.role = 'admin';
                }
            }
            let usersArray = [...users];
            setUsers(usersArray);
        });
    };

    const removeUserAsAdminHandler = async (user) => {
        await Service.removeUserAsAdmin({ userId: user._id }).then((res) => {
            for (let usr of users) {
                if (usr.id === user.id) {
                    user.role = 'user';
                }
            }
            let usersArray = [...users];
            setUsers(usersArray);
        });
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
                                padding: 15,
                                backgroundColor: '#ffc107',
                                fontSize: 16,
                                borderRadius: 3,
                            }}
                        >
                            Users List
                        </p>
                    </div>
                }
            >
                <Table
                    dataSource={users}
                    rowKey="_id"
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 400 }}
                >
                    <Column
                        title="Full Name"
                        dataIndex="fullName"
                        key="fullName"
                    />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Address" dataIndex="address" key="address" />
                    {isSuperAdmin && (
                        <Column
                            title="Admin"
                            dataIndex="isAdmin"
                            key="isAdmin"
                            render={(value, record) =>
                                record.role === 'superadmin' ? (
                                    <Tag
                                        color="geekblue"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        SuperAdmin
                                    </Tag>
                                ) : (
                                    <Tag
                                        color={
                                            record.role === 'admin'
                                                ? 'green'
                                                : 'volcano'
                                        }
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {record.role === 'admin' ? (
                                            <Popconfirm
                                                title="Remove as admin?"
                                                onConfirm={() =>
                                                    removeUserAsAdminHandler(
                                                        record
                                                    )
                                                }
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                YES
                                            </Popconfirm>
                                        ) : (
                                            <Popconfirm
                                                title="Add as admin?"
                                                onConfirm={() =>
                                                    addUserAsAdminHandler(
                                                        record
                                                    )
                                                }
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                NO
                                            </Popconfirm>
                                        )}
                                    </Tag>
                                )
                            }
                        />
                    )}
                </Table>
            </Card>
        </div>
    );
}

export default UsersTable;
