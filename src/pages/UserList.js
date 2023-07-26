import { useState } from "react";
import {observer} from "mobx-react";
import {userStore} from "../store/userStore";

const UserList = observer(() => {

    const [val, setValue] = useState('')


    const valHandler = (e) => {
        setValue(e.target.value)
    }

    const sendUser = () => {
        userStore.setUserList(val)
        setValue('');
    }

    const inquiryData = () => {
        userStore.getUserData();
    }

    return (
        <div className='user_ipt'>
            <div className='ipt_box'>
                <input
                    type='text'
                    value={val}
                    onChange={(e) => {
                        valHandler(e)
                    }}
                />
            </div>
            <div className='btn_box'>
                <button
                    type='button'
                    onClick={() => {
                        sendUser()
                    }}
                >전송</button>
            </div>
            <div className='btn_box'>
                {/*<span>{}</span>*/}
                <button
                    type='button'
                    onClick={() => {
                        inquiryData()
                    }}
                >조회</button>
            </div>
        </div>
    )

})

export default UserList;