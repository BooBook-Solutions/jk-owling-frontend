import React, { useState } from 'react';
import UserCard from '../Card/UserCard';
import PageManager from '../Common/PageManager';
import SearchBar from '../Common/SearchBar';
import useCustomEffect from '../../Hooks/useCustomEffect';

const UserList = ({ users, setUsers, pageItems }) => {

    const [filteredUsers, setFilteredUsers] = useState(users);

    const { pageManager, currentItems: currentUsers } = PageManager(filteredUsers, pageItems);

    const handleUserDeletion = (deletedUserId) => {
        // Filter out the deleted user from the state
        setUsers(prevUsers => prevUsers.filter(user => user.id !== deletedUserId));
        setFilteredUsers(prevUsers => prevUsers.filter(user => user.id !== deletedUserId));
    };

    useCustomEffect({functions: [() => setFilteredUsers(users)], dependencies: [users]}); //when users change, update filtered users

    return (
        <div>
            <div className="add-button-container">
                <SearchBar items={users} setItems={setFilteredUsers} placeholder={"Search users..."} />
            </div>
            <div className="row">
                { currentUsers.map((user) => (
                    <div key={user.id} className="col-md-4 mb-3">
                        <UserCard user={user} type={"dashboard"} onDelete={handleUserDeletion}/>
                    </div>
                ))}
            </div>
            { pageManager }
        </div>
    );
};

export default UserList;
