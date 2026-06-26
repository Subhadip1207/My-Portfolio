import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const softwareApplicationSlice = createSlice({
    name: 'application',
    initialState: {
        loading: false,
        error: null,
        softwareApplications:[],
        message:null,
    },
    reducers: {
        getAllSoftwareApplicationsRequest(state,action){
            state.softwareApplications = [];
            state.error = null;
            state.loading = true;
        },
        getAllSoftwareApplicationsSuccess(state,action){
            state.softwareApplications = action.payload;
            state.error = null;
            state.loading = false;
        },
        getAllSoftwareApplicationsFailed(state,action){
            state.softwareApplications = state.softwareApplications;
            state.error = action.payload;
            state.loading = false;
        },
        addNewSoftwareApplicationRequest(state,action){
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        addNewsoftwareApplicationSuccess(state,action){
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        addNewSoftwareApplicationFailed(state,action){
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        deleteSoftwareApplicationRequest(state,action){
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        deletesoftwareApplicationSuccess(state,action){
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        deleteSoftwareApplicationFailed(state,action){
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        resetSoftwareApplicationSlice(state,action){
            state.error = null;
            state.softwareApplications = state.softwareApplications;
            state.message = null;
            state.loading = false;
        },
        clearAllErrors(state,action){
            state.error = null,
            state.softwareApplications = state.softwareApplications
        }
    }
})

export const getAllSoftwareApplications = () => async(dispatch) => {
    dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsRequest());
    try {
        const {data} = await axios.get("http://localhost:4000/api/v1/softwareapplication/getall",{withCredentials:true});
        dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsSuccess(data.softwareApplications));
        dispatch(softwareApplicationSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsFailed(errorMessage));
    }
}

export const addNewSoftwareApplication = (formData) => async(dispatch) => {
    dispatch(softwareApplicationSlice.actions.addNewSoftwareApplicationRequest());
    try {
        const {data} = await axios.post(`http://localhost:4000/api/v1/softwareapplication/add`, formData, {withCredentials:true, headers:{'Content-Type':'multipart/form-data'}});
        dispatch(softwareApplicationSlice.actions.addNewsoftwareApplicationSuccess(data.message));
        dispatch(softwareApplicationSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(softwareApplicationSlice.actions.addNewSoftwareApplicationFailed(errorMessage));
    }
}

export const deleteSoftwareApplication = (id) => async(dispatch) => {
    dispatch(softwareApplicationSlice.actions.deleteSoftwareApplicationRequest());
    try {
        const {data} = await axios.delete(`http://localhost:4000/api/v1/softwareapplication/delete/${id}`,{withCredentials:true});
        dispatch(softwareApplicationSlice.actions.deletesoftwareApplicationSuccess(data.message));
        dispatch(softwareApplicationSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(softwareApplicationSlice.actions.deleteSoftwareApplicationFailed(errorMessage));
    }
}

export const clearAllSoftwareApplicationsErrors = () => (dispatch) => {
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
}

export const resetSoftwareApplicationSlice = () => (dispatch) => {
    dispatch(softwareApplicationSlice.actions.resetSoftwareApplicationSlice());
}

export default softwareApplicationSlice.reducer;