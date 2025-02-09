import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss";
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import { emitter } from '../../utils/emitter';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faDeleteLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import ModelEditUser from './ModelEditUser';
import ModelUser from './ModelUser';

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
            arrUsers: [],
            isOpenModelUser: false, // Dau tien se k hien model
            isOpenEditModeUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.data.errCode === 0) {
            this.setState({
                arrUsers: response.data.users,
            })
            // console.log("chec state user 1:", this.state.arrUsers)
        }
    }

    handleAddNewUser = () => {
        // alert("Click me")
        // Khi click vao se hien ra
        this.setState({
            isOpenModelUser: true,
        })
    }

    toggleModelUser = () => {
        this.setState({
            isOpenModelUser: !this.state.isOpenModelUser,
        })
    }

    toggleModeEditlUser = () => {
        this.setState({
            isOpenEditModeUser: !this.state.isOpenEditModeUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            console.log(response.data.errCode)
            console.log(response.data.message)
            if (response && response.data.errCode !== 0) {
                alert(response.data.message)
            } else {
                await this.getAllUserFromReact()
                this.setState({
                    isOpenModelUser: false,
                })
                emitter.emit("EVENT_CLEAR_MODAL_DATA") // Sau khi tao se clear model
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (user) => {
        // alert("Delete User")
        // console.log(user.id)
        try {
            let res = await deleteUserService(user.id)
            // console.log(res)
            if (res && res.data.errCode === 0) {
                // Sau khi xoa k can load lai no van hien da xoa
                await this.getAllUserFromReact()
            } else {
                alert(res.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleEditUser = async (user) => {
        // console.log("Check edit user: ", user)
        this.setState({
            isOpenEditModeUser: !this.state.isOpenEditModeUser,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.data.errCode === 0) {
                this.setState({
                    isOpenEditModeUser: false,
                })
                await this.getAllUserFromReact()
            } else {
                alert(res.data.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        // console.log("check render: ", this.state)
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <div className='title text-center'>Manage user with NGUYEN CHI NGUYEN</div>
                <ModelUser
                    isOpen={this.state.isOpenModelUser}
                    toggleFromParent={this.toggleModelUser}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenEditModeUser &&
                    <ModelEditUser
                        isOpen={this.state.isOpenEditModeUser}
                        toggleFromParent={this.toggleModeEditlUser}
                        currenUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='mx-1'>
                    <button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}>
                        <FontAwesomeIcon icon={faPlus} /> Add new user
                    </button>
                </div>
                <table id="customers" className='mt-3 mx-1'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Adress</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {arrUsers && arrUsers.map((item, index) => {
                        return (
                            <tbody key={item.id}>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn_UserMana' onClick={() => this.handleEditUser(item)}>
                                            <FontAwesomeIcon icon={faPenToSquare} className='icon orange' />
                                        </button>
                                        <button className='btn_UserMana' onClick={() => this.handleDeleteUser(item)}>
                                            <FontAwesomeIcon icon={faDeleteLeft} className='icon red' />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
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
