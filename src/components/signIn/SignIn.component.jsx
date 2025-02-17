import { Component } from "react";
import FormInput from "../formInput/FormInput.component";
import CustomButton from "../customButton/CustomButton.component";
import {auth, signInWithGoogle } from "../../firebase/firebase.utils";
import "./signIn.styles.scss";
import { signInWithEmailAndPassword } from "firebase/auth";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password} = this.state;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      this.setState({email: '', password: ''});
    } catch(error){
      console.log(error);
    }
    
  };

  handlechange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={this.state.email}
            label="email"
            handleChange={this.handlechange}
            required
          />

          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            label="password"
            handleChange={this.handlechange}
            required
          />

          <div className='buttons'>
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with google</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
