import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import realm from '../../store/realm';

const AddContactScreen = (props) => {
    const { navigation } = props;

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const saveContact = () => {
        if (name !== '' && phoneNumber !== '') {
            realm.write(() => {
                const data = realm.objects('Contact');
                const lastId = data.length === 0 ?
                    1
                    :
                    data[data.length - 1].id;

                realm.create('Contact', {
                    id: data.length === 0 ? lastId : lastId + 1,
                    name: name,
                    phoneNumber: phoneNumber
                });
            });
            navigation.navigate('ContactList');
        } else {
            alert('Cant save your contact!');
        }
    }

    return (
        <View style={{
            margin: 16,
            marginBottom: 0
        }}>
            <Text style={{
                marginBottom: 8,
                fontWeight: 'bold'
            }}>
                Name
            </Text>
            <TextInput
                style={{
                    height: 40,
                    borderWidth: 1,
                    paddingLeft: 8,
                    paddingRight: 8,
                    borderRadius: 10,
                    marginBottom: 16
                }}
                onChangeText={setName}
                placeholder='Write Name Here'>
            </TextInput>
            <Text style={{
                marginBottom: 8,
                fontWeight: 'bold'
            }}>
                Phone Number
            </Text>
            <TextInput
                style={{
                    height: 40,
                    borderWidth: 1,
                    paddingLeft: 8,
                    paddingRight: 8,
                    borderRadius: 10,
                    marginBottom: 10
                }}
                onChangeText={setPhoneNumber}
                placeholder='Write Phone Number Here'>
            </TextInput>

            {/* Save Button */}
            <View style={{
                alignItems: 'center',
                marginTop: 16
            }}>
                <TouchableOpacity style={{
                    backgroundColor: '#B7F1F4',
                    padding: 16,
                    borderRadius: 10
                }}
                    onPress={saveContact}
                >
                    <Text style={{
                        fontWeight: 'bold'
                    }}>
                        Save Contact
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddContactScreen

const styles = StyleSheet.create({})