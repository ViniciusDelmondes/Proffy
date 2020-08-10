import React, {SelectHTMLAttributes} from 'react'

import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    //Criando as matérias para serem usadas quando importar esse select aqui na
    //página formulário do professor, pois as opções estarão lá.
    options: Array<{
        value: string;
        label: string;
    }>;
}

//Para acessar todas as propriedades de um elemento HTML, importamos e adicionamos o
// extends (a tag) SelectHTMLAttributes<HTMLSelectElement>

// Para usarmos os componentes precisamos transformar em constante ao invés de function
// e usar o React.FC<> passando os parametros do interface acima.

//Não é necessário usar props no parametro arrow function e sim usar desestruturação com chaves

//Para coletar todos os atributos de uma tag usamos os (...rest).

//Todo MAP ao retornar um HTML,somente a primeira TAG precisa obter a propriedade KEY.
const Select: React.FC<SelectProps> = ({label, name, options, ...rest}) => {
    return(
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value="" id={name} {...rest}>
                <option value="" disabled hidden> Selecione uma opção </option>
                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        </div>
    );
}

export default Select;