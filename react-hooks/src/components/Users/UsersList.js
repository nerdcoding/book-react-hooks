import React, {useState} from 'react';

import {users} from '../../static.json'

export default function UsersList() {

    const [selectedUserIndex, setSelectedUserIndex] = useState(1);

    function changeUser(selectedIndex) {
        setSelectedUserIndex(selectedIndex);
    }

    return (
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
    );
}