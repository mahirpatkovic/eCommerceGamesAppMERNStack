import React, { useEffect, useState, useRef } from 'react';
import {
    IconButton,
    Button,
    Menu,
    MenuItem,
    Badge,
    Grid,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import MenuDrawer from '../MenuDrawer';
import SettingsIcon from '@material-ui/icons/Settings';
import { NavLink, useHistory } from 'react-router-dom';

import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import PersonIcon from '@material-ui/icons/Person';
import logo from '../../assets/logo.png';
import logo2 from '../../assets/logo2.png';
import navBox from '../../assets/navBox.png';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LogoutModal from '../LogoutModal';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useMediaQuery } from 'react-responsive';
import ShoppingCartHoverModal from '../ShoppingCartHoverModal';
import { cartActions } from '../../store/cart';
import { Icon, Search } from 'semantic-ui-react';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(1),
        color: '#ffc107',
        '@media (max-width: 1024px)': {
            marginTop: '-2rem',
        },
        '@media (max-width: 540px)': {
            marginTop: '-3rem',
        },
    },
    settingsMenu: {
        color: 'black',
        backgroundColor: 'transparent',
        zIndex: 3,
        marginTop: '2rem',
        marginRight: '15rem',
        '&:hover': {
            backgroundColor: 'black',
            color: 'white',
        },
        '@media (min-width: 1024px) and (max-width: 1300px)': {
            marginRight: '2rem',
        },
        '@media (min-width: 1300px) and (max-width: 1500px)': {
            marginRight: '1rem',
        },
    },
    shoppingButton: {
        color: 'black',
        zIndex: 3,
        marginTop: '2rem',
        '&:hover': {
            backgroundColor: 'black',
            color: 'white',
        },
    },
    userButton: {
        backgroundColor: 'white',
        zIndex: 3,
        marginTop: '2rem',
        marginRight: '13rem',
        textTransform: 'none',
        fontSize: '14px',
        '@media (min-width: 1024px) and (max-width: 1350px)': {
            marginRight: '2rem',
        },
        '@media (min-width: 1430px) and (max-width: 1600px)': {
            marginRight: '5rem',
        },
        '@media (min-width: 1350px) and (max-width: 1430px)': {
            marginRight: '2rem',
        },
    },
    shoppingResponsive: {
        color: 'white',
        marginLeft: '10px',
        marginTop: '-2rem',
        '@media (max-width: 540px)': {
            marginTop: '-3rem',
        },
    },
    settingsResponsive: {
        color: 'white',
        marginLeft: '20px',
        marginRight: '-15px',
        marginTop: '-2rem',
        '@media (max-width: 540px)': {
            marginTop: '-3rem',
        },
    },
}));

