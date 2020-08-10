import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'
import api from '../../services/api';

//Exportado para o TeacherList pois vamos usar o teacher como propriedade para
//receber estes objetos abaixo
export interface Teacher{
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps{
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {
    //Criando conexão após o botão de entrar em contato no whatsapp ser clicado.
    function createNewConnection(){
        api.post('connections', {
            user_id: teacher.id,
        })
    }


    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name}/>
                <div>
                    <strong> {teacher.name} </strong>
                    <span> {teacher.subject} </span>
                </div>
                    </header>

                    <p>{teacher.bio}</p>

                    <footer>
                        <p>
                            Preço/hora: 
                            <strong> R$ {teacher.cost} </strong>
                        </p>
                        <a 
                        //O target blank serve para abrir o link em outra aba
                        target="_blank"
                        onClick={createNewConnection} 
                        href={`https://wa.me/${teacher.whatsapp}`}
                        >
                            <img src={whatsappIcon} alt="WhatsApp"/>
                            Entrar em contato!
                        </a>
                    </footer>
                </article>
    )
}

export default TeacherItem;