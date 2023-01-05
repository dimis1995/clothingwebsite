import { useState } from "react";

import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import {SignUpContainer, ButtonContainer} from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/user-not-found':
                    alert("Email not found");
                    break;
                case 'auth/wrong-password':
                    alert("Incorrect password");
                    break;
                default:
                    console.log(error);
                    break;
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };

    return (
        <SignUpContainer>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label='Email'
                    type='email' 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email}
                />

                <FormInput 
                    label='Password'
                    type='password' 
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password}
                />
                <ButtonContainer>
                    <Button type="submit">Sign In</Button>
                    <Button 
                        type='button' 
                        buttonType={BUTTON_TYPE_CLASSES.google} 
                        onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </ButtonContainer>
            </form>
        </SignUpContainer>
    )
}

export default SignInForm