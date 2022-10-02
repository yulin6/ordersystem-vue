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

    getCanteen = async credential => {
        try{
            let res = await axios({
                url: store.state.apiURL + '/canteen',
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