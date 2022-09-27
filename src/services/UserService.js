import axios from "axios";
import {apiURL} from "@/vuex/getters";

export default class UserService {
    static myInstance = null;

    static getInstance() {
        if (UserService.myInstance == null) {
            UserService.myInstance =
                new UserService();
        }
        return this.myInstance;
    }

    signIn = credential =>{
        axios.post(apiURL + '/user', credential)
            .then(response => {
                return response
            })
    }
}