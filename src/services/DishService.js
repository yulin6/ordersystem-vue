import axios from "axios";
import store from "@/vuex/store";

export default class DishService {
    static myInstance = null;

    static getInstance() {
        if (DishService.myInstance == null) {
            DishService.myInstance =
                new DishService();
        }
        return this.myInstance;
    }

    getDishes = async canteenId => {
        try{
            let res = await axios({
                url: store.state.apiURL + '/dish/type_group',
                method: "GET",
                params: {
                    canteen_id: canteenId
                },
                headers: {
                    'content-type': 'application/json',
                    'token': localStorage.getItem('userToken')
                },
            })
            if(res.data.code === 200) {
                let localCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
                let previousSelected = {}
                localCart.forEach(item => {
                    if(item.selected !== 0) previousSelected[item.id] = item.selected//.push({id: item.id, selected: item.selected})
                })
                Object.entries(res.data.data).forEach(item => {
                    item[1].forEach(dish => {
                        if(dish.id in previousSelected) dish.selected = previousSelected[dish.id]
                        else dish.selected = 0
                    })
                })
            }
            return res.data;
        }
        catch(error){
            console.log(error)
        }
    }
}