import React from 'react';
import { Card, Col, Row } from 'antd';
import { Icon } from 'semantic-ui-react'

function TableInfo(props) {
    return (
        <Card>
            <Row>
                <Col span={2}>
                    <Icon name='tags' />
                </Col>
                <Col span={8}>
                    <strong>Genre</strong>
                </Col>
                <Col>
                    {props.game.genre}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col span={2}>
                    <Icon name='clock outline' />
                </Col>
                <Col span={8}>
                    <strong>Release Date</strong>
                </Col>
                <Col>
                    {props.game.releaseDate}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col span={2}>
                    <Icon name='settings' />
                </Col>
                <Col span={8}>
                    <strong>Developer</strong>
                </Col>
                <Col>
                    {props.game.developer}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col span={2}>
                    <Icon name='globe' />
                </Col>
                <Col span={8}>
                    <strong>Publisher</strong>
                </Col>
                <Col>
                    {props.game.publisher}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col span={2}>
                    <Icon name='tv' />
                </Col>
                <Col span={8}>
                    <strong>Platforms</strong>
                </Col>
                <Col>
                    {props.game.platform}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col span={2}>
                    <Icon name='users' />
                </Col>
                <Col span={8}>
                    <strong>Modes</strong>
                </Col>
                <Col>
                    {props.game.modes}
                </Col>
            </Row>
        </Card>
    )
}

export default TableInfo;