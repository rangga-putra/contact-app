import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import FormDialog from "./dialogbox";

const styles = {
  grow: {
    flexGrow: 1
  }
};

class AppToolBar extends React.Component {
  dialogboxElement=React.createRef();
  
  handleClickOpen = () => {
    this.dialogboxElement.current.toggleOpen();
  }

  render() {
    const { classes,onContactUpdate} = this.props;

    return (
      <div>
      <AppBar position="static">
        <Toolbar>
          <Typography 
            variant="h6" color="inherit" 
            className={classes.grow}>
            {this.props.text}
          </Typography>
          <IconButton 
            onClick={this.handleClickOpen}
            color="inherit">
            <AddIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>

      <FormDialog
        title="Add New Contact"
        ref={this.dialogboxElement}
        contacts = {this.props.contacts}
        onContactUpdate={onContactUpdate}/>
    </div>
    );
  }
}

AppToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
  contacts: PropTypes.object.isRequired
};

export default withStyles(styles)(AppToolBar);
