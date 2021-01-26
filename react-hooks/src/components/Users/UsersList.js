import React, {useState, useEffect} from 'react';
import axios from "axios";
import {days, sessions} from '../../static.json'


export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [selectedUserIndex, setSelectedUserIndex] = useState(1);
    const selectedUser = users[selectedUserIndex];

    useEffect(() => {
        axios.get('http://localhost:3001/users')
            .then(response =>
                setUsers(response.data)
            )
            .catch(error => console.log(error) )
    }, []);

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