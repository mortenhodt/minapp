import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "../authentication/Login";
import SignUp from "../authentication/SignUp";
import HomeScreen from "../ProfileViews/HomeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapsScreen from "../Map/MapsScreen";

//Instantiering af; to stacknavigator instanser og én bottomtabnavigator
const StackAuthentication = createStackNavigator();
const StackEntrance = createStackNavigator();
const Tab = createBottomTabNavigator();


//Stack komponent til navigering mellem login og signup.
function AuthStack() {
    return (
        <StackAuthentication.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'black',
                headerStyle: { backgroundColor: 'white' },
            }}>
            <StackAuthentication.Screen name="Login" component={Login} />
            <StackAuthentication.Screen name="SignUp" component={SignUp} />
        </StackAuthentication.Navigator>
    );
}

//Stack komponent til navigering mellem maps og entrance siderne
function EntranceStack() {
    return (
        <StackEntrance.Navigator
            initialRouteName="entrance"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerShown: false
            }}>
            <StackEntrance.Screen
                name="entrance"
                component={MapsScreen} />

        </StackEntrance.Navigator>
    );
}

// Bottom tab navigator til navigering mellem homepage og entrance-stack-siderne
function ProfileTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen
                name="entranceStack"
                component={EntranceStack}
            />
        </Tab.Navigator>
    );
}

//Eksport af komponenter, således disse kan anvendes
export {AuthStack, ProfileTab, EntranceStack}