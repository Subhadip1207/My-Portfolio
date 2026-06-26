import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        loading: false,
        error: null,
        messages:[],
        message:null,
    },
    reducers: {
        getAllMessagesRequest(state,action){
            state.messages = [];
            state.error = null;
            state.loading = true;
        },
        getAllMessagesSuccess(state,action){
            state.messages = action.payload;
            state.error = null;
            state.loading = false;
        },
        getAllMessagesFailed(state,action){
            state.messages = state.messages;
            state.error = action.payload;
            state.loading = false;
        },
        deleteMessageRequest(state,action){
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        deleteMessageSuccess(state,action){
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        deleteMessageFailed(state,action){
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        resetMessageSlice(state,action){
            state.error = null;
            state.messages = state.messages;
            state.message = null;
            state.loading = false;
        },
        clearAllErrors(state,action){
            state.error = null,
            state.messages = state.messages
        }
    }
})

export const getAllMessages = () => async(dispatch) => {
    dispatch(messagesSlice.actions.getAllMessagesRequest());
    try {
        const {data} = await axios.get("https://my-portfolio-bckend.onrender.com/api/v1/message/getall",{withCredentials:true});
        dispatch(messagesSlice.actions.getAllMessagesSuccess(data.messages));
        dispatch(messagesSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(messagesSlice.actions.getAllMessagesFailed(errorMessage));
    }
}

export const deleteMessage = (id) => async(dispatch) => {
    dispatch(messagesSlice.actions.deleteMessageRequest());
    try {
        const {data} = await axios.delete(`https://my-portfolio-bckend.onrender.com/api/v1/message/delete/${id}`,{withCredentials:true});
        dispatch(messagesSlice.actions.deleteMessageSuccess(data.message));
        dispatch(messagesSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(messagesSlice.actions.deleteMessageFailed(errorMessage));
    }
}

export const clearAllMessagesErrors = () => (dispatch) => {
    dispatch(messagesSlice.actions.clearAllErrors());
}

export const resetMessageSlice = () => (dispatch) => {
    dispatch(messagesSlice.actions.resetMessageSlice());
}

export default messagesSlice.reducer;