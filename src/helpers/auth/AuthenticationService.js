import api, { AUTH_HEADER_TOKEN } from '../Api';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

class AuthenticationService {

    isUserAuthenticated() {
        return this.getAuthenticatedUser() === null ? false : true;
    }

    getAuthenticatedUser() {
        return sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    executeAuthentication(username, password) {
        return api({
                method: 'POST',
                url: 'login',
                data: { username, password }
            });
    }

    registerSuccessfulLogin(username, accessToken) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        sessionStorage.setItem(AUTH_HEADER_TOKEN, this.createJwt(accessToken));
    }

    createJwt(accessToken) {
        return 'Bearer ' + accessToken;
    }

    executeLogout() {
        sessionStorage.clear();
    }
}

export default new AuthenticationService();
