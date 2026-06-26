import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const timelineSlice = createSlice({
    name: 'timeline',
    initialState: {
        loading: false,
        error: null,
        timeLines:[],
        message:null,
    },
    reducers: {
        getAllTimelinesRequest(state,action){
            state.timeLines = [];
            state.error = null;
            state.loading = true;
        },
        getAllTimelinesSuccess(state,action){
            state.timeLines = action.payload;
            state.error = null;
            state.loading = false;
        },
        getAllTimelinesFailed(state,action){
            state.timeLines = state.timeLines;
            state.error = action.payload;
            state.loading = false;
        },
        addTimelineRequest(state,action){
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        addTimelinesuccess(state,action){
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        addTimelineFailed(state,action){
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        deleteTimelineRequest(state,action){
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        deleteTimelinesuccess(state,action){
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        deleteTimelineFailed(state,action){
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        resetTimelineslice(state,action){
            state.error = null;
            state.timeLines = state.timeLines;
            state.message = null;
            state.loading = false;
        },
        clearAllErrors(state,action){
            state.error = null,
            state.timeLines = state.timeLines
        }
    }
})

export const getAllTimelines = () => async(dispatch) => {
    dispatch(timelineSlice.actions.getAllTimelinesRequest());
    try {
        const {data} = await axios.get("http://localhost:4000/api/v1/timeline/getall",{withCredentials:true});
        dispatch(timelineSlice.actions.getAllTimelinesSuccess(data.timeLines));
        dispatch(timelineSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(timelineSlice.actions.getAllTimelinesFailed(errorMessage));
    }
}

export const addNewTimeline = (formData) => async(dispatch) => {
    dispatch(timelineSlice.actions.addTimelineRequest());
    try {
        const {data} = await axios.post(`http://localhost:4000/api/v1/timeline/add`, formData, {withCredentials:true, headers:{'Content-Type':'application/json'}});
        dispatch(timelineSlice.actions.addTimelinesuccess(data.message));
        dispatch(timelineSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(timelineSlice.actions.addTimelineFailed(errorMessage));
    }
}

export const deleteTimeline = (id) => async(dispatch) => {
    dispatch(timelineSlice.actions.deleteTimelineRequest());
    try {
        const {data} = await axios.delete(`http://localhost:4000/api/v1/timeline/delete/${id}`,{withCredentials:true});
        dispatch(timelineSlice.actions.deleteTimelinesuccess(data.message));
        dispatch(timelineSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(timelineSlice.actions.deleteTimelineFailed(errorMessage));
    }
}

export const clearAllTimelinesErrors = () => (dispatch) => {
    dispatch(timelineSlice.actions.clearAllErrors());
}

export const resetTimelineslice = () => (dispatch) => {
    dispatch(timelineSlice.actions.resetTimelineslice());
}

export default timelineSlice.reducer;