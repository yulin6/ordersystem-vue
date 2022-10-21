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

    addCanteen = async newCanteenDetail => {
        try {
            let res = await axios({
                url: store.state.apiURL + '/canteen',
                method: "POST",
                data: JSON.stringify(newCanteenDetail),
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

    updateCanteen = async (newCanteenDetail, canteenId) => {
        try {
            let res = await axios({
                url: store.state.apiURL + '/canteen/' + JSON.stringify(canteenId),
                method: "PUT",
                data: JSON.stringify(newCanteenDetail),
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

    uploadImage = async (canteenId, formData) => {
        try {
            let res = await axios({
                url: store.state.apiURL + '/canteen/image',
                method: "POST",
                params: {canteen_id: canteenId},
                data: formData,
                headers: {
                    'content-type': 'multipart/form-data',
                    'token': localStorage.getItem('userToken')
                },
            })
            console.log(res.data)
            return res.data;
        }
        catch (error) {
            console.log(error)
        }
    }

    getImage = async (canteenId) => {
        try {
            let res = await axios({
                url: store.state.apiURL + '/canteen/image',
                method: "GET",
                params: {canteen_id: canteenId},
                headers: {
                    'content-type': 'application/json',
                    'token': localStorage.getItem('userToken')
                },
                responseType: "blob"
            })
            return URL.createObjectURL(new Blob([res.data], { type: "image/png" }));
        }
        catch (error) {
            // console.log(error.response.status)
            if(error.response.status === 404) {
                return require('../assets/foodiesRestaurant.png')
            }
        }
    }

}