import HomePage from "./pages/HomePage/HomePage.component";
import ShopPage from "./pages/shop/ShopPage.component";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up-form/Sign-in-and-sign-up-form.component";
import { Component } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase.utils";
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth =  onAuthStateChanged(auth, (user)=>{
      this.setState({
        currentUser: user
      })
      console.log(user);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser = {this.state.currentUser}/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/shop' element={<ShopPage/>}/>
          <Route path='/signin' element={<SignInAndSignUpPage/>}/>
        </Routes>
      </div>
    );
  }
}

export default App;
