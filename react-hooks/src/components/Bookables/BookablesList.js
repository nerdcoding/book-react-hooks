import React, {useReducer} from 'react';

import {FaArrowRight} from 'react-icons/all';

import {bookables, days, sessions} from '../../static.json';
import reducer from './BookablesListRecucer';

const initialState = {
    group: "Rooms",
    bookableIndex: 0,
    showDetails: false,
    bookables
}

export default function BookablesList() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {group, bookableIndex, showDetails, bookables} = state;

    const groups = [...new Set(bookables.map(bookable => bookable.group))]
    const bookablesInGroup = bookables.filter(bookable => bookable.group === group);
    const selectedBookable = bookablesInGroup[bookableIndex];


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