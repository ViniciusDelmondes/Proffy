export default function convertHourToMinutes(time: string){
    //8:00
//criada uma função para converter horas em minutos para usar no arquivo de routes.    
const [hour, minutes] = time.split(':').map(Number);
const timeInMinutes = (hour * 60) + minutes;

return timeInMinutes;

}