import AsyncStorage from '@react-native-async-storage/async-storage';


const get = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;

    } catch (e) {
        console.log(e);
    }
};

const set = async (token) => {

    try {
        await AsyncStorage.setItem("token", token)

    } catch (e) {
        console.log(e);
    }
}


const remove = async () => {

    try {
        await AsyncStorage.removeItem("token")

    } catch (e) {
        console.log(e);
    }
}


export default { get, set, remove };


