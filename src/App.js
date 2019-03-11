import React, { Component } from "react";
import AppToolBar from "./components/toolbar";
import Contact from "./components/contacts";
import axios from "axios";

class App extends Component {
  state = {
    contactData: []
  }

  getData = () => {
    axios.get('http://localhost:3004/data'
    ).then(response => {
      this.setState({contactData: response.data})
    });
  }
 
  componentDidMount = () => {
    this.getData();
  }

  handleContactUpdate = (newContact) => {
    this.setState({contactData: newContact})
    // console.log("newcontact=>",newContact)
  }
  render() {
    return (
      <div>
        <AppToolBar
          contacts={this.state.contactData}
          text="Contact List"
          onContactUpdate={this.handleContactUpdate}/>
        <Contact
          contacts={this.state.contactData}
          onContactUpdate={this.handleContactUpdate}/>
      </div>
    );
  }
}

export default App;
