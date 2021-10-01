window.onload=function(){
    var rotateCD,
    pauseTween,
    playBtn  = document.getElementById("play"),
    pauseBtn = document.getElementById("pause"),
    plusBtn  = document.getElementById("plus"),
    minusBtn = document.getElementById("minus"),
    yaoBtn = document.getElementById("yao"),
    minusBtn = document.getElementById("minus"),
    speedText = document.getElementById("speed"),
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
  speedText.innerHTML=speed;
    
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
    gsap.to(rotateCD, { timeScale: 0, duration:3, onComplete: function() { this.pause(); }});
    speedText.innerHTML=0;
  
  pauseTween && pauseTween.kill();
  pauseTween = gsap.to(audio, { 
    volume: 0, 
    playbackRate: 0.5, 
    duration:3,
    onComplete: audio.pause, 
    callbackScope: audio 
  });
}

var numYao = 64;
yaoBtn.onclick = function() {
    var time = new Date().getTime();
    if(speed===0) speed=Math.random();
    var yaoNumber = Math.floor(time*speed)%numYao;
    console.log(yaoNumber);
}
}