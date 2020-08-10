import React, {useState, FormEvent} from 'react';
import {useHistory} from 'react-router-dom'

import './styles.css'
import api from '../../services/api';

import warningIco from '../../assets/images/icons/warning.svg'

import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';


function TeacherForm(){
    //Redirecionando o usuário após o cadastro de aula para a página principal
    const history = useHistory();

    //Colentando as informações digitadas pelo usuário
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    //Colentando as informações digitadas pelo usuário
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');


    //Mostrando caso o professor selecione mais de 1 horário com estado
    const [scheduleItems, setScheduleItems] = useState([
        {week_day: 0, from: '', to: '',}
    ])

    // Esta função irá criar novos arrays de {week_day: 0, from: '', to: '',}
    // O index é a posição inicial, no caso week_day:0
    // position é o primeiro paramêtro mapeado pela nova array criada pelo map
    function setScheduleItemValue(position: number, field: string, value: string){
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position){
                //O [field]: value | vai sobrescrever a variavel week_day que já consta dentro do ...scheduleItem
                // O nome está como field pois não é possível duplicar nome das variaveis.
                return {...scheduleItem, [field]: value }
            }

            return scheduleItem;
        });
        //Vai setar o dia que o usuário colocou, sobrescrevendo a posição 0 inicial
        setScheduleItems(updateScheduleItems)
    }
  
    // Função para adicionar novo horário (aparecendo a opção de cadastrar um novo horário)
    function addNewScheduleItem() {
        setScheduleItems([
            // Com o ...scheduleItems estamos pegando o que já está setado em nosso estado inicial
            ...scheduleItems,
            {week_day: 0, from: '', to: '',}
        ]);
    }

    //Adicionando a propriedade e: FormEvent e o e.preventDefault() estamos retirando a ação
    // padrão do button submit que é dar reload na página
    //Função para coletar todos os dados do formulário e jogar no backend
    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso')

            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro')
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher este formulário de inscrição"    
            />
        
        <main>
            <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus dados</legend>
                        <Input 
                            name="name" 
                            label="Nome completo" 
                            value={name} 
                            //Coletando os dados digitados pelo usuário através do campo nome(usamos o target.value)
                            onChange={(e) => {setName(e.target.value)}} 
                        />

                        <Input 
                            name="avatar" 
                            label="Avatar"
                            value={avatar} 
                            //Coletando os dados digitados pelo o usuário através do campo avatar(usamos o target.value)
                            onChange={(e) => {setAvatar(e.target.value)}} 
                        />
                        <Input 
                            name="whatsapp" 
                            label="WhatsApp"
                            value={whatsapp} 
                            //Coletando os dados digitados pelo o usuário através do campo de whatsapp(usamos o target.value)
                            onChange={(e) => {setWhatsapp(e.target.value)}} 
                        />
                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio} 
                            //Coletando os dados digitados pelo o usuário através do campo de biografia(usamos o target.value)
                            onChange={(e) => {setBio(e.target.value)}} 
                        />
                </fieldset>

                <fieldset>
                    <legend>Sobre a Aula</legend>
                        <Select 
                            name="subject" 
                            label="Matéria"
                            value={subject}
                            //Coletando os dado selecionado pelo o usuário no select matéria (usamos o target.value)
                            onChange={(e) => {setSubject(e.target.value)}}
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

                        <Input 
                            name="cost" 
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => {setCost(e.target.value)}}    
                        />

                </fieldset>

                <fieldset>
                    <legend>
                        Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                            + Novo horário
                        </button>
                    </legend>

                    {scheduleItems.map((scheduleItem, index) => {
                        return (
                            <div key={scheduleItem.week_day} className="schedule-item">
                            <Select 
                                name="week_day" 
                                label="Dia da Semana"
                                value={scheduleItem.week_day}
                                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                                name="from" 
                                label="Das" 
                                type="time"
                                value={scheduleItem.from}
                                onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                            />
                            <Input 
                                name="from" 
                                label="Até" 
                                type="time"
                                value={scheduleItem.to}
                                onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                            />

                    </div>
                        );
                    })}
                    
                </fieldset>

                <footer>
                    <p>
                        <img src={warningIco} alt="Aviso importante"/>
                        Importante! <br/>
                        Preencha todos os dados
                    </p>
                    <button type="submit">
                        Salvar Cadastro
                    </button>
                </footer>
            </form>
        </main>
        </div>
    )
}

export default TeacherForm;