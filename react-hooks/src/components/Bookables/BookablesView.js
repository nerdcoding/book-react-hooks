import React, {useReducer} from "react";
import BookablesDetails from "./BookablesDetails";
import reducer from "./BookablesListRecucer";
import BookablesList from "./BookablesList";

const initialState = {
    group: "Rooms",
    bookableIndex: 0,
    bookables: [],
    isLoading: true,
    error: false
}

export default function BookablesView() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const bookablesInGroup = state.bookables
        .filter(bookable => bookable.group === state.group);

    return (
        <>
            <BookablesList
                state={state}
                dispatch={dispatch}
            />
            <BookablesDetails
                selectedBookable={bookablesInGroup[state.bookableIndex]}
            />
        </>
    );
}