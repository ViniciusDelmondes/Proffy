import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles'
import PageHeader from '../../components/PageHeader/index'
import TeacherItem, { Teacher } from '../../components/TeacherItem/index';
import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler';

import {Feather} from '@expo/vector-icons'
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList(){
    //Carregando favoritos
    const [favorites, setFavorites] = useState<number[]>([])
    //Estado para armazenar todas as informações e enviar ao banco de dados
    const [teachers, setTeacher] = useState([]);
    // Criando estados para coletar as informações
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    //Buscando todos os professores que o usário favoritou usanso Storage
    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })
                setFavorites(favoritedTeachersIds);
            }
        });
    }

    useFocusEffect(() => {
        loadFavorites();
    })
    // Função de enviar os dados para nossa api após clicar no botão filtrar
    async function handlefiltersSubmit(){
        loadFavorites();
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });
        //Assim que for filtrado, ele irá fechar os filtros da tela
        setFilterVisible(false);

        //Setando os valores de nosso estado
        setTeacher(response.data);
    }

    //Estado para ao clicar em aparecer os filtros, os filtros aparecem na tela
    // Colocamos o tipo booleano, ou seja, false para desaparecer e true quando o usuário clicar
    const [filterVisible, setFilterVisible] = useState(false);

    //Função que ao clicar os filtros irão aparecer e desaparecer
    function handleToggleFilterVisible(){
        setFilterVisible(!filterVisible)
    }

    return (
    <View style={styles.container}>
        <PageHeader 
            title="Proffys Disponíveis" 
            headerRight={(
                <BorderlessButton onPress={handleToggleFilterVisible}>
                    <Feather name="filter" size={20} color="#fff"/>
                </BorderlessButton>

            )}
            
        >
            { filterVisible && (
            <View style={styles.searchForm}>
                <Text style={styles.label}>Matéria</Text>
                <TextInput
                    style={styles.input}
                    value={subject}
                    onChangeText={text => setSubject(text)}
                    placeholder="Qual a matéria?"
                    placeholderTextColor="#c1bccc"
                />

                <View style={styles.inputGroup}>
                    <View style={styles.inputBlock}>
                        <Text style={styles.label}>Dia da Semana</Text>
                        <TextInput
                        style={styles.input}
                        value={week_day}
                        onChangeText={text => setWeekDay(text)}
                        placeholder="Qual o dia?"
                        placeholderTextColor="#c1bccc"
                    />
                    </View>

                    <View style={styles.inputBlock}>
                        <Text style={styles.label}>Horário</Text>
                        <TextInput
                        style={styles.input}
                        value={time}
                        onChangeText={text => setTime(text)}
                        placeholder="Qual horário?"
                        placeholderTextColor="#c1bccc"
                    />
                    </View>
                </View>

                <RectButton onPress={handlefiltersSubmit }style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Filtrar</Text>
                </RectButton>
            </View>
            )}
        </PageHeader>
        
        <ScrollView
            style={styles.teacherList}
            //Aplica estilos na Scrollview
            contentContainerStyle={{
                paddingHorizontal: 8,
                paddingBottom: 16,
            }}
        >
            {/* Retornando resposta do banco de dados dos dados dos professores*/}
            {/* RSempre que retormar um elemento HTML (JSX) do MAP precisamos colocar uma key
            */}
            {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            //Verificando se dentro dos meus favorites tem algum id, verificamos com includes
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}
                
        </ScrollView>
    </View>
    );
}

export default TeacherList;