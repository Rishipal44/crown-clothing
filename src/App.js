import HomePage from "./pages/HomePage/HomePage.component";
import ShopPage from "./pages/shop/ShopPage.component";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up-form/Sign-in-and-sign-up-form.component";
import { Component } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { getDoc } from "firebase/firestore";
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        if (userRef) {
          const snapShot = await getDoc(userRef); // ✅ Use getDoc() in Firebase v9+
          if (snapShot.exists()) {
            this.setState({
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            }, () => console.log("Updated State:", this.state));
          }
        }

      } else {
        this.setState({ currentUser: null  }); // ✅ Handle user sign out
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeFromAuth) {
      this.unsubscribeFromAuth(); // ✅ Ensure proper cleanup
    }
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/signin' element={<SignInAndSignUpPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
