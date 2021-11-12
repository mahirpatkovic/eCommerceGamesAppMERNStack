import React, { Fragment, useEffect, useState } from 'react';
import Dashboard from './layout/Dashboard';

import { useDispatch } from 'react-redux';
import { authActions } from './store/auth';
import Loader from './components/Loader';
import Cookies from 'js-cookie';
import Service from './api/service';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        const token = Cookies.get('jwt');
        const isUserLoggedIn = async () => {
            if (token) {
                await Service.userAuthenticated()
                    .then((res) => {
                        dispatch(authActions.login());
                        dispatch(authActions.setUser(res.data.currentUser));
                        if (
                            res.data.currentUser.role === 'admin' ||
                            res.data.currentUser.role === 'superadmin'
                        ) {
                            dispatch(authActions.setIsUserAdmin());
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };

        isUserLoggedIn();
        setIsLoading(false);
    }, [dispatch]);
    return <Fragment>{isLoading ? <Loader /> : <Dashboard />}</Fragment>;
}

export default App;
