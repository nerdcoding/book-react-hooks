import React, {useReducer} from 'react';
import reducer from "./WeekReducer";
import {getWeek} from "../utils/DateUtils";
import {FaCalendarDay, FaChevronLeft, FaChevronRight} from "react-icons/all";

export default function WeekPicker({date}) {
    const [week, dispatch] = useReducer(reducer, date, getWeek);

    return (
        <div>
            <p className="date-picker">
                <button
                    className="btn"
                    onClick={() => dispatch({type: "PREV_WEEK"})}>
                    <FaChevronLeft />
                    <span>Prev</span>
                </button>

                <button
                    className="btn"
                    onClick={() => dispatch({type: "TODAY"})}>
                    <FaCalendarDay />
                    <span>Today</span>
                </button>

                <button
                    className="btn"
                    onClick={() => dispatch({type: "NEXT_WEEK"})}>
                    <FaChevronRight />
                    <span>Next</span>
                </button>
            </p>
            <p>
                {week.start.toDateString()} - {week.end.toDateString()}
            </p>
        </div>
    );
}