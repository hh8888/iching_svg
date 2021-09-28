
var Gua_Array_64;

function setYangYao(id){
  var el = document.querySelector('#'+id);
  el.href.baseVal='yangyao.svg';
  el.attributes.filter.value='url(#neonBlack)';
}

function setYinYao(id){
  var el = document.querySelector('#'+id);
  el.href.baseVal='yinyao.svg';
  el.attributes.filter.value='url(#neonWhite)';
}

function setYao(yaoArray){
  for(var i=0;i<6;i++){
    var id = 'yao'+i;
    if(yaoArray[i]){
      setYangYao(id);
    } else {
      setYinYao(id);
    }
  }
}


function setGua(index){
  var gua = Gua_Array_64[index];
  setYao(gua.yao);
  setTitle(gua.title);
  setNumber(index+1);
}

function setTitle(text){
    var el = document.querySelector('#title');
    el.innerHTML = text;
}

function setNumber(text){
    var el = document.querySelector('#number');
    el.innerHTML = text;
}

var currentIndex=0;
function changeGua(){
    currentIndex++;
    if(!Gua_Array_64[currentIndex]){
        currentIndex = 0;
    }
    setGua(currentIndex);
    setTimeout(changeGua, 2000);
}


fetch("./data.json")
.then(response => response.json())
.then(data => {
    console.log(data);
    Gua_Array_64 = data;
    changeGua();
});

