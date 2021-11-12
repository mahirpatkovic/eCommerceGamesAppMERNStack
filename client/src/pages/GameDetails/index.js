import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import {
    Segment,
    Button,
    Icon,
    Label,
    Embed,
    ButtonGroup,
    Dimmer,
} from 'semantic-ui-react';
import './style.css';
import ImageSlider from './ImageSlider';
import TableInfo from './TableInfo';
import TableLanguageInfo from './TableLanguageInfo';
import GameReqs from './GameReqs';
import CommentSection from './CommentSection';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Col, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';
import Service from '../../api/service';

function GameDetails() {
    const { gameId } = useParams();
    const [game, setGame] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [winMinimum, setWinMinimum] = useState([]);
    const [winRecommended, setWinRecommended] = useState([]);
    const [macMinimum, setMacMinimum] = useState([]);
    const [macRecommended, setMacRecommended] = useState([]);
    const [english, setEnglish] = useState([]);
    const [german, setGerman] = useState([]);
    const [portugese, setPortugese] = useState([]);
    const [spanish, setSpanish] = useState([]);
    const [turkish, setTurkish] = useState([]);
    const [gameQuantity, setGameQuantity] = useState(1);
    const dispatch = useDispatch();

    const isSmallDesktopSize = useMediaQuery({
        query: '(max-device-width: 1200px)',
    });
    const isTabletBiggerSize = useMediaQuery({
        query: '(max-device-width: 1024px)',
    });

    useEffect(() => {
        setIsLoading(true);
        Service.getGame(gameId)
            .then((res) => {
                setGame(res.data.game);
                setWinMinimum(res.data.game.windowsMinimumReqs[0]);
                setWinRecommended(res.data.game.windowsRecommendedReqs[0]);
                setMacMinimum(res.data.game.macMinimumReqs[0]);
                setMacRecommended(res.data.game.macRecommendedReqs[0]);
                setEnglish(res.data.game.languages.English);
                setGerman(res.data.game.languages.German);
                setPortugese(res.data.game.languages.Portugese);
                setSpanish(res.data.game.languages.Spanish);
                setTurkish(res.data.game.languages.Turkish);
                // console.log("game", {...gm, id: key});
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [gameId]);

    const addGameToCartHandler = ({ game, gameQuantity }) => {
        dispatch(cartActions.addToCart({ game, gameQuantity }));
    };

    return (
        <div style={{ display: 'flex' }}>
            {isLoading ? (
                <Dimmer active inverted>
                    <Loader
                        size="large"
                        style={{ marginTop: -100, position: 'fixed' }}
                    />
                </Dimmer>
            ) : (
                <div className="gameSinglePage">
                    <Row justify="center">
                        <Col
                            md={{ span: 22 }}
                            lg={{ span: 22 }}
                            xl={{ span: 15 }}
                            xxl={{ span: 12 }}
                        >
                            <ImageSlider images={game.images} />
                        </Col>
                        <Col
                            md={{ span: 22 }}
                            lg={{ span: 22 }}
                            xl={{ span: 7, offset: 1 }}
                            xxl={{ span: 6, offset: 1 }}
                            style={{ marginTop: isSmallDesktopSize ? 30 : 0 }}
                            sm={{ span: 22 }}
                            xs={{ span: 22 }}
                        >
                            <Row>
                                <Col>
                                    <Button
                                        as="div"
                                        labelPosition="right"
                                        onClick={() =>
                                            addGameToCartHandler({
                                                game: game,
                                                gameQuantity,
                                            })
                                        }
                                        disabled={
                                            game.quantity === 0 ? true : false
                                        }
                                    >
                                        <Button color="black">
                                            <Icon name="shop" />
                                        </Button>
                                        <Label
                                            as="a"
                                            basic
                                            color="black"
                                            pointing="left"
                                        >
                                            Add to cart
                                        </Label>
                                    </Button>
                                </Col>
                                <Col>
                                    <Label as="a" tag size="big">
                                        ${Number(game.price).toFixed(2)}
                                    </Label>
                                </Col>
                            </Row>
                            <Row>
                                <ButtonGroup size="small">
                                    <Button
                                        aria-label="reduce"
                                        onClick={() =>
                                            gameQuantity > 1 &&
                                            setGameQuantity(gameQuantity - 1)
                                        }
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </Button>
                                    <Button color="vk">{gameQuantity}</Button>
                                    <Button
                                        aria-label="increase"
                                        onClick={() =>
                                            game.quantity > gameQuantity &&
                                            setGameQuantity(gameQuantity + 1)
                                        }
                                    >
                                        <AddIcon fontSize="small" />
                                    </Button>
                                </ButtonGroup>
                            </Row>
                            <Row>
                                {game.quantity < 5 &&
                                    (game.quantity > 0 ? (
                                        <h4>
                                            Only {game.quantity} left in the
                                            stock. Hurry up!!!
                                        </h4>
                                    ) : (
                                        <h4>
                                            Out of the stock. Try another time,
                                            or contact us to get the game
                                        </h4>
                                    ))}
                            </Row>
                            <Segment>
                                <TableInfo game={game} />
                            </Segment>
                        </Col>
                    </Row>
                    <br />

                    <Row
                        style={{ marginTop: isTabletBiggerSize ? 30 : 0 }}
                        justify="center"
                    >
                        <Col
                            md={{ span: 22 }}
                            xl={{ span: 15 }}
                            xxl={{ span: 12 }}
                            lg={{ span: 22 }}
                            sm={{ span: 23 }}
                            xs={{ span: 23 }}
                        >
                            <Embed
                                autoplay={true}
                                id={game.trailer}
                                source="youtube"
                                iframe={{
                                    allowFullScreen: true,
                                    autoplay: true,
                                }}
                                className="gameTrailer"
                            />
                        </Col>
                        <Col
                            md={{ span: 22 }}
                            lg={{ span: 22 }}
                            xl={{ span: 7, offset: 1 }}
                            xxl={{ span: 6, offset: 1 }}
                            sm={{ span: 22 }}
                            xs={{ span: 23 }}
                            style={{ marginTop: isSmallDesktopSize ? 30 : 0 }}
                        >
                            <TableLanguageInfo
                                english={english}
                                german={german}
                                portugese={portugese}
                                spanish={spanish}
                                turkish={turkish}
                            />
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 30 }} justify="center">
                        <Col
                            xxl={{ span: 8, offset: 2 }}
                            xl={{ span: 11 }}
                            lg={{ span: 22 }}
                            md={{ span: 22 }}
                            sm={{ span: 23 }}
                            xs={{ span: 23 }}
                        >
                            <Segment>
                                <h4>System Requirements</h4>
                                <GameReqs
                                    winMinimum={winMinimum}
                                    winRecommended={winRecommended}
                                    macMinimum={macMinimum}
                                    macRecommended={macRecommended}
                                />
                            </Segment>
                        </Col>
                        <Col
                            xxl={{ span: 11, offset: 1 }}
                            xl={{ span: 11, offset: 1 }}
                            lg={{ span: 22 }}
                            md={{ span: 22 }}
                            sm={{ span: 23 }}
                            xs={{ span: 23 }}
                            style={{ marginTop: isSmallDesktopSize ? 30 : 0 }}
                        >
                            <CommentSection gameId={gameId} />
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
}

export default GameDetails;
