import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class LoginForm extends Component {

  state = {
    form: {
      email: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          isEmail: true
        }
      },
      password: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
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

  render() {
    return (
      <View>
          <Input
            placeholder="Enter your email"
            type={this.state.form.email.type}
            value={this.state.form.email.value}
            onChangeText = {value => ()=> alert('hey')}
            autoCapitalize={"none"}
            keyboarType={"email-address"}

          />
    </View>
  )
  }
}

export default LoginForm;
