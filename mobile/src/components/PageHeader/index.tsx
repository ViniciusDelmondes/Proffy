import React, { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png'
import logoImg from '../../assets/images/logo.png'

// BorderlessButton botão sem fundo
import styles from './styles'
import { useNavigation } from '@react-navigation/native';

//Definindo as propriedades que iremos compartilhar neste componente
interface PageHeaderProps{
    title: string;
    // O ReactNode pode receber um componente como uma propriedade
    // O ponto de interrogação é para dizer se é opcional
    headerRight?: ReactNode;
}
// Transformando função em um componente que irá receber props
const PageHeader: React.FC<PageHeaderProps> = ({title, children, headerRight}) => {
    const navigation = useNavigation();
    
    // Função de voltar
    function handleGoBack(){
        // Para forçar que o app não volte para as abas e sim para a página principal usamos o navigate
        navigation.navigate('Landing');
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton onPress={handleGoBack}>
                    <Image source={backIcon} resizeMode="contain"/>
                </BorderlessButton>

                <Image source={logoImg} resizeMode="contain"/>
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>

                {/* Vamos colocar nosso componente Buttonicon para filtrar os professores*/}
                {headerRight}
            </View>

            {/* Este children serve para que possamos colocar conteudo dentro do nosso componente exportado*/}
            {children}
        </View>
    )
}

export default PageHeader;