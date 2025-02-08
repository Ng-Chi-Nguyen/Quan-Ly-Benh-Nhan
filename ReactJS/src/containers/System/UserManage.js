import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss";
import { getAllUsers } from '../../services/userService';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

class UserManage extends Component {
    /*
        life cycle
        Run component
        1. Run constructor -> init state
        2. Did mount (set gia tri cua cac bien truoc khi render ra man hinh)
        3. Render
    */
    constructor(props) {
        super(props);
        // This la 'UserManage'
        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        console.log("Data from react: ", response)
        // console.log("Data from react errCode: ", response.data.errCode)
        // console.log("Data from react users: ", response.data.users)
        if (response && response.data.errCode === 0) {
            this.setState({
                arrUsers: response.data.users,
            })
            // console.log("chec state user 1:", this.state.arrUsers)
        }

    }


    render() {
        console.log("check render: ", this.state)
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <div className='title text-center'>Manage user with NGUYEN CHI NGUYEN</div>
                <table id="customers">
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Adress</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                    {arrUsers && arrUsers.map((item, index) => {
                        return (
                            <tr>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.gender === 0 ? "Male" : "Female"}</td>
                                <td>
                                    <button className='btn_UserMana'>
                                        <FontAwesomeIcon icon={faPenToSquare} className='icon orange' />
                                    </button>
                                    <button className='btn_UserMana'>
                                        <FontAwesomeIcon icon={faDeleteLeft} className='icon red' />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
