const Commando = require('discord.js-commando');
const bot = new Commando.Client({commandPrefix: '='});
const TOKEN = 'NTM2MDIyMTEzNzkwOTg0MjAz.DyQpZw.GSdXmKsFgqbG8jFQLLELMCwDnNQ';

var previous = 0;

bot.on('message',function(message){
    if(message.channel.name === "日本-counting"){
        var botNum;
        var number = message.content;
        var tens = '万千百十';
        var digits = '零一二三四五六七八九';
        var digit = '十一二三四五六七八';
        var digitsSplit = digits.split('');
        var bool = false;
        var engNum = [];
        var num = [];
        var count = 0;

        number = number.split('');

        for(var i = 0; i < number.length; i++){
            if(!(tens.includes(number[i]) || (digits.includes(number[i])))){
                message.delete(1000);
                message.author.send("That number was not the successor to the previous number, 馬鹿.");
                return;
                break;
            }
        }

        for(i = 0; i < number.length; i++){
            if(digits.includes(number[i])){
                engNum.push(digitsSplit.indexOf(number[i]));
            }
            if(tens.includes(number[i])){
                if(number[i] === '万'){
                    engNum.push(10000);
                }
                else if(number[i] === '千'){
                    engNum.push(1000);
                }
                else if(number[i] === '百'){
                    engNum.push(100);
                }
                else if(number[i] === '十'){
                    engNum.push(10);
                }
            }
        }

        console.log(engNum);

        if(engNum.includes(10000)){
            num.push(10000 * engNum[engNum.indexOf(10000) - 1]);
        }
        if(engNum.includes(1000) && engNum[engNum.indexOf(1000) - 1] != 0 && !tens.includes(engNum[engNum.indexOf(1000) - 1])){
            num.push(1000 * engNum[engNum.indexOf(1000) - 1]);
        }
        if(engNum.includes(100) && engNum[engNum.indexOf(100) - 1] != 0 && !tens.includes(engNum[engNum.indexOf(100) - 1])){
            num.push(100 * engNum[engNum.indexOf(100) - 1]);
        }
        if(engNum.includes(10) && engNum[engNum.indexOf(10) - 1] != 0 && !tens.includes(engNum[engNum.indexOf(10) - 1])){
            num.push(10 * engNum[engNum.indexOf(10) - 1]);
        }
        if(engNum[engNum.length - 1].toString().length === 1){
            num.push(engNum[engNum.length - 1]);
        }

        for(i = 0; i < num.length; i++){
            num[i] = parseInt(num[i]);
            count += num[i];
        }
        

        if(previous === 0){
            previous = count;
        }
        else{
            if(count != previous + 1){
                message.author.send("That number was not the successor to the previous number, 馬鹿.");
                message.delete(1000);
            }
            else{
                previous++;
            }
        }
        console.log(previous);
    }
});

bot.on('ready', function(){
    console.log('Ready');
});

bot.login(TOKEN);