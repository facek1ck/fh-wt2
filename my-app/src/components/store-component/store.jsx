import {observable, decorate} from 'mobx';

export default class StoreClass {
   @observable user;
   @observable counter;
   @observable viewState = "login";
   @observable online = false;
}

