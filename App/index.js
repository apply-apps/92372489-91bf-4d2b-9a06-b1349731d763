// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, ScrollView, View } from 'react-native';
import axios from 'axios';

const API_URL = "http://dev.192.168.1.107.nip.io:3300/chatgpt";

export default function App() {
    const [hero, setHero] = useState('');
    const [story, setStory] = useState('');

    const fetchFairyTale = async () => {
        try {
            const response = await axios.post(API_URL, {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please create a fairy tale." },
                    { role: "user", content: `Create a fairy tale featuring a hero named ${hero}.` }
                ],
                model: "gpt-4o"
            });
            const { data } = response;
            setStory(data.response);
        } catch (error) {
            console.error("Error fetching fairy tale", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Create a Fairy Tale</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter the name of the hero..."
                    value={hero}
                    onChangeText={setHero}
                />
                <Button
                    title="Generate Fairy Tale"
                    onPress={fetchFairyTale}
                    color="#841584"
                />
                {story ? (
                    <View style={styles.storyContainer}>
                        <Text style={styles.story}>{story}</Text>
                    </View>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '20px',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: '100%',
    },
    storyContainer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    story: {
        fontSize: 16,
        textAlign: 'justify',
    },
});