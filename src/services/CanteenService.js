import axios from "axios";
import store from "@/vuex/store";

export default class CanteenService {
    static myInstance = null;

    static getInstance() {
        if (CanteenService.myInstance == null) {
            CanteenService.myInstance =
                new CanteenService();
        }
        return this.myInstance;
    }

    getAllCanteens = async () => {
        try{
            console.log(localStorage.getItem('userToken'))
            let res = await axios({
                url: store.state.apiURL + '/canteen',
                method: "GET",
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