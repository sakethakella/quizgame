let but=document.querySelector('.start');
let data;
let a=0;
let score=0;
const starttime=10;
let time=starttime*60;
let question_time=0;
let countdown=document.querySelector('#countdown');
let quiz=document.querySelectorAll('.questions2');
let next=document.querySelector('.next');
let options=document.querySelectorAll('.options');
let response=document.querySelectorAll('.response');
next.disabled=true;
but.addEventListener('click',()=>{
    setInterval(update_countdown,1000);
    setInterval(update_questiontime,1000);
    startquiz(a);
    but.disabled=true;
    next.disabled=false;
});

let update_countdown=()=>{
   let minutes=Math.floor(time/60);
   let seconds=time%60;
   seconds=seconds<10?'0'+seconds:seconds;
   countdown.innerHTML=`Time left ${minutes}:${seconds}`;
   time--;
   if(time===0){
    time=starttime*60;
   }
};

let update_questiontime=()=>{
    question_time++;
    let minutes=Math.floor(question_time/60);
    let seconds=question_time%60;
    seconds=seconds<10?'0'+seconds:seconds;
    response[1].innerHTML=`Time elapsed ${minutes}:${seconds}`;
}
const getquestions=async()=>{
    let p= await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple");
    data=await p.json();
}
getquestions();

function startquiz(a){
   quiz[0].innerHTML=data.results[a].question;
   options[0].innerHTML=data.results[a].correct_answer;
   options[1].innerHTML=data.results[a].incorrect_answers[0];
   options[2].innerHTML=data.results[a].incorrect_answers[1];
   options[3].innerHTML=data.results[a].incorrect_answers[2];
}

next.addEventListener('click',()=>{
    question_time=0;
   if(a>=9){
    alert(`your final score is ${score}`);
    next.disabled=true;
    options.forEach((val)=>{
        val.disabled=true;
    })
   }
   else{
    a=a+1;
    startquiz(a);
    options.forEach((val)=>{
        val.disabled=false;
    })
   } 
   response[0].innerHTML='';
   
})
options.forEach((but)=>{
    but.addEventListener('click',()=>{
        if(but.innerHTML===data.results[a].correct_answer){
            score++;
            response[0].innerHTML='correct answer';
            but.disabled=true;
        }
        else{
            response[0].innerHTML='wrong answer';
        }
        
    })
})
