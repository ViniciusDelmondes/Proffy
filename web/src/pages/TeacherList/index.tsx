import React, { useState, FormEvent } from 'react';
import api from '../../services/api';

import './styles.css'

import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

function TeacherList(){
    //Salvando informações dos professores do resultado do filtro para exibir em tela para
    //o usuário.
    const [teachers, setTeachers] = useState([]);
    //Armazendo informações do filtro
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    //Função para filtrar as informações de professores cadastrados
    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        //Usamos o async/await para aguardar o carregamento dos professores para
        //que depois a função seja executada.
        const response = await api.get('classes', {
            //Quando estamos listando informações(querys), usamos o params
            //Se fosse cadastrado seria POST diretamente
            params: {
                subject,
                week_day,
                time
            }
        });
        setTeachers(response.data)
    }

    // Mostrando os items filtrados na tela usando o MAP abaixo
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os Proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                <Select 
                    name="subject" 
                    label="Matéria"
                    value={subject}
                    //Coletando informação do campo Matéria
                    onChange={(e) => {setSubject(e.target.value)} }
                    //Adicionando opções do Select com as matérias
                    options={[
                        {value: 'Artes', label: 'Artes' },
                        {value: 'Biologia', label: 'Biologia' },
                        {value: 'Ciências', label: 'Ciências' },
                        {value: 'Matemática', label: 'Matemática' },
                        {value: 'Filosofia', label: 'Filosofia' },
                        {value: 'Educação Física', label: 'Educação Física' },
                        {value: 'Física', label: 'Física' },
                        {value: 'Geografia', label: 'Geografia' },
                        {value: 'História', label: 'História' },
                        {value: 'Química', label: 'Química' },
                        {value: 'Português', label: 'Português' },
                        {value: 'Sociologia', label: 'Sociologia' },
                    ]}
                />
                <Select 
                    name="week_day" 
                    label="Dia da Semana"
                    value={week_day}
                    //Coletando informação do campo Dia da Semana
                    onChange={(e) => {setWeekDay(e.target.value)} }
                    //Adicionando opções do Select com as matérias
                    options={[
                        {value: '0', label: 'Domingo' },
                        {value: '1', label: 'Segunda-feira' },
                        {value: '2', label: 'Terça-feira' },
                        {value: '3', label: 'Quarta-feira' },
                        {value: '4', label: 'Quinta-feira' },
                        {value: '5', label: 'Sexta-feira' },
                        {value: '6', label: 'Sábado' },
                    ]}
                />
                    <Input 
                        type="time" 
                        name="time" 
                        label="Hora"
                        //Coletando informação do campo time
                        value={time}
                        onChange={(e) => {
                            setTime(e.target.value)} }
                    />

                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>
                })}
            </main>
        </div>
    )
} 

export default TeacherList;