import {Request, Response} from 'express'

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';
import { StringTagSupport } from 'knex';

interface ScheduleItem{
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    //Para fazer uma listagem usamos o index()
    async index(request: Request, response: Response){
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;
        //Caso o usuário não digite o dia da semana, a matéria ou não informou o horário que ele quer marcar
        // retornar erro. 
        if (!filters.week_day || !filters.subject || !filters.time ){
            return response.status(400).json({
                error: 'Missing filters to search classes'
            });
        }
        //Convertendo a String time para minutos
        const timeInMinutes = convertHourToMinutes(time);

        //Criando nossas querys

        const classes = await db('classes')
        //VErificando horário se já está marcado
        .whereExists(function(){
            this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` =??', [Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
        })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*'])


        return response.json(classes);
    }

    

    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        //usando o transaction para que a aplicação rode todas as querys, e se 1
        // der erro, a operação de cadastro de todas as informações não sera realizada
        const trx = await db.transaction()
    
        // pedindo pro meu bd tentar fazer todas as ações caso ocorra, será exibido o erro com o catch.
        try{
             // Inserindo as informações do POST dentro da tabela users
        // Precisamos pegar os ids da tabela users para referenciar na tabela de aulas que é a tabela abaixo
        const insertedUsersIds = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio,
        });
    
        //Pegando o primeiro ID criado pelo o insert acima
        // Para fazer isso, colocamos: 
        const user_id = insertedUsersIds[0];
    
        // Inserindo as informações do POST na tabela de aulas
        
        const insertedClassesIds = await trx('classes').insert({
            subject,
            cost,
            //Depois referenciamos o user id aqui
            user_id,
        });
        //Retornando o ID da aula que foi inserida pela query acima
        //para usar na query abaixo
        const class_id = insertedClassesIds[0];
    
        //Transformando os horários em minutos: 
        const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
            return {
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to),
            };
        })
    
        await trx('class_schedule').insert(classSchedule);
    
        // Só neste momento que ele insere tudo no banco de dados
        await trx.commit();
    
    
        // Capturando resposta de sucesso
        return response.status(201).send();
        
        //Capturando resposta de erro
        } catch (err) {
            //Serve para desfazer qualquer alteração no banco no memento do try
            await trx.rollback();
    
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }
}