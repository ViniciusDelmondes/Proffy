import { StatusBar } from 'expo-status-bar';
import React from 'react';

import {AppLoading} from 'expo'
// O useFonts pode ser importado em qualquer lugar das fonts
import {Archivo_400Regular, Archivo_700Bold, useFonts} from '@expo-google-fonts/archivo'
import { Poppins_400Regular, Poppins_600SemiBold} from '@expo-google-fonts/poppins'
import AppStack from './src/routes/AppStack';

export default function App() {
  //Precisamos adicionar o let [fontsLoaded]
  //Assim que a fontsLoaded ficar true, é porque as fontes foram carregadas.
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  });
  //Se o meu fontsLoaded for false, ou seja, se não estiver carregado
  //Vamos mostrar o AppLoading que é a tela de carregamento inicla do aplicativo
  if (!fontsLoaded){
    return <AppLoading/>
  //Caso ele for true, ou seja, as fontes forem carregadas 
  // ele irá mostrar nossa tela inicial do aplicativo.
  } else {

    return (
        <>
          <AppStack />
          <StatusBar style="light" />
        </>
    );
  }
}

//Statusbar são as configurações da nosso Nav do celular