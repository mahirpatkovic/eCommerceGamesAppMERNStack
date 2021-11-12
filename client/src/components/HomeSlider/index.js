import React, { useState } from 'react';

import { Row, Col } from 'antd';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import GameVideoModal from '../GameVideoModal';
import { useMediaQuery } from 'react-responsive';
import './style.css';
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom';
import nfsLetterLogo from '../../assets/nfsLetterLogo.svg';
import nfsPicture from '../../assets/nfsPicture.jpg';

function HomeSlider(props) {
    const [isGameVideoModalVisible, setIsGameVideoModalVisible] =
        useState(false);
    const [isOpenVideoButtonClicked, setIsOpenVideoButtonClicked] =
        useState(true);
    const history = useHistory();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1025px)',
    });
    const openGameVideoModalHandler = () => {
        setIsGameVideoModalVisible(true);
        setIsOpenVideoButtonClicked(false);
    };

    const closeGameVideoModalHandler = () => {
        setIsGameVideoModalVisible(false);
        setIsOpenVideoButtonClicked(true);
    };

    const openGameHandler = () => {
        history.push('/games/615ed458c3bcf25f8cb3d27d');
    };

    return (
        <div style={{ display: 'flex' }}>
            {isDesktopOrLaptop && (
                <div className="homeTop">
                    <Row>
                        <Col lg={8} style={{ zIndex: 2 }}>
                            <img
                                alt="Need for Speed"
                                src={nfsLetterLogo}
                                style={{ marginTop: 100, marginLeft: 100 }}
                            />
                            <Row>
                                <Col>
                                    <div className="readMore">
                                        <p onClick={openGameHandler}>
                                            READ MORE
                                        </p>
                                        <div className="readMoreOverlay"></div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="buyNow">
                                        <p onClick={openGameHandler}>BUY NOW</p>
                                        <div className="buyNowOverlay"></div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={16} xl={16}>
                            <div className="nfsPicHomePg">
                                <img alt="Need for Speed" src={nfsPicture} />
                                <Col lg={{ offset: 11 }}>
                                    <div
                                        className="container"
                                        onClick={openGameVideoModalHandler}
                                    >
                                        {isOpenVideoButtonClicked && (
                                            <button className="pulse-button">
                                                <PlayArrowIcon
                                                    style={{
                                                        fontSize: 80,
                                                        color: '#ffc107',
                                                    }}
                                                />
                                            </button>
                                        )}
                                    </div>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </div>
            )}

            {isGameVideoModalVisible && (
                <GameVideoModal
                    visible={isGameVideoModalVisible}
                    onClose={closeGameVideoModalHandler}
                />
            )}
        </div>
    );
}

export default HomeSlider;
