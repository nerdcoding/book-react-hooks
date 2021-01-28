
export default function reducer(state, action) {
    switch (action.type) {
        case "FETCH_BOOKABLES_REQUEST":
            return {
                ...state,
                bookables: [],
                isLoading: true,
                error: false
            };
        case "FETCH_BOOKABLES_SUCCESS":
            return {
                ...state,
                bookables: action.payload,
                isLoading: false
            };
        case "FETCH_BOOKABLES_ERROR":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        case "SET_GROUP":
            return {
                ...state,
                group: action.payload,
                bookableIndex: 0
            };

        case "SET_BOOKABLE":
            return {
                ...state,
                bookableIndex: action.payload
            };

        case "NEXT_BOOKABLE":
            const bookablesCount = state.bookables
                .filter(
                    bookable => bookable.group === state.group
                ).length;
            return {
                ...state,
                bookableIndex: (state.bookableIndex + 1) % bookablesCount
            };

        default:
            return state;
    }
}
