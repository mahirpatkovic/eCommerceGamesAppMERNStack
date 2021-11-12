import React, { useState, useEffect } from 'react';
import { Accordion, Header, Table, Icon } from 'semantic-ui-react';

function GameReqs(props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [winMinimum, setWinMinimum] = useState([]);
    const [winRecommended, setWinRecommended] = useState([]);
    const [macMinimum, setMacMinimum] = useState([]);
    const [macRecommended, setMacRecommended] = useState([]);
    useEffect(() => {
        setWinMinimum(props.winMinimum);
        setWinRecommended(props.winRecommended);
        setMacMinimum(props.macMinimum);
        setMacRecommended(props.macRecommended);
    }, [
        props.winMinimum,
        props.winRecommended,
        props.macMinimum,
        props.macRecommended,
    ]);

    const windowsRequirements = (
        <Table basic="very" celled collapsing>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell rowSpan="2">
                        System Requirements
                    </Table.HeaderCell>
                    <Table.HeaderCell rowSpan="2">Minimum</Table.HeaderCell>
                    <Table.HeaderCell rowSpan="2">Recommended</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        <Header as="h5">
                            <Header.Content>OS</Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>{winMinimum && winMinimum.os}</Table.Cell>
                    <Table.Cell>
                        {winRecommended && winRecommended.os}
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        <Header as="h5">
                            <Header.Content>CPU</Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>
                        {winMinimum && winMinimum.processor}
                    </Table.Cell>
                    <Table.Cell>
                        {winRecommended && winRecommended.processor}
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        <Header as="h5">
                            <Header.Content>Memory</Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>
                        {winMinimum && winMinimum.memory} RAM
                    </Table.Cell>
                    <Table.Cell>
                        {winRecommended && winRecommended.memory} RAM
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        <Header as="h5">
                            <Header.Content>Graphics</Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>{winMinimum && winMinimum.graphics}</Table.Cell>
                    <Table.Cell>
                        {winRecommended && winRecommended.graphics}
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        <Header as="h4">
                            <Header.Content>Storage</Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>{winMinimum && winMinimum.storage}</Table.Cell>
                    <Table.Cell>
                        {winRecommended && winRecommended.storage}
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );

    const macRequirements = (
        <Table basic="very" celled collapsing>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell rowSpan="2">
                        System Requirements
                    </Table.HeaderCell>
                    <Table.HeaderCell rowSpan="2">Minimum</Table.HeaderCell>
                    <Table.HeaderCell rowSpan="2">Recommended</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        <Header as="h5">
                            <Header.Content>OS</Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>{macMinimum && macMinimum.os}</Table.Cell>
                    <Table.Cell>
                        {macRecommended && macRecommended.os}
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        <Header as="h5">
                            <Header.Content>CPU</Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>
                        {macMinimum && macMinimum.processor}
                    </Table.Cell>
                    <Table.Cell>
                        {macRecommended && macRecommended.processor}
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        <Header as="h5">
                            <Header.Content>Memory</Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>
                        {macMinimum && macMinimum.memory} RAM
                    </Table.Cell>
                    <Table.Cell>
                        {macRecommended && macRecommended.memory} RAM
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        <Header as="h5">
                            <Header.Content>Graphics</Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>{macMinimum && macMinimum.graphics}</Table.Cell>
                    <Table.Cell>
                        {macRecommended && macRecommended.graphics}
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        <Header as="h4">
                            <Header.Content>Storage</Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>{macMinimum && macMinimum.storage}</Table.Cell>
                    <Table.Cell>
                        {macRecommended && macRecommended.storage}
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );

    const handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const newIndex = activeIndex === index ? -1 : index;

        setActiveIndex(newIndex);
    };

    return (
        <div>
            <Accordion styled style={{ width: '100%' }}>
                <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={handleClick}
                >
                    <Icon name="dropdown" />
                    Windows Requirements
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    {windowsRequirements}
                </Accordion.Content>
                <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    onClick={handleClick}
                >
                    <Icon name="dropdown" />
                    Mac OS Requirements
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                    {macRequirements}
                </Accordion.Content>
            </Accordion>
        </div>
    );
}
export default GameReqs;
