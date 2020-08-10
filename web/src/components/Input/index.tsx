import React, {InputHTMLAttributes} from 'react'

import './styles.css'

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
}

//Para acessar todas as propriedades de um elemento HTML, importamos e adicionamos o
// extends (a tag) InputHTMLAttributes<HTMLInputElement>

// Para usarmos os componentes precisamos transformar em constante ao invés de function
// e usar o React.FC<> passando os parametros do interface acima.

//Não é necessário usar props no parametro arrow function e sim usar desestruturação com chaves

//Para coletar todos os atributos de uma tag usamos os (...rest).
const Input: React.FC<inputProps> = ({label, name, ...rest}) => {
    return(
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest} />
        </div>
    );
}

export default Input;