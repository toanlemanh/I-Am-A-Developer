import { View,Text,  } from "react-native";
import { styles } from "../styles/componentStyles/LabelStyle";

export default function CustomDataLabel({children}){
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{children}</Text>
        </View>
    )
}

