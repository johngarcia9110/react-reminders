import { ADD_REMINDER, DELETE_REMINDER } from '../constants';


export const addReminder = (text) => {
    const action = {
        type : ADD_REMINDER,
        text
    }
    console.log('action', action);
    return action;
}

export const deleteReminder = (id) => {
    const action = {
        type : DELETE_REMINDER,
        id
    }
    console.log('deleting in actions: ', action);
    return action;
}