import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';
import {Ionicons} from '@expo/vector-icons'

const {Navigator, Screen} = createBottomTabNavigator();
// Criando nossas rotas em abas
function StudyTabs(){
    return (
    <Navigator
    //Estilizando a area aonde fica as barras.
        tabBarOptions={{
            style: {
                //Elevation é proriedade de sombras no Android
                elevation: 0,
                //Elevation é proriedade de sombras no ios
                shadowOpacity: 0,
                height: 64,
            },
            //Estilizando as abas
            tabStyle: {
                flexDirection:'row',
                alignItems: 'center',
                justifyContent: 'center',
            },
            //Estilização dos icones
            iconStyle:{
                flex: 0,
                width: 20,
                height: 20,
            },
            // Estilização do texto das tabs
            labelStyle: {
                fontFamily: 'Archivo_700Bold',
                fontSize: 13,
                marginLeft: 16,
            },
            //Cor de fundo da aba quando ela não estiver selecionada
            inactiveBackgroundColor: '#fafafc',
            //Cor de fundo da aba quando ela estiver selecionada
            activeBackgroundColor: '#ebebf5',

            //Cor do texto quando não estiver selecionada
            inactiveTintColor: '#c1bccc',
            //Cor do texto quando estiver selecionada
            activeTintColor: '#32264d',
        }}
    >
        <Screen 
            name="TeacherList" 
            component={TeacherList}
            options={{
                //Mudando o nome das abas
                tabBarLabel: 'Proffys',
                //Adicionando imagem/icones em nossas abas
                tabBarIcon: ({color, size, focused}) => {
                    return (
                        //O size e o color irão aumentar o icone
                        <Ionicons name="ios-easel" size={size} color={focused ? '#8257e5' : color}/> 
                        // O focused irá alterar as cores dos icons caso o focused seja true e ser for falso será
                        // a cor padrão       
                    )
                }
            }}
        />
        <Screen 
            name="Favorites" 
            component={Favorites}
            options={{
                //Mudando o nome das abas
                tabBarLabel: 'Favoritos',
                //Adicionando imagem/icones em nossas abas
                tabBarIcon: ({color, size, focused}) => {
                    return (
                        //O size e o color irão aumentar o icone
                        <Ionicons name="ios-heart" size={size} color={focused ? '#8257e5' : color}/>        
                    )
                }
            }}
        />
    </Navigator>
    )
}

export default StudyTabs;