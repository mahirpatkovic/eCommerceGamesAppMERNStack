import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Card, Col, Row } from 'antd';

function TableLanguageInfo(props) {
    const english = props.english;
    const german = props.german;
    const portugese = props.portugese;
    const spanish = props.spanish;
    const turkish = props.turkish;

    return (
        <Card>
            <Row>
                <Col span={6}>
                    <strong>Languages</strong>
                </Col>
                <Col span={6} style={{ textAlign: 'center' }}>
                    <strong>Interface</strong>
                </Col>
                <Col span={6} style={{ textAlign: 'center' }}>
                    <strong>Audio</strong>
                </Col>
                <Col span={6} style={{ textAlign: 'center' }}>
                    <strong>Subtitles</strong>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col span={6}>
                    <strong>English</strong>
                </Col>
                <Col span={6} style={{ textAlign: 'center' }}>
                    {english.interface === true ? (
                        <Icon name="checkmark" />
                    ) : (
                        ''
                    )}
                </Col>
                <Col span={6} style={{ textAlign: 'center' }}>
                    {english.audio === true ? <Icon name="checkmark" /> : ''}
                </Col>
                <Col span={6} style={{ textAlign: 'center' }}>
                    {english.subtitles === true ? (
                        <Icon name="checkmark" />
                    ) : (
                        ''
                    )}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col span={6}>
                    <strong>German</strong>
                </Col>
                <Col span={6} style={{ textAlign: 'center' }}>
                    {german.interface === true ? <Icon name="checkmark" /> : ''}
                </Col>
                <Col span={6} style={{ textAlign: 'center' }}>
                    {german.audio === true ? <Icon name="checkmark" /> : ''}
                </Col>
                <Col span={6} style={{ textAlign: 'center' }}>
                    {german.subtitles === true ? <Icon name="checkmark" /> : ''}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col span={6}>
                    <strong>Portugese</strong>
                </Col>
                <Col span={6} style={{ textAlign: 'center' }}>
                    {portugese.interface === true ? (
                        <Icon name="checkmark" />
                    ) : (
                        ''
                    )}
                </Col>
                <Col span={6} style={{ textAlign: 'center' }}>
                    {portugese.audio === true ? <Icon name="checkmark" /> : ''}
                </Col>
                <Col span={6} style={{ textAlign: 'center' }}>
                    {portugese.subtitles === true ? (
                        <Icon name="checkmark" />
                    ) : (
                        ''
                    )}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col span={6}>
                    <strong>Spanish</strong>
                </Col>
                <Col span={6} style={{ textAlign: 'center' }}>
                    {spanish.interface === true ? (
                        <Icon name="checkmark" />
                    ) : (
                        ''
                    )}
                </Col>
                <Col span={6} style={{ textAlign: 'center' }}>
                    {spanish.audio === true ? <Icon name="checkmark" /> : ''}
                </Col>
                <Col span={6} style={{ textAlign: 'center' }}>
                    {spanish.subtitles === true ? (
                        <Icon name="checkmark" />
                    ) : (
                        ''
                    )}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col span={6}>
                    <strong>Turkish</strong>
                </Col>
                <Col span={6} style={{ textAlign: 'center' }}>
                    {turkish.interface === true ? (
                        <Icon name="checkmark" />
                    ) : (
                        ''
                    )}
                </Col>
                <Col span={6} style={{ textAlign: 'center' }}>
                    {turkish.audio === true ? <Icon name="checkmark" /> : ''}
                </Col>
                <Col span={6} style={{ textAlign: 'center' }}>
                    {turkish.subtitles === true ? (
                        <Icon name="checkmark" />
                    ) : (
                        ''
                    )}
                </Col>
            </Row>
        </Card>
    );
}
export default TableLanguageInfo;
