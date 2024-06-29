import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements'
import realm from '../../store/realm'

const ContactListScreen = (props) => {
    const { navigation } = props;

    const [data, setData] = useState([]);

    useEffect(() => {
        const contactListPage = navigation.addListener(
            'focus', () => {
                getData();
            }
        )

        return contactListPage;
    }, []);

    // const getData = () => {
    //     const allData = realm.objects('Contact');
    //     setData(allData);
    // };

    const getData = () => {
        const allData = realm.objects('Contact').sorted('name'); // Mengurutkan data berdasarkan nama
        setData(allData);
    };

    const deleteContact = (id) => {
        const data = realm.objects('Contact').filtered(`id = ${id}`);
        realm.write(() => {
            realm.delete(data);
        });

        const collectData = realm.objects('Contact');
        setData(collectData);
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                contentContainerStyle={{ padding: 8 }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{
                        margin: 8,
                        padding: 16,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{}}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                            }}>
                                {item.name}
                            </Text>
                            <Text style={{
                                fontSize: 18,
                            }}>
                                {item.phoneNumber}
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => deleteContact(item.id)}
                            >
                                <Icon
                                    name="cross"
                                    type="entypo"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            margin: 8,
                            textAlign: 'center',
                            alignItems: 'center'
                        }}>
                            No Items
                        </Text>
                    </View>
                }
            />
            <View style={{
                position: "absolute",
                bottom: 16,
                right: 16
            }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#B7F1D4",
                        padding: 16,
                        borderRadius: 100
                    }}
                    onPress={() => {
                        navigation.navigate('AddContact')
                    }}
                >
                    <Icon
                        name='plus'
                        type='antdesign'
                        size={24}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ContactListScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
})
