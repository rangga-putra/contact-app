import React from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import FormDialog from "./dialogbox";

const styles = theme => ({
    paper: {
      paddingBottom: 10,
    },
    list: {
      marginBottom: theme.spacing.unit * 2,
    }
  });

class Contact extends React.Component{
  dialogboxElement=React.createRef();
  
  handleClickOpen = () => {
    this.dialogboxElement.current.toggleOpen();
  }

  delContact = (contact, id) => {
    axios.delete(`http://localhost:3004/data/${id}`
    ).then(()=>{
      this.props.onContactUpdate(
        contact.filter(item => item.id !== id)
        )
    })
    
  }

    render(){
        const { classes, contacts,onContactUpdate } = this.props;
        return(
            <div>
            <CssBaseline />
            <Paper square className={classes.paper}>
                <List className={classes.list}>
                { contacts.map((item, index) => (
                    <ListItem key={index} button>
                        <Avatar alt="Profile Picture" src={item.photo}/>
                        <ListItemText 
                          primary={item.firstName+" "+item.lastName}
                          secondary={'age: ' + item.age} />
                        <IconButton 
                          aria-label="Edit"
                          onClick={this.handleClickOpen}>
                        <CreateIcon/>
                        </IconButton>
                        <FormDialog
                          title="Edit Contact"
                          ref={this.dialogboxElement}
                          contacts={contacts}
                          onContactUpdate={onContactUpdate}
                          id={item.id}/>
                        <IconButton 
                          aria-label="Delete" 
                          onClick={()=>this.delContact(contacts,item.id)}>
                        <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
                </List>
            </Paper>
           </div>
        );
    }
}

Contact.propTypes = {
    classes: PropTypes.object.isRequired,
    contacts: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Contact);