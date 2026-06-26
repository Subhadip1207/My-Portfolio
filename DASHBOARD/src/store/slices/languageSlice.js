import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const languageSlice = createSlice({
    name: 'language',
    initialState: {
        loading: false,
        error: null,
        languages:[],
        message:null,
    },
    reducers: {
        getAllLanguagesRequest(state,action){
            state.languages = [];
            state.error = null;
            state.loading = true;
        },
        getAllLanguagesSuccess(state,action){
            state.languages = action.payload;
            state.error = null;
            state.loading = false;
        },
        getAllLanguagesFailed(state,action){
            state.languages = state.languages;
            state.error = action.payload;
            state.loading = false;
        },
        addNewLanguageRequest(state,action){
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        addNewLanguageSuccess(state,action){
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        addNewLanguageFailed(state,action){
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        deleteLanguageRequest(state,action){
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        deleteLanguagesuccess(state,action){
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        deleteLanguageFailed(state,action){
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        updateLanguageRequest(state,action){
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        updateLanguagesuccess(state,action){
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        updateLanguageFailed(state,action){
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        resetLanguageSlice(state,action){
            state.error = null;
            state.languages = state.languages;
            state.message = null;
            state.loading = false;
        },
        clearAllErrors(state,action){
            state.error = null,
            state.languages = state.languages
        }
    }
})

export const getAllLanguages = () => async(dispatch) => {
    dispatch(languageSlice.actions.getAllLanguagesRequest());
    try {
        const {data} = await axios.get("https://my-portfolio-backend-krvn.onrender.com/api/v1/language/getall",{withCredentials:true});
        dispatch(languageSlice.actions.getAllLanguagesSuccess(data.languages));
        dispatch(languageSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(languageSlice.actions.getAllLanguagesFailed(errorMessage));
    }
}

export const addNewLanguage = (formData) => async(dispatch) => {
    dispatch(languageSlice.actions.addNewLanguageRequest());
    try {
        const {data} = await axios.post(`https://my-portfolio-backend-krvn.onrender.com/api/v1/language/add`, formData, {withCredentials:true, headers:{'Content-Type':'multipart/form-data'}});
        dispatch(languageSlice.actions.addNewLanguageSuccess(data.message));
        dispatch(languageSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(languageSlice.actions.addNewLanguageFailed(errorMessage));
    }
}

export const deleteLanguage = (id) => async(dispatch) => {
    dispatch(languageSlice.actions.deleteLanguageRequest());
    try {
        const {data} = await axios.delete(`https://my-portfolio-backend-krvn.onrender.com/api/v1/language/delete/${id}`,{withCredentials:true});
        dispatch(languageSlice.actions.deleteLanguagesuccess(data.message));
        dispatch(languageSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(languageSlice.actions.deleteLanguageFailed(errorMessage));
    }
}

export const updateLanguage = (id, proficiency) => async(dispatch) => {
    dispatch(languageSlice.actions.updateLanguageRequest());
    try {
        const {data} = await axios.put(`https://my-portfolio-backend-krvn.onrender.com/api/v1/language/update/${id}`, {proficiency}, {withCredentials:true, headers:{'Content-Type':'application/json'}});
        dispatch(languageSlice.actions.updateLanguagesuccess(data.message));
        dispatch(languageSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(languageSlice.actions.updateLanguageFailed(errorMessage));
    }
}

export const clearAllLanguagesErrors = () => (dispatch) => {
    dispatch(languageSlice.actions.clearAllErrors());
}

export const resetLanguageSlice = () => (dispatch) => {
    dispatch(languageSlice.actions.resetLanguageSlice());
}

export default languageSlice.reducer;