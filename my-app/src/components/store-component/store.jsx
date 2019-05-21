import { observable, decorate } from "mobx";

export default class StoreClass {
  @observable user;
  @observable counter;
  @observable viewState = "login";
  @observable online;
  @observable quiz;
  @observable result;
  @observable newUList;
}
