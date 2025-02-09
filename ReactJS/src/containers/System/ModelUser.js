
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModelUser extends Component {

   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: '',
         firstName: '',
         lastName: '',
         address: '',
      }
      this.listenToEmitter() // Sau khi tao se clear model
   }

   componentDidMount() {
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

   handleAddNewUser = () => {
      let isValide = this.checkValidelInput()
      if (isValide === true) {
         // Goi Api
         this.props.createNewUser(this.state);
      }
   }
   render() {
      // console.log("Check props: ", this.props)
      // console.log("Check props model: ", this.props.isOpen)
      return (
         <Modal
            isOpen={this.props.isOpen}
            toggle={() => { this.toggle() }}
            className='model-user-container'
            size="lg"
         >
            <ModalHeader toggle={() => { this.toggle() }}>Create add new user</ModalHeader>
            <ModalBody>
               <div className='model-user-body'>
                  <div className='input-container max-w-input-68'>
                     <label>Email</label>
                     <input
                        type='text'
                        onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                        value={this.state.email}
                     />
                  </div>
                  <div className='input-container max-w-input-30'>
                     <label>Password</label>
                     <input
                        type='password'
                        onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                        value={this.state.password}
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
               <Button color="primary" className='px-3' onClick={() => { this.handleAddNewUser() }}>
                  Add new
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelUser);
