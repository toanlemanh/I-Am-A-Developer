import { useContext,useState,useEffect} from "react";
import { Alert, ImageBackground, Text, View } from "react-native";
import { styles } from '../styles/screenStyles/GameOverScreenStyle';
import Card from "../components/Card";
import { AuthContext } from "../store/auth";
import { UserContext } from "../store/user-context";
import { useWindowDimensions } from "react-native";
export default function EndGameScreen({ navigation }) {
  const auth = useContext(AuthContext);

  const windowHeight = useWindowDimensions().height;
  const windowWidth = useWindowDimensions().width;
  
  const [isPortrait,setIsPortrait] = useState(true);
  useEffect(()=>{
    if(windowHeight<windowWidth){
      setIsPortrait(false);
    }
    else{
      setIsPortrait(true);
    }
    
  },[windowWidth,windowWidth])
  const userContext = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Farewell {userContext.userState.userName} :{'('}
      </Text>
      <ImageBackground
        source={ require("../assets/images/rip.png")}
        style={styles.image}

      >
        {/* <View style={styles.text}>  */}


        {/* </View> */}
      </ImageBackground>
      <View style={styles.options} >
        <Card
          barHidden={true}
          onPress={() => {
            userContext.refresh();
            Alert.alert("You have started a new life!");
            navigation.navigate("MainScreen");
          }}
        >
          Start a new Life
        </Card>
        <Card
          barHidden={true}
          onPress={() => {
            auth.logout();
          }}
        >
          Log Out
        </Card>

      </View>
    </View>
  );
}
