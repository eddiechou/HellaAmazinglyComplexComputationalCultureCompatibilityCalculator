import React from 'react';
import ReactDOM from 'react-dom';
import * as s from '../serverCalls.js'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'


class CustomForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      name: '',
      text: '',
      context: 'text',
      private: true
    }
    this.updateFormValue = this.updateFormValue.bind(this);
    this.sendForm = this.sendForm.bind(this);
  }

  updateFormValue(e) {
    const name = e.target.name
    this.setState({[name]: e.target.value});
  }

  sendForm(event) {
    event.preventDefault()
    this.props.toggleSpinner()
    s.serverPost('customform', this.state)
    .then(e => {
      this.props.toggleSpinner()
      window.location.href = e.request.responseURL;
    }).catch(e => {
      this.toggleSpinner()

        
    })
  }

  render () {
    return (
      <div className="container-fluid">
      <h2>custom text analysis</h2>
      <p>Paste any text you like into the form below.</p>
      <p>
        We recommend using a sample of 1200 words or more for greater accuracy, but the minimum number 
        required to conduct an analysis is 200.
      </p>
      <p>&nbsp;</p>
      <form className="custom" onSubmit={(e) => this.props.click === undefined ? this.sendForm(e) : this.props.click(e, this.state)}>
        <label>
          Who are you analyzing?
          <p></p>
          <input type="text" name='name' onChange={this.updateFormValue} defaultValue=''/>          
          <p></p>
        </label>
        <label>Paste your text in here.</label>
        <textarea rows='30' cols='60' name='text' className="custom-form" onChange={this.updateFormValue} defaultValue=''/>
        <input type="submit" className="submit" defaultValue ='submit'/>
      </form>
      </div>
    )
  }
}


export default CustomForm

