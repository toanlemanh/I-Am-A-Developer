
export function formatDate() {
  let date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  date = `${year}/${month}/${day}`;
  return date;
}

export function transformText(text) {
  if (text) {
    let modifiedText = text
    const firstUpperCaseIndex = modifiedText.search(/[A-Z]/);
    if (firstUpperCaseIndex !== -1) {
      modifiedText = modifiedText.substring(0, firstUpperCaseIndex) + " " + modifiedText.substring(firstUpperCaseIndex);
    }
    modifiedText = modifiedText[0].toUpperCase() + modifiedText.substring(1);
    return modifiedText
  }
  return ""
}

import { Alert } from "react-native";
import { CONSTRAINTS } from "../constants/CharacterConstraints";
// check the requirement to lock (true) or unlock (false) the screen 
export function lockJobMarketScreen(age, health) {
  if (age < CONSTRAINTS.age.legalAdult) {
    Alert.alert("Opps!", " You gonna wait to get enough 18 years old to enter job market!");
    return true;
  }
  if (health < CONSTRAINTS.health.averHealthValue) {
    Alert.alert("Opps!", " Your health is not good enough to apply a job!");
    return true;
  }
  return false;
}
export function lockActivitiesScreen(age, health) {
  if (age < CONSTRAINTS.age.infant) {
    Alert.alert("Opps!", " You gonna wait to get older to do activities !");
    return true;
  }
  return false;
}

export function buy(money, assetName, assetPrice) {
  let message = "";
  // if enough => buy successfully. add => assets in context 
  try {
    console.log("money", money, ">", assetPrice)
    if (money >= assetPrice) {
      return message = `Successfull transaction! A ${assetName} is added into your assets!`;
    }
    else {
      message = `You have ${money}$ ! Let's make money harder!`
      throw new Error(message);
    }
  } catch (error) {
    Alert.alert("Opps!", error.message);
  }
}

export function pay(money, servicePrice) {
  let message = "";
  // if enough => buy successfully. add => assets in context 
  try {
    console.log("money", money, ">", servicePrice)
    if (money >= servicePrice) {
      return message = `Successfull payment! you spent $${money}.`;
    }
    else {
      message = `You have ${money} ! Let's make money harder!`
      throw new Error(message);
    }
  } catch (error) {
    Alert.alert("Error", error.message);
  }
}