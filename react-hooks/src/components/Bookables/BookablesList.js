import React, {useReducer, useEffect} from 'react';

import {FaArrowRight, FaSpinner} from 'react-icons/all';

import {days, sessions} from '../../static.json';
import reducer from './BookablesListRecucer';
import axios from "axios";

const initialState = {
    group: "Rooms",
    bookableIndex: 0,
    showDetails: false,
    bookables: [],
    isLoading: true,
    error: false
}

export default function BookablesList() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {group, bookables, bookableIndex, showDetails} = state;
    const {isLoading, error} = state;

    const groups = [...new Set(bookables.map(bookable => bookable.group))]
    const bookablesInGroup = bookables.filter(bookable => bookable.group === group);
    const selectedBookable = bookablesInGroup[bookableIndex];

    useEffect(() => {
        dispatch({
            type: 'FETCH_BOOKABLES_REQUEST'
        });
        axios.get("http://localhost:3001/bookables")
            .then(response => {
                dispatch({
                    type: 'FETCH_BOOKABLES_SUCCESS',
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: 'FETCH_BOOKABLES_ERROR',
                    payload: error
                });
            });
    }, []);

    if (error) {
        return <p>{error.message}</p>
    }
    if (isLoading) {
        return <p><FaSpinner className="icon-loading" /> Loading bookables... </p>
    }

    return (
        <>
            <div>
                <select
                    value={group}
                    onChange={e => dispatch({
                        type: "SET_GROUP",
                        payload: e.target.value
                    })}
                >
                    {groups.map(g => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>

                <ul className="bookables items-list-nav">
                    {bookablesInGroup
                        .map((b, i) =>(
                            <li key={b.id} className={i === bookableIndex ? "selected" : null}>
                                <button
                                    className="btn"
                                    onClick={() => dispatch({
                                        type: "SET_BOOKABLE",
                                        payload: i
                                    })}>
                                        {b.title}
                                </button>
                            </li>
                        ))
                    }
                </ul>

                <p>
                    <button
                        className="btn"
                        onClick={() => dispatch({
                            type: "NEXT_BOOKABLE"
                        })}
                        autoFocus>
                        <FaArrowRight />
                        <span>next</span>
                    </button>
                </p>
            </div>

            {selectedBookable && (
                <div className="bookable-details">
                    <div className="item">
                        <div className="item-header">
                            <h2>
                                {selectedBookable.title}
                            </h2>
                            <span className="controls">
                                <label>
                                    <input type="checkbox"
                                           checked={showDetails}
                                           onChange={() => dispatch({
                                               type: "TOGGLE_SHOW_DETAILS"
                                           })}
                                    />
                                    Show Details
                                </label>
                            </span>
                        </div>

                        <p>{selectedBookable.notes}</p>

                        {showDetails && (
                            <div className="item-details">
                                <h3>Availability</h3>
                                <div className="bookable-availability">
                                    <ul>
                                        {selectedBookable.days
                                            .sort()
                                            .map(day => <li key={day}>{days[day]}</li>)
                                        }
                                    </ul>
                                    <ul>
                                        {selectedBookable.sessions
                                            .sort()
                                            .map(session => <li key={session}>{sessions[session]}</li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}


        </>
    );
}