import { useCallback, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import YouTube from 'react-native-youtube';
import YouTubePlayer from 'react-native-youtube-iframe';

const Video = () => {

    const [playing ,setPlaying] = useState(false);

    const onStateChange = useCallback(state => {
        if(state === 'ended'){
            setPlaying(false);
            Alert.alert('video has finished playing!');
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying(prev =! prev);
    },[]);


  return (
    <View>
        <Text style={{fontFamily: "serif", fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 10, color: '#689A7C', }}>Want to know more about Working Process of EvePlano? Watch this video to know how EvePlano contacts you and execute your event plans!</Text>
        <YouTubePlayer
        style={{ borderRadius:5, marginTop: 10}}
        height={230}
        play= {playing}
        videoId={'I-XjdcpfXoI'}
        onChangeState={onStateChange}
        />
        
    </View>
  )
}

export default Video

const styles = StyleSheet.create({
  container: {
  },
});
