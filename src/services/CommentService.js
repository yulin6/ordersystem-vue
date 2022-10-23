import axios from "axios";
import store from "@/vuex/store";

export default class CommentService {
    static myInstance = null;

    static getInstance() {
        if (CommentService.myInstance == null) {
            CommentService.myInstance =
                new CommentService();
        }
        return this.myInstance;
    }

    getRatingByCanteenId = async id => {
        try{
            let res = await axios({
                url: store.state.apiURL + '/comment',
                method: "GET",
                params: {
                    canteen_id: id
                },
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

    getRatingByOrderId = async id => {
        try{
            let res = await axios({
                url: store.state.apiURL + '/comment',
                method: "GET",
                params: {
                    order_id: id
                },
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

    rateOrder = async rating => {
        try{
            let res = await axios({
                url: store.state.apiURL + '/comment',
                method: "POST",
                data: JSON.stringify(rating),
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