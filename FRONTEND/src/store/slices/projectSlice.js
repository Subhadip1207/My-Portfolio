import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        loading: false,
        error: null,
        projects:[],
        message:null,
    },
    reducers: {
        getAllProjectsRequest(state,action){
            state.projects = [];
            state.error = null;
            state.loading = true;
        },
        getAllProjectsSuccess(state,action){
            state.projects = action.payload;
            state.error = null;
            state.loading = false;
        },
        getAllProjectsFailed(state,action){
            state.projects = state.projects;
            state.error = action.payload;
            state.loading = false;
        },
        addNewProjectRequest(state,action){
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        addNewProjectSuccess(state,action){
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        addNewProjectFailed(state,action){
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        deleteProjectRequest(state,action){
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        deleteProjectSuccess(state,action){
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        deleteProjectFailed(state,action){
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        updateProjectRequest(state,action){
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        updateProjectSuccess(state,action){
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        updateProjectFailed(state,action){
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        resetProjectSlice(state,action){
            state.error = null;
            state.projects = state.projects;
            state.message = null;
            state.loading = false;
        },
        clearAllErrors(state,action){
            state.error = null,
            state.projects = state.projects
        }
    }
})

export const getAllProjects = () => async(dispatch) => {
    dispatch(projectSlice.actions.getAllProjectsRequest());
    try {
        const {data} = await axios.get("https://my-portfolio-backend-krvn.onrender.com/api/v1/project/getall",{withCredentials:true});
        dispatch(projectSlice.actions.getAllProjectsSuccess(data.projects));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(projectSlice.actions.getAllProjectsFailed(errorMessage));
    }
}

export const addNewProject = (formData) => async(dispatch) => {
    dispatch(projectSlice.actions.addNewProjectRequest());
    try {
        const {data} = await axios.post(`https://my-portfolio-backend-krvn.onrender.com/api/v1/project/add`, formData, {withCredentials:true, headers:{'Content-Type':'multipart/form-data'}});
        dispatch(projectSlice.actions.addNewProjectSuccess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(projectSlice.actions.addNewProjectFailed(errorMessage));
    }
}

export const deleteProject = (id) => async(dispatch) => {
    dispatch(projectSlice.actions.deleteProjectRequest());
    try {
        const {data} = await axios.delete(`https://my-portfolio-backend-krvn.onrender.com/api/v1/project/delete/${id}`,{withCredentials:true});
        dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(projectSlice.actions.deleteProjectFailed(errorMessage));
    }
}

export const updateProject = (id,newData) => async(dispatch) => {
    dispatch(projectSlice.actions.updateProjectRequest());
    try {
        const {data} = await axios.put(`https://my-portfolio-backend-krvn.onrender.com/api/v1/project/update/${id}`, newData, {withCredentials:true , headers:{"Content-Type":"multipart/form-data"}});
        dispatch(projectSlice.actions.updateProjectSuccess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(projectSlice.actions.updateProjectFailed(errorMessage));
    }
}

export const clearAllProjectsErrors = () => (dispatch) => {
    dispatch(projectSlice.actions.clearAllErrors());
}

export const resetProjectSlice = () => (dispatch) => {
    dispatch(projectSlice.actions.resetProjectSlice());
}

export default projectSlice.reducer;