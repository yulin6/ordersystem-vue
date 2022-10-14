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
        try {
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
            return res.data;
        }
        catch (error) {
            console.log(error)
        }
    }

    addDish = async newDishDetail => {
        try {
            let res = await axios({
                url: store.state.apiURL + '/dish',
                method: "POST",
                data: JSON.stringify(newDishDetail),
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

    updateDish = async dishDetail => {
        try {
            let res = await axios({
                url: store.state.apiURL + '/dish',
                method: "PUT",
                data: JSON.stringify(dishDetail),
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

    deleteDish = async dishIndex => {
        try {
            let res = await axios({
                url: store.state.apiURL + '/dish/' + dishIndex,
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

}