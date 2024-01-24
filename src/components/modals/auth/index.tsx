import React, { useState } from 'react'
import Modal from '../../modal'
import { getLanguageItem } from '../../../assets/language'
import LoginContent from './login'
import SignUpContent from './sign-up'

enum AUTH_TYPE {
    LOGIN,
    SIGN_UP
}

const defaultAuthType = AUTH_TYPE.SIGN_UP

export default function AuthModal() {
    const [authType, setAuthType] = useState(defaultAuthType)

    let content = null

    if (authType === AUTH_TYPE.LOGIN) {
        content = <LoginContent onSignUp={() => setAuthType(AUTH_TYPE.SIGN_UP)} />
    } else {
        content = <SignUpContent onLogin={() => setAuthType(AUTH_TYPE.LOGIN)} />
    }

    const title = getLanguageItem(authType === AUTH_TYPE.LOGIN ? "Log_In" : "Sign_Up")

    return (
        <Modal
            children={content}
            title={title}
            modalType={"auth"}
            onClose={() => setAuthType(defaultAuthType)}
        />
    )
}
