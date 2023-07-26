import {makeAutoObservable, toJS} from "mobx";


class UserStore {

    userInfo = {
        name: ''
    };
    val = '';

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

    async getUserData() {
        if(!this.userInfo['name'].length) return;
        this.val = await window.api.getData()

        return this.val;
    }

}

let userStore = new UserStore();

export { userStore }