import React, {useState, useEffect} from 'react';
import {FaSpinner} from "react-icons/all";
import axios from "axios";


export default function UserPicker() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/users`)
            .then(response => {
                const users = response.data;
                setUsers(users);
            })
            .catch(error => console.log(error));
    }, []);

    /*useEffect(() => {
        async function getUsers() {
            const response = await axios.get(`http://localhost:3001/users`);
            setUsers(response.data);
        }
        getUsers();
    }, []);*/

    if (users === null) {
        return (
            <FaSpinner className="icon-loading"/>
        );
    } else {
        return (
            <select>
                {users.map(user => (
                    <option key={user.id}>{user.name}</option>
                ))}

            </select>
        );
    }


}