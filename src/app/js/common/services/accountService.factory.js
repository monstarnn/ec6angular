import api from './accountApi.factory.js';

class AccountService {
    login(){
        return api.login();
    }
    signup(){
        return api.signup();
    }
}

export {AccountService}