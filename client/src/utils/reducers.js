import {
    UPDATE_QUESTION, 
    UPDATE_ID,
    QUESTION,
    SET_QUESTION,
    USER_RESPONSE,
    SET_USER_RESPONSE
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_QUESTION:
            return {
                ...state
                questions: [...action, questions],
            };
        case UPDATE_ID:
            
            return {
                  ...state
                  question_id: [...action, question._id],
                };    
    }
}