import React from 'react'

import backIcon from '../../assets/images/icons/back.svg'
import logoIcon from '../../assets/images/logo.svg'

import {Link} from 'react-router-dom'

import './styles.css'

// Um componente ao enviar propriedades/params precisam estar em formato de constante

// O ponto de interrogação está dizendo que não é obrigatório ter descrição
interface PageHeaderProps {
    title: string;
    description?: string;
}

// Para usar as propriedades, colocamos o react FC 
// O React.FC diz que é um componente escrito em formato de função.

// Children é os atributos adicionados dentro do componente

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar" />
                </Link> 
            <img src={logoIcon} alt="Proffy" />
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                {props.description && <p>{props.description}</p>}

                {props.children}
            </div>
            
        </header>
    );
}

export default PageHeader;

// Para chamar uma propriedade não obrigatória, usamos operadores ternários
// {props.description && <p>{props.description}</p>}