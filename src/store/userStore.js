import {makeAutoObservable, toJS} from "mobx";


class UserStore {

    userInfo = {
        name: ''
    };

    constructor() {
        makeAutoObservable(this)
    }

    setUserList(value) {
        let data = { name: value };
        this.userInfo = {...this.userInfo, ...data}

        try {
            window.api.sendData(toJS(this.userInfo))
        }catch(e) {
            throw new Error('Something went wrong')
        }
    }

}

let userStore = new UserStore();

export { userStore }