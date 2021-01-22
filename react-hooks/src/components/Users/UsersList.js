import React, {useState} from 'react';

import {days, sessions, users} from '../../static.json'

export default function UsersList() {
    const [selectedUserIndex, setSelectedUserIndex] = useState(1);
    const selectedUser = users[selectedUserIndex];

    function changeUser(selectedIndex) {
        setSelectedUserIndex(selectedIndex);
    }

    return (
        <>
            <ul className="bookables items-list-nav">
                {users
                    .map((user, index) =>(
                        <li key={user.id} className={index === selectedUserIndex ? "selected" : null}>
                            <button
                                className="btn"
                                onClick={() => changeUser(index)}>
                                    {user.name}
                            </button>
                        </li>
                    ))
                }
            </ul>

            {selectedUser && (
                <div className="bookable-details">
                    <div className="item">
                        <div className="item-header">
                            <h2>
                                {selectedUser.name}
                            </h2>
                        </div>

                        <p>{selectedUser.title}</p>

                        <div className="item-details">
                            <h3>Availability</h3>
                            <div className="bookable-availability">
                                {selectedUser.notes}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}