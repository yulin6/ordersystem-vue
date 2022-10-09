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
                Object.entries(res.data.data).forEach(item => {
                    item[1].forEach(dish => dish.selected = 0)
                })
            }
            return res.data;
        }
        catch(error){
            console.log(error)
        }
    }
}