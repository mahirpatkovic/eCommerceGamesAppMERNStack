import axios from 'axios';
import ENV from '../util/env-config';
import Cookies from 'js-cookie';

class Service {
    static reqConfig() {
        return {
            headers: {
                authorization: `Bearer ${Cookies.get('jwt')}`,
            },
        };
    }
    static login(reqData) {
        return axios.post(
            ENV.apiBase + '/users/login',
            reqData,
            this.reqConfig()
        );
    }

    static signup(reqData) {
        return axios.post(
            ENV.apiBase + '/users/signup',
            reqData,
            this.reqConfig()
        );
    }
    static userAuthenticated(reqData) {
        return axios.post(
            ENV.apiBase + '/users/auth',
            reqData,
            this.reqConfig()
        );
    }

    static forgotPassword(reqData) {
        return axios.post(
            ENV.apiBase + '/users/forgotPassword',
            reqData,
            this.reqConfig()
        );
    }

    static resetPassword(reqData) {
        return axios.patch(
            ENV.apiBase + '/users/resetPassword/' + reqData.resetToken,
            reqData.passwordValues,
            this.reqConfig()
        );
    }

    static updatePassword(reqData) {
        return axios.patch(
            ENV.apiBase + '/users/updatePassword/',
            reqData,
            this.reqConfig()
        );
    }

    static updateCurrentUser(reqData) {
        return axios.patch(
            ENV.apiBase + '/users/updateCurrentUser/',
            reqData,
            this.reqConfig()
        );
    }

    static uploadUserPhoto(reqData) {
        return axios.patch(
            ENV.apiBase + '/users/uploadUserPhoto/',
            reqData,
            this.reqConfig()
        );
    }

    static getAllGames() {
        return axios.get(ENV.apiBase + '/games/', this.reqConfig());
    }
    static getGame(reqData) {
        return axios.get(ENV.apiBase + '/games/' + reqData, this.reqConfig());
    }

    static createContactMessage(reqData) {
        return axios.post(ENV.apiBase + '/contact/', reqData, this.reqConfig());
    }

    static createDiscountCode(reqData) {
        return axios.post(
            ENV.apiBase + '/discountCode/',
            reqData,
            this.reqConfig()
        );
    }

    static getAllDiscountCodes() {
        return axios.get(ENV.apiBase + '/discountCode/', this.reqConfig());
    }

    static deleteDiscountCode(reqData) {
        return axios.patch(
            ENV.apiBase + '/discountCode/useDiscountCode/',
            reqData,
            this.reqConfig()
        );
    }

    static getAllUsers() {
        return axios.get(ENV.apiBase + '/users/', this.reqConfig());
    }

    static addUserAsAdmin(reqData) {
        return axios.patch(
            ENV.apiBase + '/users/addUserAsAdmin',
            reqData,
            this.reqConfig()
        );
    }

    static removeUserAsAdmin(reqData) {
        return axios.patch(
            ENV.apiBase + '/users/removeUserAsAdmin',
            reqData,
            this.reqConfig()
        );
    }

    static getAllContactDetails() {
        return axios.get(ENV.apiBase + '/contact/', this.reqConfig());
    }

    static contactMessageOpened(reqData) {
        return axios.patch(
            ENV.apiBase + '/contact/messageOpened',
            reqData,
            this.reqConfig()
        );
    }

    static addGame(reqData) {
        return axios.post(ENV.apiBase + '/games/', reqData, this.reqConfig());
    }

    static updateGame(reqData) {
        return axios.patch(
            ENV.apiBase + '/games/updateGame',
            reqData,
            this.reqConfig()
        );
    }

    static deleteGame(reqData) {
        return axios.delete(
            ENV.apiBase + '/games/' + reqData,
            this.reqConfig()
        );
    }

    static addComment(reqData) {
        return axios.post(
            ENV.apiBase + '/comments/',
            reqData,
            this.reqConfig()
        );
    }

    static getAllComments(reqData) {
        return axios.get(
            ENV.apiBase + '/comments/' + reqData,
            this.reqConfig()
        );
    }

    static createPayment(reqData) {
        return axios.post(ENV.apiBase + '/payment/', reqData, this.reqConfig());
    }
}

export default Service;
