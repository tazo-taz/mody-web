import { useState } from 'react'
import useLanguage from '../../../stores/useLanguage'
import Modal from '../../modal'
import LoginContent from './login'
import SignUpContent from './sign-up'

enum AUTH_TYPE {
    LOGIN,
    SIGN_UP
}

const defaultAuthType = AUTH_TYPE.LOGIN

export default function AuthModal() {
    const [authType, setAuthType] = useState(defaultAuthType)
    const { getItem } = useLanguage()

    let content = null

    if (authType === AUTH_TYPE.LOGIN) {
        content = <LoginContent onSignUp={() => setAuthType(AUTH_TYPE.SIGN_UP)} />
    } else {
        content = <SignUpContent onLogin={() => setAuthType(AUTH_TYPE.LOGIN)} />
    }

    const title = getItem(authType === AUTH_TYPE.LOGIN ? "Log_In" : "Sign_Up")

    return (
        <Modal
            children={content}
            title={title}
            modalType={"auth"}
            onClose={() => setAuthType(defaultAuthType)}
        />
    )
}
