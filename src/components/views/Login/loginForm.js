import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

import Input from "../../utils/forms/inputs";
import ValidationRules from '../../utils/forms/validationRules';
import LoadTabs from '../Tabs/';

import { connect } from 'react-redux';
import { signUp, signIn } from '../../Store/actions/user_actions';
import { bindActionCreators } from 'redux';


class LoginForm extends Component {

  state = {
    type:"Login",
    action:"Login",
    actionMode:"Not a user, Register",
    hasErrors:false,
    form: {
      email: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          isEmail: true
        }
      },
      password: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
            isRequired:true,
          minLength: 6
        }
      },
      confirmPassword: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          confirmPass:"password"
        }
      }
    }
  }
updateInput = (name, value)=>{
  this.setState({
    hasErrors:false
  })

  let formCopy = this.state.form;
  formCopy[name].value = value;




  let rules = formCopy[name].rules
  let valid = ValidationRules(value, rules,formCopy);

  formCopy[name].valid = valid;


  this.setState({
    form:formCopy
  })
}


confirmPassword = ()=>(
  this.state.type != "Login" ?
    <Input
      placeholder="Confirm your password"
      type={this.state.form.confirmPassword.type}
      value={this.state.form.confirmPassword.value}
      onChangeText = {value => this.updateInput("confirmPassword",value)}
      secureTextEntry
    />
  :null
)

changeFormType = ()=>{
  const type = this.state.type;
  this.setState({
    type: type === "Login" ? "Register" : "Login",
    action: type === "Login" ? "Register" : "Login",
    actionMode: type === "Login" ? "Already a User? Login" : "Not a user? Register",
  })
}

formHasErrors = ()=>(
  this.state.hasErrors ?
    <View style={styles.errorContainer}>
      <Text style={styles.errorLabel}>Check your info please</Text>
    </View>
  :null

)

submitUser = ()=> {
  let isFormValid = true;
  let formToSubmit = {};

  const formCopy = this.state.form;

  for(let key in formCopy){
    if(this.state.type === 'Login'){
      if(key !== 'confirmPassword'){
        isFormValid = isFormValid && formCopy[key].valid
        formToSubmit[key] = formCopy[key].value
      }
    } else {
      isFormValid = isFormValid && formCopy[key].valid
      formToSubmit[key] = formCopy[key].value
    }
  }

  if(isFormValid){
    if(this.state.type === 'Login'){
      this.props.signIn(formToSubmit).then(()=>{
        console.log(this.props.User)

      })
    } else {
      this.props.signUp(formToSubmit).then(()=>{
        console.log(this.props.User)
      })
    }
  } else {
    this.setState({
      hasErrors:true
    })
  }
}


  render() {
    return (
      <View style={styles.formInputContainer}>
          <Input
            placeholder="Enter your email"
            type={this.state.form.email.type}
            value={this.state.form.email.value}
            onChangeText = {value => this.updateInput("email",value)}
            autoCapitalize={"none"}
            keyboarType={"email-address"}

          />

          <Input
            placeholder="Enter your password"
            type={this.state.form.password.type}
            value={this.state.form.password.value}
            onChangeText = {value => this.updateInput("password",value)}
            secureTextEntry

          />

          {this.confirmPassword()}
          {this.formHasErrors()}




          <View style={
            this.props.platform === "android"
            ? styles.buttonStyleAndroid
            : styles.buttonStyleIos
          }>
          <Button
            title={this.state.action}
            color="#fd9727"
            onPress={this.submitUser}
          />
        </View>


          <View style={
            this.props.platform === "android"
            ? styles.buttonStyleAndroid
            : styles.buttonStyleIos
          }>
          <Button
            title={this.state.actionMode}
            color="lightgray"
            onPress={this.changeFormType}
          />
        </View>


          <View>
          <Button
            title="I'll do it later'"
            color="lightgray"
            onPress={()=> LoadTabs() }
          />
        </View>
    </View>
  )
  }
}

const styles = StyleSheet.create({
  formInputContainer: {
    minHeight: 400
  },
  buttonStyleAndroid: {
    marginBottom: 10,
    marginTop: 10
  },
  buttonStyleIos: {
    marginBottom: 0
  },
  errorContainer: {
    marginTop:10,
    marginBottom:20,
      alignItems:'center'
  },
  errorLabel: {
    color:'red',
    fontFamily:'Roboto',


  }

})

function mapStateToProps(state){
  return {
    User: state.User
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({signUp, signIn}, dispatch)
}



export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);
