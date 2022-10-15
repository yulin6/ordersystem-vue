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
        try {
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
        catch (error) {
            console.log(error)
        }
    }

    deleteCanteen = async indexList => {
        try {
            let res = await axios({
                url: store.state.apiURL + '/canteen/' + JSON.stringify(indexList),
                method: "DELETE",
                headers: {
                    'content-type': 'application/json',
                    'token': localStorage.getItem('userToken')
                },
            })
            return res.data;
        }
        catch (error) {
            console.log(error)
        }
    }

    getCanteensByUserId = async (userId) => {
        try {
            let res = await axios({
                url: store.state.apiURL + '/canteen',
                params: { user_id: userId },
                method: "GET",
                headers: {
                    'content-type': 'application/json',
                    'token': localStorage.getItem('userToken')
                },
            })
            return res.data;
        }
        catch (error) {
            console.log(error)
        }
    }
    
    getAllCanteenTypes = async () => {
        try {
            let res = await axios({
                url: store.state.apiURL + '/canteen/type',
                method: "GET",
                headers: {
                    'content-type': 'application/json',
                    'token': localStorage.getItem('userToken')
                },
            })
            return res.data;
        }
        catch (error) {
            console.log(error)
        }
    }
}