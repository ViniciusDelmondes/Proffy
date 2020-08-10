import React, { useState } from 'react'
import { View } from 'react-native';
import {useFocusEffect} from '@react-navigation/native'
import styles from './styles'
import { ScrollView } from 'react-native-gesture-handler';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader';

import AsyncStorage from '@react-native-community/async-storage'

function Favorites(){
    const [favorites, setFavorites] = useState([])

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                
                setFavorites(favoritedTeachers);
            }
        });
    }
    //O UseFocusEffect irá fazer com que a nossa aba favoritos, ao ir para ela
    // Ela irá fazer o realod da página trazendo os favoritos,
    // sem isso teriamos que ficar dando reload no expo para aparecer os resultados
    useFocusEffect(() => {
        loadFavorites();
    },)

    return (
        <View style={styles.container}>
            <PageHeader title="Meus Proffys Favoritos"/>

            <ScrollView
            style={styles.teacherList}
            //Aplica estilos na Scrollview
            contentContainerStyle={{
                paddingHorizontal: 8,
                paddingBottom: 16,
            }}
        >
            {favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited
                        />
                    );
                })}
        </ScrollView>
        </View>
    )
}

export default Favorites;