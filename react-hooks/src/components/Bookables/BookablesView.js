import React, {useState} from "react";
import BookablesDetails from "./BookablesDetails";
import BookablesList from "./BookablesList";


export default function BookablesView() {
    const [bookable, setBookable] = useState();

    return (
        <>
            <BookablesList
                selectedBookable={bookable}
                setSelectedBookable={setBookable}
            />
            <BookablesDetails
                selectedBookable={bookable}
            />
        </>
    );
}