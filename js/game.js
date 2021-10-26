window.onload=function(){
    var rotateCD,
    pauseTween,
    playBtn  = document.getElementById("play"),
    pauseBtn = document.getElementById("pause"),
    plusBtn  = document.getElementById("plus"),
    minusBtn = document.getElementById("minus"),
    yaoBtn = document.getElementById("yao"),
    resetBtn = document.getElementById("reset"),
    minusBtn = document.getElementById("minus"),
    speedText = document.getElementById("speed"),
    numberDiv = document.getElementById("inputNumbers"),
    bgDiv = document.getElementById("bgDiv"),
    closeDiv = document.getElementById("closeDiv"),
    yaoCard = document.getElementById("yaoCard"),
    yaoDetail = document.getElementById("yaoDetail"),
    audio    = document.createElement("audio");

audio.loop = true;
//audio.src  = "https://upload.wikimedia.org/wikipedia/en/d/d8/You_Spin_Me_Round_by_Dead_or_Alive.ogg";

    let rotateLogo = gsap
    // .timeline()
    .fromTo("#svg2",{
        opacity: 0,
        scale: 0
    },{
        opacity: 1,
        scale: 1,
        duration: 3,
        ease: "power2.out"      
    })
    // .fromTo("#svg2",{
    //     rotation: 0
    // },{
    //     rotation: 360,
    //     duration: 1,
    //     repeat: -1,
    //     ease: "linear"
    // },0)
    // .timeScale(1);

    rotateCD = gsap
    .to("#svg2", {
    rotation: 360, 
    duration:1,
    ease: 'none',
    repeat: -1,
    paused: true
    })
    .timeScale(0);

var speed=0.1;
playBtn.onclick = function() {
  rotateCD.play();
  gsap.to(rotateCD, {timeScale: speed, duration:3});
  speedText.innerHTML=speed=0.1;
    
  pauseTween && pauseTween.kill();
  if (audio.paused) gsap.set(audio, { volume: 0, playbackRate: 0.5 });  
  gsap.to(audio,  { volume: 1, playbackRate: 1, duration:3 });
  audio.play();
};

plusBtn.onclick = function() {
    speed=(speed*10+1)/10;
    rotateCD.timeScale(speed);
    speedText.innerHTML=speed;
}

minusBtn.onclick = function() {
    speed=(speed*10-1)/10;
    if(speed>=0){
        rotateCD.timeScale(speed);
    } else {
        speed=0;
        rotateCD.timeScale(speed);
    }
    speedText.innerHTML=speed;
}
    
pauseBtn.onclick = function() {
    spinStop();
  
  pauseTween && pauseTween.kill();
  pauseTween = gsap.to(audio, { 
    volume: 0, 
    playbackRate: 0.5, 
    duration:3,
    onComplete: audio.pause, 
    callbackScope: audio 
  });
}

function spinStop(){
    gsap.to(rotateCD, { timeScale: 0, duration:3, onComplete: function() { this.pause(); }});
    speedText.innerHTML=speed=0;
}

function showCard(){
    numberDiv.classList.remove("show");
    numberDiv.classList.add("hidden");
    bgDiv.classList.remove("fg");
    bgDiv.classList.add("bg");
    yaoCard.classList.remove("hidden");
    yaoCard.classList.add("show");
    bgDiv.classList.add("bg");
    yaoDetail.classList.remove("hidden");
    yaoDetail.classList.add("show");
}

var numYao = 64;
yaoBtn.onclick = function() {
    if(drawCard()){
        spinStop();
        showCard();
    }else{

    }
}

//resetBtn
closeDiv.onclick = function(){
    numberDiv.classList.remove("hidden");
    numberDiv.classList.add("show");
    bgDiv.classList.remove("bg");
    bgDiv.classList.add("fg");
    yaoCard.classList.remove("show");
    yaoCard.classList.add("hidden");
    yaoDetail.classList.remove("show");
    yaoDetail.classList.add("hidden");
}

var result;
function drawCard(){
    // var time = new Date().getTime();
    // if(speed===0) speed=Math.random();
    // var yaoNumber = Math.floor(time*speed)%numYao;

    var n=[];
    n[0] = document.querySelector("#otc-1").value;
    n[1] = document.querySelector("#otc-2").value;
    n[2] = document.querySelector("#otc-3").value;
    if(n[0]==='' || n[1]==='' || n[2]==='' ) return;
    console.log(n);
    var m=[];
    m[0]=n[0]%8+1;
    m[1]=n[1]%8+1;
    m[2]=n[2]%6+1;
    console.log(m);

    var {zhuGua, bianGua} = result = suanGua(m);

    console.log(zhuGua, bianGua);

    document.querySelector("#zhuGuaTitle").innerHTML=zhuGua.title;
    document.querySelector("#bianGuaTitle").innerHTML=bianGua.title;
    document.querySelector("#yaoDetail").innerHTML=data[1].detail;
    return result;
}

var numTo8GuaMap = {
    "1": "1,1,1",
    "2": "0,1,1",
    "3": "1,0,1",
    "4": "0,0,1",
    "5": "1,1,0",
    "6": "0,1,0",
    "7": "1,0,0",
    "8": "0,0,0",
}
function suanGua(m){
    var gua1 = numTo8GuaMap[m[0]];
    var gua2 = numTo8GuaMap[m[1]];
    var heGua = gua1.concat(',', gua2);
    var zhuGua = findIn64Gua(heGua);

    var heGuaArray = heGua.split(',');
    var index = 6-m[2];
    if(heGuaArray[index] === '0') {
        heGuaArray[index]='1';
    } else if(heGuaArray[index] === '1') {
        heGuaArray[index]='0';
    }
    var bianGua = findIn64Gua(heGuaArray.join());
    
    console.log(zhuGua, bianGua);
    return {zhuGua, bianGua};
}


function findIn64Gua(heGua){
    for(var i=0;i<64;i++){
        if(heGua === Gua_Array_64[i].yao.join()){
            return Gua_Array_64[i];
        }
    }
}

var Gua_Array_64;
fetch("./json/data.json")
.then(response => response.json())
.then(data => {
    console.log(data);
    Gua_Array_64 = data;
});

var data={
    "1":{
        "detail":"<p>blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blahblah blah blah blah blah blah blah blah blah blah ...</p>"
    }
}

}