import {createSlice} from "@reduxjs/toolkit";
import {MoneyType} from "../../model/moneyType";

const initialState: MoneyType[] = [
    {id: 1, type: 'income', title: 'حقوق', price: '1200'},
    {id: 2, type: 'income', title: 'هدیه', price: '1200'},
    {id: 3, type: 'expense', title: 'خرید گوشت', price: '1200'},
    {id: 4, type: 'expense', title: 'خرید کتاب', price: '1200'},
]

export const MoneySlice = createSlice({
    name: 'money',
    initialState,
    reducers: {
        addMoney: (state,action) => {
            //payload => {id:1,...}
            state.push(action.payload)
        }
    }
})

export const {addMoney} = MoneySlice.actions

export default MoneySlice.reducer