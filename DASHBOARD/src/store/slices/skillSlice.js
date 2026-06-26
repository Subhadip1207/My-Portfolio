import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const skillSlice = createSlice({
    name: 'skill',
    initialState: {
        loading: false,
        error: null,
        skills:[],
        message:null,
    },
    reducers: {
        getAllSkillsRequest(state,action){
            state.skills = [];
            state.error = null;
            state.loading = true;
        },
        getAllSkillsSuccess(state,action){
            state.skills = action.payload;
            state.error = null;
            state.loading = false;
        },
        getAllSkillsFailed(state,action){
            state.skills = state.skills;
            state.error = action.payload;
            state.loading = false;
        },
        addNewSkillRequest(state,action){
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        addNewSkillSuccess(state,action){
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        addNewSkillFailed(state,action){
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        deleteSkillRequest(state,action){
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        deleteSkillsuccess(state,action){
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        deleteSkillFailed(state,action){
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        updateSkillRequest(state,action){
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        updateSkillsuccess(state,action){
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        updateSkillFailed(state,action){
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        resetSkillSlice(state,action){
            state.error = null;
            state.skills = state.skills;
            state.message = null;
            state.loading = false;
        },
        clearAllErrors(state,action){
            state.error = null,
            state.skills = state.skills
        }
    }
})

export const getAllskills = () => async(dispatch) => {
    dispatch(skillSlice.actions.getAllSkillsRequest());
    try {
        const {data} = await axios.get("https://my-portfolio-bckend.onrender.com/api/v1/skill/getall",{withCredentials:true});
        dispatch(skillSlice.actions.getAllSkillsSuccess(data.skills));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(skillSlice.actions.getAllSkillsFailed(errorMessage));
    }
}

export const addNewSkill = (formData) => async(dispatch) => {
    dispatch(skillSlice.actions.addNewSkillRequest());
    try {
        const {data} = await axios.post(`https://my-portfolio-bckend.onrender.com/api/v1/skill/add`, formData, {withCredentials:true, headers:{'Content-Type':'multipart/form-data'}});
        dispatch(skillSlice.actions.addNewSkillSuccess(data.message));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(skillSlice.actions.addNewSkillFailed(errorMessage));
    }
}

export const deleteSkill = (id) => async(dispatch) => {
    dispatch(skillSlice.actions.deleteSkillRequest());
    try {
        const {data} = await axios.delete(`https://my-portfolio-bckend.onrender.com/api/v1/skill/delete/${id}`,{withCredentials:true});
        dispatch(skillSlice.actions.deleteSkillsuccess(data.message));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(skillSlice.actions.deleteSkillFailed(errorMessage));
    }
}

export const updateSkill = (id, proficiency) => async(dispatch) => {
    dispatch(skillSlice.actions.updateSkillRequest());
    try {
        const {data} = await axios.put(`https://my-portfolio-bckend.onrender.com/api/v1/skill/update/${id}`, {proficiency}, {withCredentials:true, headers:{'Content-Type':'application/json'}});
        dispatch(skillSlice.actions.updateSkillsuccess(data.message));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(skillSlice.actions.updateSkillFailed(errorMessage));
    }
}

export const clearAllSkillsErrors = () => (dispatch) => {
    dispatch(skillSlice.actions.clearAllErrors());
}

export const resetSkillSlice = () => (dispatch) => {
    dispatch(skillSlice.actions.resetSkillSlice());
}

export default skillSlice.reducer;