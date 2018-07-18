import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Modal
} from "react-native";
import { navigatorDrawer, getTokens, setTokens } from "../../../utils/misc";

import Input from "../../../utils/forms/inputs";
import ValidationRules from "../../../utils/forms/validationRules";

import { connect } from "react-redux";
import {
  addArticle,
  resetArticle
} from "../../../Store/actions/articles_actions";
import { autoSignIn } from "../../../Store/actions/user_actions";
import { bindActionCreators } from "redux";

class AddPost extends Component {
  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(event => {
      navigatorDrawer(event, this);
    });
  }

  state = {
    loading: false,
    errorsArray: [],
    hasErrors: false,
    modalVisible: false,
    modalSuccess: false,
    form: {
      category: {
        value: "",
        name: "category",
        valid: false,
        type: "picker",
        options: ["All", "Security", "Automation", "Fire", "Special"],
        rules: {
          isRequired: true
        },
        errorMsg: "You need to select a catagory"
      },
      title: {
        value: "",
        name: "title",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          maxLength: 50
        },
        errorMsg: "You need to enter a title max of 50 characters"
      },
      description: {
        value: "",
        name: "description",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          maxLength: 200
        },
        errorMsg: "You need to enter a description"
      },
      price: {
        value: "",
        name: "price",
        valid: false,
        type: "textinput",
        rules: {
          isRequire: true,
          maxLength: 6
        },
        errorMsg: "You need to enter a price"
      },
      email: {
        value: "",
        name: "email",
        valid: false,
        type: "textinput",
        rules: {
          isRequire: true,
          isEmail: true
        },
        errorMsg: "You need to enter an email"
      }
    }
  };

  updateInput = (name, value) => {
    this.setState({
      hasErrors: false
    });

    let formCopy = this.state.form;
    formCopy[name].value = value;

    let rules = formCopy[name].rules;
    let valid = ValidationRules(value, rules, formCopy);

    formCopy[name].valid = valid;

    this.setState({
      form: formCopy
    });
  };
  submitFormHandler = () => {
    let isFormValid = true;
    let dataToSubmit = {};
    const formCopy = this.state.form;

    for (let key in formCopy) {
      isFormValid = isFormValid && formCopy[key].valid;
      dataToSubmit[key] = this.state.form[key].value;
    }

    if (isFormValid) {
      this.setState({
        loading: true
      });

      getTokens(value => {
        const dateNow = new Date();
        const expiration = dateNow.getTime();
        const form = {
          ...dataToSubmit,
          uid: value[3][1]
        };
        if (expiration > value[2][1]) {
          console.log("Auto sign in");
          this.props.autoSignIn(value[1][1]).then(() => {
            setTokens(this.props.User.userData, () => {
              this.props
                .addArticle(form, this.props.User.userData.token)
                .then(() => {
                  this.setState({ modalSuccess: true });
                });
            });
          });
        } else {
          this.props
            .addArticle(form, this.props.User.userData.token)
            .then(() => {
              this.setState({ modalSuccess: true });
            });
        }
      });
    } else {
      let errorsArray = [];

      for (let key in formCopy) {
        if (!formCopy[key].isValid) {
          errorsArray.push(formCopy[key].errorMsg);
        }
      }
      this.setState({
        loading: false,
        hasErrors: true,
        modalVisible: true,
        errorsArray
      });
    }
  };

  showErrorArray = errors =>
    errors
      ? errors.map((item, i) => (
          <Text key={i} style={styles.errorItem}>
            - {item}
          </Text>
        ))
      : null;

  clearErrors = () => {
    this.setState({
      hasErrors: false,
      modalVisible: false,
      errorsArray: []
    });
  };

  resetSellitScreen = () => {
    const formCopy = this.state.form;
    for (let key in formCopy) {
      formCopy[key].valid = false;
      formCopy[key].value = "";
    }
    this.setState({
      modalSuccess: false,
      hasErrors: false,
      errorsArray: [],
      loading: false
    });

    this.props.resetArticle();
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.formInputContainer}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.mainTitle}>Sell your things</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text>Select a category</Text>
            </View>
            <View style={{ flex: 1 }}>
              >
              <Input
                placeholder="Select a category"
                type={this.state.form.category.type}
                value={this.state.form.category.value}
                onValueChange={value => this.updateInput("category", value)}
                options={this.state.form.category.options}
              />
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.secondTitle}>
              Describe what you are selling
            </Text>
          </View>
          <View>
            <Text> Please add the title, be descriptive</Text>
            <Input
              placeholder="Enter a title"
              type={this.state.form.title.type}
              value={this.state.form.title.value}
              onChangeText={value => this.updateInput("title", value)}
              overrideStyle={styles.inputText}
            />
          </View>
          <View>
            <Input
              placeholder="Enter the description"
              type={this.state.form.description.type}
              value={this.state.form.description.value}
              onChangeText={value => this.updateInput("description", value)}
              multiline={true}
              numberOfLines={4}
              overrideStyle={styles.inputTextMultiline}
            />
          </View>
          <View>
            <Text
              style={{
                marginTop: 20,
                marginBottom: 20
              }}
            >
              Add here how much you want for the item
            </Text>
            <Input
              placeholder="Enter the price"
              type={this.state.form.price.type}
              value={this.state.form.price.value}
              onChangeText={value => this.updateInput("price", value)}
              overrideStyle={styles.inputText}
              keyboardType={"numeric"}
            />
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.secondTitle}>Add Contact Data</Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text>Enter your email where users can contact you</Text>
            <Input
              placeholder="Enter the email"
              type={this.state.form.email.type}
              value={this.state.form.email.value}
              onChangeText={value => this.updateInput("email", value)}
              overrideStyle={styles.inputText}
              autocapitalize={"none"}
              keyboardType={"email-address"}
            />
          </View>

          {!this.state.loading ? (
            <Button
              title="Sell it"
              color="lightgrey"
              onPress={this.submitFormHandler}
            />
          ) : null}

          <Modal
            animationType="slide"
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <View style={{ padding: 20 }}>
              {this.showErrorArray(this.state.errorsArray)}
              <Button title="Got it" onPress={this.clearErrors} />
            </View>
          </Modal>

          <Modal
            animationType="slide"
            visible={this.state.modalSuccess}
            onRequestClose={() => {}}
          >
            <View style={{ padding: 20 }}>
              <Text>Good Job</Text>
              <Button
                title="Go back home"
                onPress={() => {
                  this.resetSellitScreen();
                  this.props.navigator.switchToTab({
                    tabIndex: 0
                  });
                }}
              />
            </View>
          </Modal>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formInputContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 20
  },
  mainTitle: {
    fontFamily: "Roboto",
    fontSize: 30,
    color: "#00ADA9"
  },
  secondTitle: {
    fontFamily: "Roboto",
    fontSize: 20,
    color: "#00ADA9",
    marginTop: 30,
    marginBottom: 30
  },
  inputText: {
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 0,
    padding: 10
  },
  inputTextMultiline: {
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 0,
    padding: 10,
    minHeight: 100
  },
  errorItem: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "red",
    marginBottom: 10
  }
});

function mapStateToProps(state) {
  return {
    Articles: state.Articles,
    User: state.User
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addArticle, autoSignIn, resetArticle }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPost);
