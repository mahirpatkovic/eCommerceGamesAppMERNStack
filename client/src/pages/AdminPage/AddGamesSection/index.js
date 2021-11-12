import React, { useEffect, useState } from 'react';
import { Card, Table, Row, Col } from 'antd';
import AddGameModal from './AddGameModal';
import EditGameModal from './EditGameModal';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { gamesActions } from '../../../store/games';
import Service from '../../../api/service';

function AddGamesSection() {
    const [games, setGames] = useState([]);
    const [isAddGameModalVisible, setIsAddGameModalVisible] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [isEditGameModalVisible, setIsEditGameModalVisible] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        Service.getAllGames()
            .then((res) => {
                // console.log(res.data);
                setGames(res.data.games);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const gameColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Release Date',
            dataIndex: 'releaseDate',
            key: 'releaseDate',
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
        },
        {
            title: 'Games in stock',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            render: (price) => <p>{price}$</p>,
        },
    ];

    const openAddGameModalHandler = () => {
        setIsAddGameModalVisible(true);
    };

    const closeAddGameModalHandler = (values, isOk) => {
        if (isOk === true) {
            setGames((prevState) => {
                return [...prevState, values];
            });
        }
        setIsAddGameModalVisible(false);
    };

    const openEditGameModalHandler = (record) => {
        setSelectedGame(record);
        setIsEditGameModalVisible(true);
    };

    const closeEditGameModalHandler = (gm, isOk) => {
        if (isOk === true) {
            let tmpData = games;
            tmpData.forEach((v, i) => {
                if (v._id === gm._id) {
                    tmpData[i] = gm;
                }
            });
            setGames([...tmpData]);
        }
        setIsEditGameModalVisible(false);
    };

    const deleteGameHandler = (gm) => {
        let tmpData = games;
        setGames([...tmpData.filter((game) => game._id !== gm._id)]);
        dispatch(
            gamesActions.fetchGames([
                ...tmpData.filter((game) => game._id !== gm._id),
            ])
        );
        setIsEditGameModalVisible(false);
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
                                    Games List
                                </Col>
                                <Col span={8}>
                                    <Button
                                        secondary
                                        onClick={openAddGameModalHandler}
                                    >
                                        Add Game
                                    </Button>
                                </Col>
                            </Row>
                        </p>
                    </div>
                }
            >
                <Table
                    columns={gameColumns}
                    dataSource={games}
                    rowKey="_id"
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 400 }}
                    onRow={(data, index) => {
                        return {
                            onClick: (event) => openEditGameModalHandler(data),
                        };
                    }}
                />
            </Card>
            {isAddGameModalVisible && (
                <AddGameModal
                    visible={isAddGameModalVisible}
                    onClose={closeAddGameModalHandler}
                />
            )}
            {isEditGameModalVisible && (
                <EditGameModal
                    visible={isEditGameModalVisible}
                    selected={selectedGame}
                    onClose={closeEditGameModalHandler}
                    onDelete={deleteGameHandler}
                />
            )}
        </div>
    );
}

export default AddGamesSection;
