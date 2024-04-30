import { Alert } from "react-native";
import { CONSTRAINTS } from "./CharacterConstraints";
// check the requirement to lock (true) or unlock (false) the screen 
export function lockJobMarketScreen (age, health) {
        if (age < CONSTRAINTS.age.legalAdult) {
            Alert.alert("Opps!", " You gonna wait to get enough 18 years old to enter job market!");
            return true;
        }
        if (health < CONSTRAINTS.health.averHealthValue){
            Alert.alert("Opps!", " Your health is not good enough to apply a job!");
            return true;
        }
        return false;
}
export function lockActivitiesScreen (age, health) {
    if (age < CONSTRAINTS.age.infant) {
        Alert.alert("Opps!", " You gonna wait to get older to do activities !");
        return true;
    }
    return false;
}
