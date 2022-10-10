import axios from "axios";
import store from "@/vuex/store";

export default class OrderService {
    static myInstance = null;

    static getInstance() {
        if (OrderService.myInstance == null) {
            OrderService.myInstance =
                new OrderService();
        }
        return this.myInstance;
    }

    placeOrder = async orderDetail => {
        try{
            let res = await axios({
                url: store.state.apiURL + '/order',
                method: "POST",
                data: JSON.stringify(orderDetail),
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