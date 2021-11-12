const ENVIRONMENTS = {
    local: {
        apiBase: 'http://127.0.0.1:8800/api',
    },
    dev: {
        apiBase: 'https://msgames.herokuapp.com/api',
    },
};

const ENV = ENVIRONMENTS[process.env.REACT_APP_ENV];

export default ENV;
