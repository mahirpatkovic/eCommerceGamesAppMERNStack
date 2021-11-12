import React, { useState } from 'react';
import {
    Form,
    Button,
    Modal,
    Input,
    Label,
    Accordion,
    Grid,
    Divider,
    Icon,
} from 'semantic-ui-react';

import { Checkbox, notification } from 'antd';
import Service from '../../../../api/service';
import { useDispatch } from 'react-redux';
import { gamesActions } from '../../../../store/games';

function AddGameModal(props) {
    const [gameDetails, setGameDetails] = useState({
        name: '',
        title: '',
        description: '',
        genre: '',
        developer: '',
        modes: '',
        platform: '',
        publisher: '',
        poster: '',
        price: 0,
        releaseDate: '',
        quantity: 0,
        trailer: '',
    });
    const [activeIndex, setActiveIndex] = useState(-1);
    const [sliderImages, setSliderImages] = useState([]);
    const [englishValues, setEnglishValues] = useState({
        audio: 'no',
        interface: 'no',
        subtitles: 'no',
    });

    const [germanValues, setGermanValues] = useState({
        audio: 'no',
        interface: 'no',
        subtitles: 'no',
    });
    const [portugeseValues, setPortugeseValues] = useState({
        audio: 'no',
        interface: 'no',
        subtitles: 'no',
    });
    const [spanishValues, setSpanishValues] = useState({
        audio: 'no',
        interface: 'no',
        subtitles: 'no',
    });
    const [turkishValues, setTurkishValues] = useState({
        audio: 'no',
        interface: 'no',
        subtitles: 'no',
    });

    const [winMinimum, setWinMinimum] = useState({
        processor: '',
        os: '',
        memory: '',
        graphics: '',
        storage: '',
    });

    const [winRecommended, setWinRecommended] = useState({
        processor: '',
        os: '',
        memory: '',
        graphics: '',
        storage: '',
    });

    const [macMinimum, setMacMinimum] = useState({
        processor: '',
        os: '',
        memory: '',
        graphics: '',
        storage: '',
    });

    const [macRecommended, setMacRecommended] = useState({
        processor: '',
        os: '',
        memory: '',
        graphics: '',
        storage: '',
    });

    const languageOptions = ['Audio', 'Interface', 'Subtitles'];
    const dispatch = useDispatch();
    const inputChangeHandler = (e) => {
        const { id, value } = e.target;
        if (id === 'price' || id === 'quantity') {
            setGameDetails({ ...gameDetails, [id]: Number(value) });
        } else {
            setGameDetails({ ...gameDetails, [id]: value });
        }
    };

    const inputChangeSliderImagesHandler = (e) => {
        // const { id, value } = e.target;
        setSliderImages((prevState) => {
            return [...prevState, e.target.value];
        });
    };

    const inputCheckboxEnglishHandler = (values) => {
        for (let value of values) {
            switch (value) {
                case 'Audio':
                    setEnglishValues({ ...englishValues, audio: 'yes' });
                    break;
                case 'Interface':
                    setEnglishValues({ ...englishValues, interface: 'yes' });
                    break;
                case 'Subtitles':
                    setEnglishValues({ ...englishValues, subtitles: 'yes' });
                    break;
                default:
                    break;
            }
        }
    };

    const inputCheckboxGermanHandler = (values) => {
        for (let value of values) {
            switch (value) {
                case 'Audio':
                    setGermanValues({ ...germanValues, audio: 'yes' });
                    break;
                case 'Interface':
                    setGermanValues({ ...germanValues, interface: 'yes' });
                    break;
                case 'Subtitles':
                    setGermanValues({ ...germanValues, subtitles: 'yes' });
                    break;
                default:
                    break;
            }
        }
    };

    const inputCheckboxPortugeseHandler = (values) => {
        for (let value of values) {
            switch (value) {
                case 'Audio':
                    setPortugeseValues({ ...portugeseValues, audio: 'yes' });
                    break;
                case 'Interface':
                    setPortugeseValues({
                        ...portugeseValues,
                        interface: 'yes',
                    });
                    break;
                case 'Subtitles':
                    setPortugeseValues({
                        ...portugeseValues,
                        subtitles: 'yes',
                    });
                    break;
                default:
                    break;
            }
        }
    };

    const inputCheckboxSpanishHandler = (values) => {
        for (let value of values) {
            switch (value) {
                case 'Audio':
                    setSpanishValues({ ...spanishValues, audio: 'yes' });
                    break;
                case 'Interface':
                    setSpanishValues({ ...spanishValues, interface: 'yes' });
                    break;
                case 'Subtitles':
                    setSpanishValues({ ...spanishValues, subtitles: 'yes' });
                    break;
                default:
                    break;
            }
        }
    };

    const inputCheckboxTurkishHandler = (values) => {
        for (let value of values) {
            switch (value) {
                case 'Audio':
                    setTurkishValues({ ...turkishValues, audio: 'yes' });
                    break;
                case 'Interface':
                    setTurkishValues({ ...turkishValues, interface: 'yes' });
                    break;
                case 'Subtitles':
                    setTurkishValues({ ...turkishValues, subtitles: 'yes' });
                    break;
                default:
                    break;
            }
        }
    };

    const inputChangeWinMinimumHandler = (e) => {
        const { id, value } = e.target;
        setWinMinimum({ ...winMinimum, [id]: value });
    };

    const inputChangeWinRecommendedHandler = (e) => {
        const { id, value } = e.target;
        setWinRecommended({ ...winRecommended, [id]: value });
    };

    const inputChangeMacMinimumHandler = (e) => {
        const { id, value } = e.target;
        setMacMinimum({ ...macMinimum, [id]: value });
    };

    const inputChangeMacRecommendedHandler = (e) => {
        const { id, value } = e.target;
        setMacRecommended({ ...macRecommended, [id]: value });
    };
    const addGameHandler = () => {
        const allGameDetails = {
            ...gameDetails,
            images: sliderImages,
            languages: {
                English: englishValues,
                German: germanValues,
                Portugese: portugeseValues,
                Spanish: spanishValues,
                Turkish: turkishValues,
            },
            macMinimumReqs: macMinimum,
            macRecommendedReqs: macRecommended,
            windowsMinimumReqs: winMinimum,
            windowsRecommendedReqs: winRecommended,
        };
        // console.log(allGameDetails);

        Service.addGame(allGameDetails)
            .then((res) => {
                notification.open({
                    message: `New Game Added`,
                    icon: <Icon name="check circle outline" />,
                });
                dispatch(gamesActions.addNewGame(res.data.newGame));
            })
            .catch((err) => {
                console.error(err);
            });

        props.onClose(allGameDetails, true);
    };

    const onClickOpenAccordion = (e, titleProps) => {
        const { index } = titleProps;
        const newIndex = activeIndex === index ? -1 : index;
        setActiveIndex(newIndex);
    };

    return (
        <Modal
            centered={false}
            open={props.visible}
            onClose={props.onClose}
            onOpen={props.visible}
            style={{
                height: 'auto',
                top: 'auto',
                left: 'auto',
                bottom: 'auto',
                right: 'auto',
            }}
        >
            <Modal.Header>Add Game Modal</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Game Name</label>
                            <input
                                id="name"
                                placeholder="Game Name"
                                onChange={inputChangeHandler}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Game Title</label>
                            <input
                                id="title"
                                placeholder="Game Title"
                                onChange={inputChangeHandler}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Description</label>
                            <input
                                id="description"
                                placeholder="Description"
                                onChange={inputChangeHandler}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Genre</label>
                            <input
                                id="genre"
                                placeholder="Genre"
                                onChange={inputChangeHandler}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Developer</label>
                            <input
                                id="developer"
                                placeholder="Developer"
                                onChange={inputChangeHandler}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Modes</label>
                            <input
                                id="modes"
                                placeholder="Modes"
                                onChange={inputChangeHandler}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Platform</label>
                            <input
                                id="platform"
                                placeholder="Platform"
                                onChange={inputChangeHandler}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Publisher</label>
                            <input
                                id="publisher"
                                placeholder="Publisher"
                                onChange={inputChangeHandler}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Poster</label>
                            <input
                                id="poster"
                                placeholder="Poster"
                                onChange={inputChangeHandler}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Price</label>
                            <Input
                                labelPosition="right"
                                placeholder="Price"
                                style={{ width: '100%' }}
                            >
                                <Label basic>$</Label>
                                <input
                                    id="price"
                                    type="number"
                                    onChange={inputChangeHandler}
                                />
                            </Input>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Release Date</label>
                            <input
                                id="releaseDate"
                                placeholder="Release Date"
                                onChange={inputChangeHandler}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Quantity</label>
                            <input
                                id="quantity"
                                placeholder="Quantity"
                                onChange={inputChangeHandler}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <label>Trailer</label>
                        <input
                            id="trailer"
                            placeholder="Trailer"
                            onChange={inputChangeHandler}
                        />
                    </Form.Field>
                </Form>
                <Accordion styled style={{ marginTop: 20, width: '100%' }}>
                    <Accordion.Title
                        content="Add Images Slider"
                        active={activeIndex === 0}
                        index={0}
                        onClick={onClickOpenAccordion}
                    />
                    <Accordion.Content active={activeIndex === 0}>
                        <Form>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <label>Image1</label>
                                    <input
                                        id="img0"
                                        placeholder="Image1"
                                        onChange={
                                            inputChangeSliderImagesHandler
                                        }
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Image2</label>
                                    <input
                                        id="img1"
                                        placeholder="Image2"
                                        onChange={
                                            inputChangeSliderImagesHandler
                                        }
                                    />
                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths="equal">
                                <Form.Field>
                                    <label>Image3</label>
                                    <input
                                        id="img2"
                                        placeholder="Image3"
                                        onChange={
                                            inputChangeSliderImagesHandler
                                        }
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Image4</label>
                                    <input
                                        id="img3"
                                        placeholder="Image4"
                                        onChange={
                                            inputChangeSliderImagesHandler
                                        }
                                    />
                                </Form.Field>
                            </Form.Group>
                        </Form>
                    </Accordion.Content>

                    <Accordion.Title
                        content="Add Language Information"
                        active={activeIndex === 1}
                        index={1}
                        onClick={onClickOpenAccordion}
                    />
                    <Accordion.Content active={activeIndex === 1}>
                        <Grid doubling columns={5}>
                            <Grid.Column>
                                <strong>English</strong>
                                <br />
                                <Checkbox.Group
                                    options={languageOptions}
                                    onChange={inputCheckboxEnglishHandler}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <strong>German</strong>
                                <br />
                                <Checkbox.Group
                                    options={languageOptions}
                                    onChange={inputCheckboxGermanHandler}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <strong>Portugese</strong>
                                <br />
                                <Checkbox.Group
                                    options={languageOptions}
                                    onChange={inputCheckboxPortugeseHandler}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <strong>Spanish</strong>
                                <br />
                                <Checkbox.Group
                                    options={languageOptions}
                                    onChange={inputCheckboxSpanishHandler}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <strong>Turkish</strong>
                                <br />
                                <Checkbox.Group
                                    options={languageOptions}
                                    onChange={inputCheckboxTurkishHandler}
                                />
                            </Grid.Column>
                        </Grid>
                    </Accordion.Content>
                    <Accordion.Title
                        content="Add Game Requirements"
                        active={activeIndex === 2}
                        index={2}
                        onClick={onClickOpenAccordion}
                    />
                    <Accordion.Content active={activeIndex === 2}>
                        <br />
                        <Grid doubling columns={2}>
                            <strong>Windows Requirements</strong>
                            <br />
                            <Grid.Column style={{ marginLeft: -180 }}>
                                <br />
                                <strong>Minimum:</strong>
                                <Form>
                                    <Form.Field>
                                        <label>OS</label>
                                        <input
                                            id="os"
                                            placeholder="OS"
                                            onChange={
                                                inputChangeWinMinimumHandler
                                            }
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>CPU</label>
                                        <input
                                            id="processor"
                                            placeholder="CPU"
                                            onChange={
                                                inputChangeWinMinimumHandler
                                            }
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Memory</label>
                                        <input
                                            id="memory"
                                            placeholder="Memory"
                                            onChange={
                                                inputChangeWinMinimumHandler
                                            }
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Graphics</label>
                                        <input
                                            id="graphics"
                                            placeholder="Graphics"
                                            onChange={
                                                inputChangeWinMinimumHandler
                                            }
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Storage</label>
                                        <input
                                            id="storage"
                                            placeholder="Storage"
                                            onChange={
                                                inputChangeWinMinimumHandler
                                            }
                                        />
                                    </Form.Field>
                                </Form>
                            </Grid.Column>
                            <Grid.Column>
                                <br />
                                <strong>Recommended:</strong>
                                <Form>
                                    <Form.Field>
                                        <label>OS</label>
                                        <input
                                            id="os"
                                            placeholder="OS"
                                            onChange={
                                                inputChangeWinRecommendedHandler
                                            }
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>CPU</label>
                                        <input
                                            id="processor"
                                            placeholder="CPU"
                                            onChange={
                                                inputChangeWinRecommendedHandler
                                            }
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Memory</label>
                                        <input
                                            id="memory"
                                            placeholder="Memory"
                                            onChange={
                                                inputChangeWinRecommendedHandler
                                            }
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Graphics</label>
                                        <input
                                            id="graphics"
                                            placeholder="Graphics"
                                            onChange={
                                                inputChangeWinRecommendedHandler
                                            }
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Storage</label>
                                        <input
                                            id="storage"
                                            placeholder="Storage"
                                            onChange={
                                                inputChangeWinRecommendedHandler
                                            }
                                        />
                                    </Form.Field>
                                </Form>
                            </Grid.Column>
                        </Grid>
                        <Divider />
                        <br />

                        <Grid doubling columns={2}>
                            <strong>Mac OS Requirements</strong>
                            <br />
                            <Grid.Column style={{ marginLeft: -170 }}>
                                <br />
                                <strong>Minimum:</strong>
                                <Form>
                                    <Form.Field>
                                        <label>OS</label>
                                        <input
                                            id="os"
                                            placeholder="OS"
                                            onChange={
                                                inputChangeMacMinimumHandler
                                            }
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>CPU</label>
                                        <input
                                            id="processor"
                                            placeholder="CPU"
                                            onChange={
                                                inputChangeMacMinimumHandler
                                            }
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Memory</label>
                                        <input
                                            id="memory"
                                            placeholder="Memory"
                                            onChange={
                                                inputChangeMacMinimumHandler
                                            }
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Graphics</label>
                                        <input
                                            id="graphics"
                                            placeholder="Graphics"
                                            onChange={
                                                inputChangeMacMinimumHandler
                                            }
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Storage</label>
                                        <input
                                            id="storage"
                                            placeholder="Storage"
                                            onChange={
                                                inputChangeMacMinimumHandler
                                            }
                                        />
                                    </Form.Field>
                                </Form>
                            </Grid.Column>
                            <Grid.Column>
                                <br />
                                <strong>Recommended:</strong>
                                <Form>
                                    <Form.Field>
                                        <label>OS</label>
                                        <input
                                            id="os"
                                            placeholder="OS"
                                            onChange={
                                                inputChangeMacRecommendedHandler
                                            }
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>CPU</label>
                                        <input
                                            id="processor"
                                            placeholder="CPU"
                                            onChange={
                                                inputChangeMacRecommendedHandler
                                            }
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Memory</label>
                                        <input
                                            id="memory"
                                            placeholder="Memory"
                                            onChange={
                                                inputChangeMacRecommendedHandler
                                            }
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Graphics</label>
                                        <input
                                            id="graphics"
                                            placeholder="Graphics"
                                            onChange={
                                                inputChangeMacRecommendedHandler
                                            }
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Storage</label>
                                        <input
                                            id="storage"
                                            placeholder="Storage"
                                            onChange={
                                                inputChangeMacRecommendedHandler
                                            }
                                        />
                                    </Form.Field>
                                </Form>
                            </Grid.Column>
                        </Grid>
                    </Accordion.Content>
                </Accordion>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={props.onClose}>
                    Close
                </Button>
                <Button
                    content="Add Game"
                    labelPosition="right"
                    icon="checkmark"
                    positive
                    onClick={addGameHandler}
                />
            </Modal.Actions>
        </Modal>
    );
}

export default AddGameModal;
