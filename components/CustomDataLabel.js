import { View,Text,  } from "react-native";
import { styles } from "../Style/componentStyle/LabelStyle";

export default function CustomDataLabel({children}){
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{children}</Text>
        </View>
    )
}

