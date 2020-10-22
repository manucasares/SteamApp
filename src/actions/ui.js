const { types } = require("../types/types");


export const setErrorMsg = (errorMsg) => ({
    type: types.uiSetError,
    payload: errorMsg
})

export const removeErrorMsg = () => ({
    type: types.uiRemoveError,
})

export const startLoading  = () => ({
    type: types.uiStartLoading
})

export const finishLoading  = () => ({
    type: types.uiFinishLoading
})