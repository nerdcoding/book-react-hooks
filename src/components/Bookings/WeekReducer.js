import {getWeek} from "../utils/DateUtils";

export default function reducer(state, action) {
    switch (action.type) {
        case "NEXT_WEEK":
            return getWeek(state.date, 7);
        case "PREV_WEEK":
            return getWeek(state.date, -7);
        case "TODAY":
            return getWeek(new Date());
        case "SET_DATE":
            return getWeek(action.payload);
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}