
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './../tailwind.json';
import Home from './home';
import Services from './services';
import Details from './details';
import Profile from './profile';







const index = () => {
    const Stack = createStackNavigator();
    // console.log(AppProvider);

    return (
        <TailwindProvider  utilities={utilities} >
                <NavigationContainer independent={true}>
                    <Stack.Navigator screenOptions={{ headerShown: false}}>
                        <Stack.Screen name="home" component={Home} />
                        <Stack.Screen name="services" component={Services} />
                        <Stack.Screen name="details" component={Details} />
                        {/* <Stack.Screen name="profile" component={Profile} /> */}
                    </Stack.Navigator>  
                </NavigationContainer>
        </TailwindProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        fontFamily: "serif",
        backgroundColor: '#C3E2C2' ,
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50
    },
    link: {
        fontFamily: "serif",
        fontWeight: "bold",
        fontSize: 16,
        color: '#000',
    },
});



export default index

