import React, {useState} from "react";
import UserService from "../../services/userService";
import {useDispatch} from "react-redux";
import {getMessages} from "../../services/messageService";
import {clearChatConversation} from "../../redux/messageSlice";
import ActiveStatus from "./ActiveStatus";

const SearchUser = () => {
    const [term, setTerm] = useState('');
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const handleSearch = async (e) => {
        setTerm(e.target.value);
        const users = await UserService.searchUsers(e.target.value);
        if (users) {
            setUsers(users)
        }
        console.log(users)
    }
    const handleClick =async (e, user) =>{
        e.preventDefault();
        dispatch(clearChatConversation());
        setUsers([])
        setTerm('')
        await getMessages(user, dispatch);
    }
    return (
        <div className="card-header">
            <div className="input-group">
                <input type="text" onChange={handleSearch} placeholder="Search..." value={term} name="term"
                       className="form-control search" autoComplete='off'/>
                {/*<div className="input-group-prepend">*/}
                {/*    /!*<span className="input-group-text search_btn"><i className="fas fa-search"></i></span>*!/*/}
                {/*</div>*/}

            </div>
            {users.length > 0 &&
                <div className="list-group mt-1">
                    {users.map((user) => {
                        return <li className="list-group-item d-flex" key={user.id}>
                            <div className="circle-img rounded-circle img_cont_msg mr-2">
                                <div className="name-inside">
                                    {(user.first_name?.charAt(0)+user.last_name?.charAt(0)).toUpperCase()}
                                </div>
                                <ActiveStatus contact={user}/>
                            </div>
                            <button onClick={(e) => handleClick(e, user)}>{user.first_name + ' ' + user.last_name}</button>
                        </li>
                    })}

                </div>}

        </div>
    )
}
export default SearchUser;