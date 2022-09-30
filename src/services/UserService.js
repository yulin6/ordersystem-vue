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
        }
    }



}