function NavigationBar(props) {
    const classes = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
    // const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const [click, setClick] = useState(false);
    const [isShoppingCartModalVisible, setIsShoppingCartModalVisible] =
        useState(false);
    const [isSearcBarVisible, setIsSearchBarVisible] = useState(false);
    const [filteredGames, setFilteredGames] = useState([]);
    const [isIconLoading, setIsIconLoading] = useState(false);
    const games = useSelector((state) => state.games.games);
    const isUserLoggedIn = useSelector((state) => state.auth.isAuthenticated);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const cartGames = useSelector((state) => state.cart.addedGamesToCart);
    const isGameAlreadyInCart = useSelector(
        (state) => state.cart.gameAlreadyInCart
    );
    const isUserAdmin = useSelector((state) => state.auth.isUserAdmin);
    const history = useHistory();
    const dispatch = useDispatch();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1025px)',
    });
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const ref = useRef(null);
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsSearchBarVisible(false);
        }
    };
    const handleClick = () => {
        setClick(true);
    };
    // const handleClickGames = () => {
    //     if (isUserLoggedIn) {
    //         setClick(true);
    //     } else {
    //         history.push('/');
    //         setIsAlertVisible(true);
    //     }
    // }
    const openDrawerHandler = () => {
        setIsDrawerOpen(true);
    };

    const openMenuHandler = (event) => {
        setOpenMenu(event.currentTarget);
    };
    const closeDrawerHandler = () => {
        setIsDrawerOpen(false);
    };

    const closeMenuHandler = () => {
        setOpenMenu(null);
    };

    const openLoginModalHandler = () => {
        setIsLoginModalVisible(true);
    };

    const closeLoginModalHandler = () => {
        setIsLoginModalVisible(false);
        closeMenuHandler();
    };

    const openSignupModalHandler = () => {
        setIsSignupModalVisible(true);
    };

    const closeSignupModalHandler = () => {
        setIsSignupModalVisible(false);
        closeMenuHandler();
    };

    const openUserProfilePage = () => {
        history.push('/user-profile');
        closeMenuHandler();
    };
    // const handleCloseNotification = () => {
    //     setIsAlertVisible(false);
    // }

    const openLogoutModalHandler = () => {
        setIsLogoutModalVisible(true);
    };

    const closeLogoutModalHandler = () => {
        closeMenuHandler();
        setIsLogoutModalVisible(false);
    };

    const openShoppingCartHoverModal = () => {
        if (cartGames.length > 0) {
            setIsShoppingCartModalVisible(true);
        }
    };
    const closeShoppingCartHoverModal = () => {
        setIsShoppingCartModalVisible(false);
        if (cartGames.length === 0) {
            setIsShoppingCartModalVisible(false);
        }
    };

    const handleCloseGameAlreadyInCart = () => {
        dispatch(cartActions.isGameAlredyInCartHandleClose());
    };

    const handleLoaderShow = (isOpen) => {
        props.onLoad(isOpen);
    };

    const handleInputSearchChange = (event) => {
        let value = event.target.value.toLowerCase();
        let charValue = [];
        for (let i = 0; i < value.length; i++) {
            charValue.push(value[i]);
        }
        // const newCharValue = charValue.join('');
        // console.log('value', charValue, charValue.length)
        let result = [];
        let tmpGames = [];
        for (let gm of games) {
            gm = {
                id: gm._id,
                title: gm.name,
                image: gm.poster,
                price: '$' + gm.price.toFixed(2),
            };
            tmpGames.push(gm);
        }
        // console.log('modified', tmpGames)
        let gameValue = [];

        for (let gm of tmpGames) {
            const gmtmp = gm.title.toLowerCase().split('');
            gameValue.push(gmtmp);
        }
        for (let gm of gameValue) {
            if (
                JSON.stringify(gm.slice(0, charValue.length)) ===
                JSON.stringify(charValue)
            ) {
                const tmp = gm.join('');
                for (let tmpGm of tmpGames) {
                    if (tmpGm.title.toLowerCase() === tmp) {
                        result.push(tmpGm);
                    }
                }
            }
        }
        // console.log("result", result)
        setFilteredGames(result);
        setIsIconLoading(false);
    };

    const handleGameSelect = (e, value) => {
        history.push(`/games/${value.result.id}`);
        setIsSearchBarVisible(false);
    };

    return (
        <div className="navMaster">
            {isDesktopOrLaptop ? (
                <nav className="navbar">
                    <div className="navBox">
                        <img alt="navBox" src={navBox} />
                    </div>
                    {/* <Snackbar
                    open={isAlertVisible}
                    autoHideDuration={3000}
                    onClose={handleCloseNotification}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert
                        onClose={handleCloseNotification}
                        severity="warning"
                        style={{ marginTop: 50, backgroundColor: 'black' }}
                    >
                        Accessing Games Page only for users!
                        Please Register!
                    </Alert>
                </Snackbar> */}
                    {isGameAlreadyInCart && (
                        <Snackbar
                            open={isGameAlreadyInCart}
                            autoHideDuration={3000}
                            onClose={handleCloseGameAlreadyInCart}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Alert
                                onClose={handleCloseGameAlreadyInCart}
                                severity="warning"
                                style={{
                                    marginTop: 50,
                                    backgroundColor: 'black',
                                }}
                            >
                                Game is already added to the cart! Cart Updated.
                            </Alert>
                        </Snackbar>
                    )}
                    <div className="nav-container">
                        <NavLink exact to="/" className="nav-logo">
                            <img
                                alt="logo2"
                                src={logo2}
                                className="nav-logo2"
                            />
                            <img alt="logo" src={logo} className="nav-logo" />
                        </NavLink>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className="nav-item">
                                <NavLink
                                    exact
                                    to="/"
                                    activeClassName="active"
                                    className="nav-links"
                                    onClick={handleClick}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <p
                                    className="nav-links"
                                    onClick={() =>
                                        window.scrollTo({
                                            top: document.documentElement
                                                .scrollHeight,
                                            behavior: 'smooth',
                                        })
                                    }
                                >
                                    About
                                </p>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    exact
                                    to="/games"
                                    activeClassName="active"
                                    className="nav-links"
                                    onClick={handleClick}
                                >
                                    Games
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <p
                                    className="nav-links"
                                    onClick={() =>
                                        window.scrollTo({
                                            top: document.documentElement
                                                .scrollHeight,
                                            behavior: 'smooth',
                                        })
                                    }
                                >
                                    Contact
                                </p>
                            </li>
                            {isUserLoggedIn && isUserAdmin && (
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        to="/admin"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleClick}
                                    >
                                        Admin
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                        {!isSearcBarVisible && (
                            <Icon
                                name="search"
                                color="black"
                                className="searchIcon"
                                onClick={() => setIsSearchBarVisible(true)}
                            />
                        )}
                        <div ref={ref}>
                            <Grid>
                                {isSearcBarVisible && (
                                    <Search
                                        style={{ zIndex: 5, marginTop: '2rem' }}
                                        loading={isIconLoading}
                                        size="small"
                                        onSearchChange={handleInputSearchChange}
                                        results={filteredGames}
                                        onResultSelect={(e, data) =>
                                            handleGameSelect(e, data)
                                        }
                                        className="searchBar"
                                    />
                                )}
                            </Grid>
                        </div>
                        <Button
                            className={classes.shoppingButton}
                            onClick={openShoppingCartHoverModal}
                        >
                            <Badge
                                color="secondary"
                                badgeContent={cartGames.length}
                            >
                                <ShoppingCartIcon />
                            </Badge>
                        </Button>
                        {isUserLoggedIn && currentUser && (
                            <div>
                                <Button
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    variant="contained"
                                    onClick={openMenuHandler}
                                    className={classes.userButton}
                                >
                                    {currentUser.username}
                                    <img
                                        src={
                                            currentUser.photo
                                                ? publicFolder +
                                                  `users/${currentUser.photo}`
                                                : publicFolder +
                                                  `users/noAvatar.jpg`
                                        }
                                        alt="user profile"
                                        style={{
                                            width: 25,
                                            marginRight: -5,
                                            marginLeft: 5,
                                            borderRadius: 50,
                                        }}
                                    />
                                </Button>
                            </div>
                        )}
                        {!isUserLoggedIn && (
                            <div>
                                <Button
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={openMenuHandler}
                                    className={classes.settingsMenu}
                                >
                                    <SettingsIcon />
                                </Button>
                            </div>
                        )}
                        <Menu
                            id="simple-menu"
                            anchorEl={openMenu}
                            keepMounted
                            open={Boolean(openMenu)}
                            onClose={closeMenuHandler}
                        >
                            {isUserLoggedIn ? (
                                <div>
                                    <MenuItem onClick={openUserProfilePage}>
                                        My Profile
                                    </MenuItem>
                                    <MenuItem onClick={openLogoutModalHandler}>
                                        Logout
                                    </MenuItem>
                                </div>
                            ) : (
                                <div>
                                    <MenuItem onClick={openLoginModalHandler}>
                                        LogIn
                                    </MenuItem>
                                    <MenuItem onClick={openSignupModalHandler}>
                                        SignUp
                                    </MenuItem>
                                </div>
                            )}
                        </Menu>
                    </div>
                </nav>
            ) : (
                <nav className="navbar">
                    {!isDrawerOpen && (
                        <div className="nav-container">
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer"
                                onClick={openDrawerHandler}
                            >
                                <MenuIcon />
                            </IconButton>
                            <NavLink exact to="/" className="nav-logo">
                                <img
                                    alt="logo2"
                                    src={logo2}
                                    className="nav-logo2"
                                />
                                <img
                                    alt="logo"
                                    src={logo}
                                    className="nav-logo"
                                />
                            </NavLink>
                            {!isSearcBarVisible && (
                                <Icon
                                    name="search"
                                    color="white"
                                    className="searchIcon"
                                    onClick={() => setIsSearchBarVisible(true)}
                                />
                            )}
                            <div ref={ref}>
                                <Grid>
                                    {isSearcBarVisible && (
                                        <Search
                                            style={{
                                                zIndex: 5,
                                                marginTop: '-2rem',
                                                width: '100px',
                                            }}
                                            loading={isIconLoading}
                                            size="mini"
                                            onSearchChange={
                                                handleInputSearchChange
                                            }
                                            results={filteredGames}
                                            onResultSelect={(e, data) =>
                                                handleGameSelect(e, data)
                                            }
                                            className="searchBar"
                                        />
                                    )}
                                </Grid>
                            </div>
                            <Badge
                                color="secondary"
                                className={classes.shoppingResponsive}
                                badgeContent={cartGames.length}
                            >
                                <ShoppingCartIcon
                                    onClick={openShoppingCartHoverModal}
                                />
                            </Badge>

                            {isUserLoggedIn && currentUser ? (
                                <PersonIcon
                                    onClick={openMenuHandler}
                                    className={classes.settingsResponsive}
                                />
                            ) : (
                                <SettingsIcon
                                    onClick={openMenuHandler}
                                    className={classes.settingsResponsive}
                                />
                            )}
                            <Menu
                                id="simple-menu"
                                anchorEl={openMenu}
                                keepMounted
                                open={Boolean(openMenu)}
                                onClose={closeMenuHandler}
                            >
                                {isUserLoggedIn ? (
                                    <div>
                                        <MenuItem onClick={openUserProfilePage}>
                                            My Profile
                                        </MenuItem>
                                        <MenuItem
                                            onClick={openLogoutModalHandler}
                                        >
                                            Logout
                                        </MenuItem>
                                    </div>
                                ) : (
                                    <div>
                                        <MenuItem
                                            onClick={openLoginModalHandler}
                                        >
                                            LogIn
                                        </MenuItem>
                                        <MenuItem
                                            onClick={openSignupModalHandler}
                                        >
                                            SignUp
                                        </MenuItem>
                                    </div>
                                )}
                            </Menu>
                        </div>
                    )}
                </nav>
            )}
            <MenuDrawer visible={isDrawerOpen} onClose={closeDrawerHandler} />
            {isLoginModalVisible && (
                <LoginModal
                    visible={isLoginModalVisible}
                    onClose={closeLoginModalHandler}
                    onLoad={handleLoaderShow}
                />
            )}
            {isSignupModalVisible && (
                <SignupModal
                    visible={isSignupModalVisible}
                    onClose={closeSignupModalHandler}
                    onLoad={handleLoaderShow}
                />
            )}
            {isLogoutModalVisible && (
                <LogoutModal
                    visible={isLogoutModalVisible}
                    onClose={closeLogoutModalHandler}
                    onLoad={handleLoaderShow}
                />
            )}
            {isShoppingCartModalVisible && (
                <ShoppingCartHoverModal
                    visible={isShoppingCartModalVisible}
                    onClose={closeShoppingCartHoverModal}
                />
            )}
        </div>
    );
}
export default NavigationBar;
