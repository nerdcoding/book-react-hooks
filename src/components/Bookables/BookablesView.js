import React, {useState, useCallback} from "react";
import BookablesDetails from "./BookablesDetails";
import BookablesList from "./BookablesList";


export default function BookablesView() {
    const [bookable, setBookable] = useState();

    const updateBookable = useCallback(selected => {
        if (selected) {
            setBookable(selected);
        }
    }, []);

    return (
        <>
            <BookablesList
                selectedBookable={bookable}
                setSelectedBookable={updateBookable}
            />
            <BookablesDetails
                selectedBookable={bookable}
            />
        </>
    );
}