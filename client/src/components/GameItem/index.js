import React from 'react';
import { Link } from 'react-router-dom';

import { Icon, Card, Image } from 'semantic-ui-react';
import './style.css';

function GameItem(props) {
    const game = props.game;
    return (
        <div style={{ marginLeft: 10, marginRight: 10, marginTop: 50 }}>
            <Card key={game.id} className='card' style={{ width: 300 }}>
                <div className='game'>
                    <Image src={game.poster} wrapped style={{ width: 300 }} />
                    <div className='gameOverlay'></div>
                    <div className='gameTextOverlay'>
                        <p className='p0'>{game.title}</p>
                        <p className='p1'>{game.description}</p>
                    </div>
                </div>
                <Card.Content>
                    <Link
                        to={`/games/${game._id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <Card.Header>
                            <h3>{game.name}</h3>
                        </Card.Header>
                    </Link>
                    <Card.Meta>
                        <div>
                            <span>
                                <Icon name='tv' /> {game.platform}
                            </span>
                        </div>
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <span style={{ float: 'left' }}>
                        <Icon name='tags' /> {game.genre}
                    </span>
                    <span style={{ float: 'right' }}>
                        <Icon name='dollar' /> {game.price.toFixed(2)}
                    </span>
                </Card.Content>
            </Card>
        </div>
    );
}

export default GameItem;
