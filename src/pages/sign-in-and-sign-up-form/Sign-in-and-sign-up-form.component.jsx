import SignIn from "../../components/signIn/SignIn.component";
import SignUp from "../../components/signup/SignUp.component";
import "./sign-in-and-sign-up-form.styles.scss";

const SignInAndSignUpPage = () => {
    return(
        <div className="sign-in-and-sign-up">
            <SignIn/>
            <SignUp/>
        </div>
    )
}

export default SignInAndSignUpPage;