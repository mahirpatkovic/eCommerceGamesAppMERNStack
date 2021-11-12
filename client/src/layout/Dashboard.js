import React, { useEffect, useState } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

import Home from '../pages/Home/index';
import About from '../pages/About';
import UserProfile from '../pages/UserProfile/index';
import Games from '../pages/GamesPage/index';
import { useDispatch, useSelector } from 'react-redux';
import GameDetails from '../pages/GameDetails/index';
import Contact from '../pages/Contact';
import Checkout from '../pages/Checkout/index';
import { gamesActions } from '../store/games';
import AdminPage from '../pages/AdminPage/index';
import Footer from '../components/Footer';
import logoToTop from '../assets/logo2.png';
import './style.css';
import Loader from '../components/Loader/index';
import { Icon, Dimmer } from 'semantic-ui-react';
import Service from '../api/service';
import PasswordReset from '../pages/PasswordReset';

function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [isBackTopButtonVisible, setIsBackTopButtonVisible] = useState(false);
    const isUserLoggedIn = useSelector((state) => state.auth.isAuthenticated);
    const cartGames = useSelector((state) => state.cart.addedGamesToCart);
    const isUserAdmin = useSelector((state) => state.auth.isUserAdmin);
    const dispatch = useDispatch();
    useEffect(() => {
        setIsLoading(true);
        const fetchAllGames = async () => {
            await Service.getAllGames()
                .then((res) => {
                    // let transformedData = [];
                    // let tempData = {};
                    // for (let key in res.data) {
                    //     tempData = { ...res.data[key], id: key };
                    //     transformedData.push(tempData);
                    // }+
                    dispatch(gamesActions.fetchGames(res.data.games));
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                });
        };

        fetchAllGames();
    }, [dispatch]);

    const handleLoaderShow = (isOpen) => {
        setIsLoading(isOpen);
    };
    const toTopButtonVisibleHandler = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setIsBackTopButtonVisible(true);
        } else if (scrolled <= 300) {
            setIsBackTopButtonVisible(false);
        }
    };

    const scrollToTopHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    window.addEventListener('scroll', toTopButtonVisibleHandler);

    return (
        <div className="pageContainer">
            <Router>
                {!isLoading && <NavigationBar onLoad={handleLoaderShow} />}

                {isLoading === true ? (
                    <Dimmer active inverted>
                        <Loader
                            size="large"
                            style={{ marginTop: -100, position: 'fixed' }}
                        />
                    </Dimmer>
                ) : (
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/about" exact>
                            <About />
                        </Route>
                        <Route path="/user-profile" exact>
                            {!isUserLoggedIn ? (
                                <Redirect to="/" />
                            ) : (
                                <UserProfile />
                            )}
                        </Route>
                        <Route path="/contact" exact>
                            <Contact />
                        </Route>
                        <Route path="/checkout" exact>
                            {cartGames.length > 0 ? <Checkout /> : <Home />}
                        </Route>
                        <Route path="/games" exact>
                            <Games />
                        </Route>
                        <Route path="/admin" exact>
                            {isUserLoggedIn && isUserAdmin ? (
                                <AdminPage />
                            ) : (
                                <Home />
                            )}
                        </Route>
                        <Route path="/games/:gameId" exact>
                            <GameDetails />
                        </Route>
                        <Route path="/resetPassword/:resetToken" exact>
                            {!isUserLoggedIn ? (
                                <PasswordReset />
                            ) : (
                                <Redirect to="/" />
                            )}
                        </Route>
                        <Route path="*" exact>
                            <Redirect from="*" to="/" />
                        </Route>
                    </Switch>
                )}
                {!isLoading && <Footer />}
                {isBackTopButtonVisible && (
                    <div className="backToTopBtn" onClick={scrollToTopHandler}>
                        <img src={logoToTop} alt="MsGames" />
                        <Icon name="chevron circle up" color="yellow" />
                    </div>
                )}
            </Router>
        </div>
    );
}

export default Dashboard;
