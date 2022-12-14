import axios from "axios";
import store from "@/vuex/store";

export default class UserService {
    static myInstance = null;

    static getInstance() {
        if (UserService.myInstance == null) {
            UserService.myInstance =
                new UserService();
        }
        return this.myInstance;
    }

    signIn = async credential => {
        try{
            let res = await axios({
                url: store.state.apiURL + '/user/login',
                method: "POST",
                data: JSON.stringify(credential),
                headers: {
                    'content-type': 'application/json',
                },
            })
            return res.data;
        }
        catch(error){
            console.log(error)
            this.$message.error(error)
        }
    }

    signUp = async signUpInfo => {
        try{
            let res = await axios({
                url: store.state.apiURL + '/user',
                method: "POST",
                data: JSON.stringify(signUpInfo),
                headers: {
                    'content-type': 'application/json',
                },
            })
            return res.data;
        }
        catch(error){
            console.log(error)
        }
    }

    joinOrQuitMember = async joinOrQuit => {
        try{
            let res = await axios({
                url: store.state.apiURL + '/user/customer',
                method: "PUT",
                data: JSON.stringify(joinOrQuit),
                headers: {
                    'content-type': 'application/json',
                    'token': localStorage.getItem('userToken')
                },
            })
            return res.data;
        }
        catch(error){
            console.log(error)
        }
    }



}