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

    getOrdersByUserId = async id => {
        try{
            let res = await axios({
                url: store.state.apiURL + '/order',
                method: "GET",
                params: {
                    user_id: id
                },
                headers: {
                    'content-type': 'application/json',
                    'token': localStorage.getItem('userToken')
                },
            })
            if(res.data.code === 200) {
                console.log(res.data.data)
                res.data.data.forEach(order => {
                    order.orderItems.forEach(item => {
                        item.name = item.dish.name
                    })
                })
                // Object.entries(res.data.data).forEach(item => {
                //     item[1].forEach(dish => {
                //         if(dish.id in previousSelected) dish.selected = previousSelected[dish.id]
                //         else dish.selected = 0
                //     })
                // })
            }
            return res.data;
        }
        catch(error){
            console.log(error)
        }
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