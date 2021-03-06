import {categoriesApi} from "../../api/firebase-api";

const initialState={
    loading: true,
    categories: [] as Array<CategoryType>
}
export type CategoryType={
    id: string
    name: string
}
export type CategoriesReducerStateT=typeof initialState
const SET_CATEGORIES_INITIAL_INFO='categories/SET_CATEGORIES_INITIAL_INFO'
const categoriesReducer=(state=initialState, action:categoriesReducerActionTypes)=>{
    switch(action.type){
        case SET_CATEGORIES_INITIAL_INFO:{
            return {...state, loading: false, categories: action.payload}
        }
        default:
            return state
    }
}
type SetCategoriesActionType={
    type: typeof SET_CATEGORIES_INITIAL_INFO
    payload:Array<CategoryType>
}
const setCategoriesAction=(categories:Array<CategoryType>):SetCategoriesActionType=>({
    type: SET_CATEGORIES_INITIAL_INFO,
    payload: categories
})
export const getCategoriesThunk=()=>{
    return async  (dispatch:any)=>{
        const data= await categoriesApi.getCategories()
        dispatch(setCategoriesAction(data||[]))
    }
}
export const addNewCategoryThunk=(newBCategory:CategoryType)=>{
    return async (dispatch:any)=>{
        await categoriesApi.addNewCategory(newBCategory)
        dispatch(getCategoriesThunk())
    }
}
export const updateCategoryThunk=(newCategory:CategoryType)=>async(dispatch:any)=>{
    await categoriesApi.updateCategory(newCategory)
    dispatch(getCategoriesThunk())
}
export const deleteCategoryThunk=(categoryId:string)=>async(dispatch:any)=>{
    await categoriesApi.deleteCategory(categoryId)
    dispatch(getCategoriesThunk())
}

export type categoriesReducerActionTypes=SetCategoriesActionType
export default categoriesReducer
