import React, {useState} from 'react';

import {bookables, days, sessions} from '../../static.json'
import {FaArrowRight} from "react-icons/all";

export default function BookablesList() {
    const [group, setGroup] = useState('Rooms');
    const [bookableIndex, setBookableIndex] = useState(0);
    const [showDetails, setShowDetails]  = useState(false);

    const groups = [...new Set(bookables.map(bookable => bookable.group))]
    const bookablesInGroup = bookables.filter(bookable => bookable.group === group);
    const selectedBookable = bookablesInGroup[bookableIndex];

    function changeGroup(event) {
        setGroup(event.target.value);
        setBookableIndex(0);
    }

    function changeBookable(selectedIndex) {
        setBookableIndex(selectedIndex);
    }

    function nextBookable() {
        setBookableIndex(i => (i+1) % bookablesInGroup.length);
    }

    return (
        <>
            <div>
                <select
                    value={group}
                    onChange={changeGroup}
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
                                    onClick={() => changeBookable(i)}>
                                    {b.title}
                                </button>
                            </li>
                        ))
                    }
                </ul>

                <p>
                    <button
                        className="btn"
                        onClick={nextBookable}
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
                                           onChange={() => setShowDetails(oldVal => !oldVal)}
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