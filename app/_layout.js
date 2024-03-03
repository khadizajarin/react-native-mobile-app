
import { Stack } from "expo-router";
import { Image } from "react-native";


const CustomHeader = () => {
  return (
    <Image class="font-extrabold"
      source={{ uri : "https://media.istockphoto.com/id/1830586430/photo/green-cement-floor-with-green-light-circles-bokeh-used-for-christmas-or-festival-day-festive.jpg?s=612x612&w=0&k=20&c=OS4j2dcypxhfkpPSRTckGrT_mbBhmGKfXfISj6M2MSw="}}
      style={{ width: "100%", height: "100%", position: "absolute", opacity: 0.6, }}
    />
  );
};


export default function Layout(){
    return(
        <Stack  screenOptions={{ 
            headerBackground: () =>  <Image class="font-extrabold"
            source={{ uri : "https://media.istockphoto.com/id/1830586430/photo/green-cement-floor-with-green-light-circles-bokeh-used-for-christmas-or-festival-day-festive.jpg?s=612x612&w=0&k=20&c=OS4j2dcypxhfkpPSRTckGrT_mbBhmGKfXfISj6M2MSw="}}
            style={{ width: "100%", height: "100%", position: "absolute", opacity: 0.6, }}
          />,
            headerTitle: "EvePlano",
            headerTitleAlign: "center",
            headerTintColor : "black",
            headerTitleStyle : {
                color: "white",
                fontFamily: "serif",
                fontWeight: "bold",
                fontSize: 34
            }
        }}/>
        
    )
}