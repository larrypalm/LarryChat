const socket = io.connect();

let name = document.getElementById('name');               //Stores the username
let input = document.getElementById('input');             //Stores the users input (message)
let messageBox = document.getElementById('messageBox');   //Stores the messages that users sent
let username = "";                                        //Temporary variable to hold the username
let questions = [                                         //The questions the bot can answer
  'hur många bultar finns det i ölandsbron?',
  'vad är klockan?',
  'vilka djur ingår i the big five?',
  'vad heter historiens bästa fotbollsspelare?',
  'vilket är det bästa fotbollslaget i storbrittanien?'
];
let random = "";                                          //Initiate variable to hold a random question
let date = "";                                            //Initiate variable for initiation of Date() method
let timestamp = "";                                       //Initiate variable to hold timestamp from date-variable

//Eventlistener for enter key
input.addEventListener('keypress', (e) =>{
  if(event.which == 13  || event.keyCode==13){
    date = new Date();
    timestamp = date.getHours() +":"+ date.getMinutes()+":" +date.getSeconds();
    random = questions[Math.floor(Math.random() * questions.length)];

    socket.emit('chat', {timestamp, username: username, value: input.value});
    input.value='';
  }
});

//Eventlistener for pressing 'submit button' instead of enter key
$('#submitChat').click(function(){
  date = new Date();
  timestamp = date.getHours() +":"+ date.getMinutes()+":" +date.getSeconds();
  random = questions[Math.floor(Math.random() * questions.length)];

  socket.emit('chat', {timestamp, username: username, value: input.value});
  input.value='';
});

//Eventhandler for storing username when enter key is pressed
name.addEventListener('keypress', function(e){
  if(event.which == 13  || event.keyCode==13){
    username = this.value;
    this.parentElement.removeChild(this);
    $('#submitUser').hide();
  }
});

//Eventhandler for storing username when submit button is clicked
$('#submitUser').click(function(){
  username = document.getElementById("name").value;
  $('#submitUser, #name').hide();
});

//Client code, this happens when LarryChat-clientside is accessed
socket.on('message', (data)=>{
  let p = document.createElement('p');
  p.innerHTML = `${data.timestamp} ${data.username}: ${data.value}`;
  messageBox.appendChild(p);

  if(data.value.toLowerCase()==="hej"){

    let p = document.createElement('p');
    p.innerHTML = `Bot: Hej på dig ${data.username}`;
    messageBox.appendChild(p);

  }
  else if(data.value.toLowerCase() === "hur många bultar finns det i ölandsbron?"){
    let p = document.createElement('p');
    p.innerHTML = `Bot: Det finns 7 428 954 bultar i Ölandsbron`;
    messageBox.appendChild(p);
  }
  else if(data.value.toLowerCase() === "vad är klockan?"){
    let p = document.createElement('p');
    p.innerHTML = `Bot: Klockan är ${data.timestamp}`;
    messageBox.appendChild(p);
  }
  else if(data.value.toLowerCase() === "vilka djur ingår i the big five?"){
    let p = document.createElement('p');
    p.innerHTML = `Bot: Afrikansk Elefant, Svart Noshärning, Afrikansk Buffel, Lejon och Leopard`;
    messageBox.appendChild(p);
  }
  else if(data.value.toLowerCase() === "vad heter historiens bästa fotbollsspelare?"){
    let p = document.createElement('p');
    p.innerHTML = `Bot: Steven Gerrard`;
    messageBox.appendChild(p);
  }
  else if(data.value.toLowerCase() === "vilket är det bästa fotbollslaget i storbrittanien?"){
    let p = document.createElement('p');
    p.innerHTML = `Bot: Liverpool Football Club, no doubt`;
    messageBox.appendChild(p);
  }
  else{

    let p = document.createElement('p');
    p.innerHTML = `Bot: Ursäkta mig men min skapare har gjort mig dum och därför förstår ej din fråga. </br> Jag kan svara på `+random ;
    messageBox.appendChild(p);

  }

})
