import React, {useState, useEffect} from 'react';
import axios from "axios";
import {days, sessions} from '../../static.json'
import {FaSpinner} from "react-icons/all";


export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUserIndex, setSelectedUserIndex] = useState(1);
    const selectedUser = users[selectedUserIndex];

    useEffect(() => {
        axios.get('http://localhost:3001/users')
            .then(response => {
                setIsLoading(false);
                setUsers(response.data);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error);
            })
    }, []);

    function changeUser(selectedIndex) {
        setSelectedUserIndex(selectedIndex);
    }

    if (error !== null) {
        return <p>{error.message}</p>
    }
    if (isLoading) {
        return <p><FaSpinner className="icon-loading" /> Loading users... </p>
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