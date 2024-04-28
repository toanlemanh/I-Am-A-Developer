import { Alert } from "react-native";

export function buy (money, assetName,assetPrice){
    let message = "";
    // if enough => buy successfully. add => assets in context 
    try {
        console.log("money", money, ">", assetPrice)
        if (money >= assetPrice){
           return message = `Successfull transaction! A ${assetName} is added into your assets!`;  
        }
        else {
            message =`You have ${money} ! Let's make money harder!`
            throw new Error(message);
        }
    } catch (error) {
        Alert.alert("Error",error.message);
    }
}