import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        count:10
    },
    mutations:{
        costCount(state){
            state.count--;
        },
        setCount(state,num){
            state.count = num;
        }
    }
});
export default store;