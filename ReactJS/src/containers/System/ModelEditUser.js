
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from "lodash"; // Thu vien isEmpty
class ModelEditUser extends Component {

   constructor(props) {
      super(props);
      this.state = {
         id: '',
         email: '',
         password: '',
         firstName: '',
         lastName: '',
         address: '',
      }
      this.listenToEmitter() // Sau khi tao se clear model
   }

   componentDidMount() {
      let user = this.props.currenUser;
      if (user && !_.isEmpty(user)) {
         this.setState({
            id: user.id,
            email: user.email,
            password: 'hadcode',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
         })
      }
      // console.log("Didmount edit modle: ", this.props.currenUser)
   }
   listenToEmitter() {
      emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
         this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
         })
      })
   }
   toggle = () => {
      this.props.toggleFromParent()
   }

   handleOnChangeInput = (event, id) => {
      // console.log(event.target.value, id)
      let copyState = { ...this.state }
      copyState[id] = event.target.value;
      this.setState({
         ...copyState
      }, () => {
         // console.log("Check good state copy:", this.state)
      })
   }

   checkValidelInput = () => {
      let isValide = true;
      let arrInput = ["email", "password", "firstName", "lastName", "address"];
      for (let i = 0; i < arrInput.length; i++) {
         if (!this.state[arrInput[i]]) {
            isValide = false;
            alert("Thiếu tham số " + arrInput[i])
            break;
         }
      }
      return isValide;
   }

   handleSaveUser = () => {
      let isValide = this.checkValidelInput()
      if (isValide === true) {
         // Goi Api edit user
         this.props.editUser(this.state);
      }
   }
   render() {
      return (
         <Modal
            isOpen={this.props.isOpen}
            toggle={() => { this.toggle() }}
            className='model-user-container'
            size="lg"
         >
            <ModalHeader toggle={() => { this.toggle() }}>Edit add new user</ModalHeader>
            <ModalBody>
               <div className='model-user-body'>
                  <div className='input-container max-w-input-68'>
                     <label>Email</label>
                     <input
                        type='text'
                        onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                        value={this.state.email}
                        disabled
                     />
                  </div>
                  <div className='input-container max-w-input-30'>
                     <label>Password</label>
                     <input
                        type='password'
                        onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                        value={this.state.password}
                        disabled
                     />
                  </div>
                  <div className='input-container'>
                     <label>FirstName</label>
                     <input
                        type='text'
                        onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                        value={this.state.firstName}
                     />
                  </div>
                  <div className='input-container'>
                     <label>LastName</label>
                     <input
                        type='text'
                        onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                        value={this.state.lastName}
                     />
                  </div>
                  <div className='input-container max-w-input-100'>
                     <label>Address</label>
                     <input
                        type='text'
                        onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                        value={this.state.address}
                     />
                  </div>
               </div>
            </ModalBody>
            <ModalFooter>
               <Button color="primary" className='px-3' onClick={() => { this.handleSaveUser() }}>
                  Save
               </Button>{' '}
               <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                  Cancel
               </Button>
            </ModalFooter>
         </Modal>
      )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelEditUser);
