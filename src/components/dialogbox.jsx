import React from 'react';
import PropTypes from 'prop-types'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class FormDialog extends React.Component {
  state = {
      open: false,
      firstName: '',
      lastName: '',
      age: 0,
      photo: ''
  };

  toggleOpen = () => {
    this.setState(prevState => ({ 
      open: !prevState.open 
    }));
  };
 
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  postContact = () => {
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      photo: this.state.photo
   }

    axios.post('http://localhost:3004/data', 
     newUser
    ).then(({data}) => {
      const newContact = [...this.props.contacts,data]
      // console.log("DATA",newContact)
      this.props.onContactUpdate(newContact)
    });
    this.toggleOpen();
  }

  putContact =(id) =>{
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      photo: this.state.photo
   }
    axios.put(`http://localhost:3004/data/${id}`, 
     newUser
    ).then(({ data }) => {
      const newContact = this.props.contacts.map(
        contact => contact.id === id ?
        contact = data : contact
      )
      // console.log("DATA",newContact)
      this.props.onContactUpdate(newContact)
    });
    this.toggleOpen();
  }  

  render() {
    const { id } = this.props;

    let button;
    if (this.props.title==='Add New Contact')
    {
      button = <Button onClick={this.postContact} color="primary">
      Add
    </Button>
    }
    else if (this.props.title==='Edit Contact')
    {
     button =  <Button onClick={()=>this.putContact(id)} color="primary">
      Edit
    </Button>
    }

    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.toggleOpen}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>

          <DialogContent>
            <TextField
              value = {this.state.firstName}
              name = "firstName"
              onChange = {this.handleChange}
              margin = "dense"
              label = "First Name"
              fullWidth/>
            <TextField
              value = {this.state.lastName}
              name = "lastName"
              onChange = {this.handleChange}
              margin = "dense"
              label = "Last Name"
              fullWidth/>
            <TextField
              value = {this.state.age}
              name = "age"
              onChange = {this.handleChange}
              margin = "dense"
              label = "Age"
              type = "number"
              fullWidth/>
            <TextField
              value = {this.state.photo}
              name = "photo"
              onChange = {this.handleChange}
              margin = "dense"
              label = "Photo Url"
              fullWidth/>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.toggleOpen} color="primary">
              Cancel
            </Button>
            {button}
          </DialogActions>

        </Dialog>
      </div>
    );
  }
}

FormDialog.propTypes = {
  contacts: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
}

export default (FormDialog);