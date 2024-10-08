import axios from "axios"
import { Alert } from "react-native"

//create your firebase project and fill your APIKey
const WebApiKey = ""

const authenticate = async (mode, email, password) => {
    try {
        console.log(mode, email, typeof email, password, typeof password)

        const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${WebApiKey}`,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        )
        console.log(response.data)
        return response.data.localId
    } catch (err) {
        Alert.alert("Wrong Credential! Let's try!", err.message)
    }
}

export const signInWithPassword = (email, password) => {
    return authenticate("signInWithPassword", email, password)
}

export const signUp = (email, password) => {
    return authenticate("signUp", email, password)
}
