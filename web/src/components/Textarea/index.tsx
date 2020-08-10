import React, {TextareaHTMLAttributes} from 'react'

import './styles.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
}

//Para acessar todas as propriedades de um elemento HTML, importamos e adicionamos o
// extends (a tag) TextareaHTMLAttributes<HTMLTextareaElement>

// Para usarmos os componentes precisamos transformar em constante ao invés de function
// e usar o React.FC<> passando os parametros do interface acima.

//Não é necessário usar props no parametro arrow function e sim usar desestruturação com chaves

//Para coletar todos os atributos de uma tag usamos os (...rest).
const Textarea: React.FC<TextareaProps> = ({label, name, ...rest}) => {
    return(
        <div className="Textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea id={name} {...rest} />
        </div>
    );
}

export default Textarea;