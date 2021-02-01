import React, {useState} from "react";
import {days, sessions} from "../../static.json";


export default function BookablesDetails({selectedBookable}) {
    const [showDetails, setShowDetails] = useState(true);

    return (
        <>
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
                                           onChange={() => setShowDetails(old => !old)}
                                    />
                                    Show Details
                                </label>
                                {/**}<button className="btn"
                                        onClick={stopPresentation}>
                                    Stop
                                </button>**/}
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