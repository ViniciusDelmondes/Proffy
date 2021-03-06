import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

import logoIMG from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'

import studyIcon from '../../assets/images/icons/study.svg'
import giveclassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import './styles.css'
import api from '../../services/api';
 
function Landing(){
    // Mostrando o total de conexões que está em nosso banco de dados
    const [totalConnections, setTotalConnectios] = useState(0);
    // O then captura a resposta
    useEffect(() => {
        api.get('/connections').then(response => {
        // response.data.total está percorrendo a resposta para filtrar o dado.
            const total = response.data.total;
            //Setando o valor inicial que estava 0 com os dados vindo da API
            setTotalConnectios(total);
        })
    }, []);

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoIMG} alt="Proffy" />
                    <h2> Sua plataforma de estudos online. </h2>
                </div>
                <img 
                    src={landingImg} 
                    alt="Plataforma de Estudos" 
                    className="hero-image"
                />
                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar" />
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={giveclassesIcon} alt="Dar aulas" />
                        Dar aulas
                    </Link>
                </div>
                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas 
                    <img src={purpleHeartIcon} alt="Coração roxo" />
                </span>
            </div>
        </div>
    );
}

export default Landing;