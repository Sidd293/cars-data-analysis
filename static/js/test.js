
var r = document.getElementById('i1')
turn  = new rotator(r,0.1,40);
turn.rotate();
var r = document.getElementById('i2')
turn  = new rotator(r,0.1,40);
turn.rotate();
var r = document.getElementById('i3')
turn  = new rotator(r,0.1,40);
turn.rotate();
var r = document.getElementById('i4')
turn  = new rotator(r,0.1,40);
turn.rotate();


var n = new inview(document.querySelectorAll('.chart'),.95)
n.register();

var n = new inview(document.querySelectorAll('.j-card-cont'),.95)
n.register();
// document.getElementsByClassName('side-menuicons').map(m=>{
//     turn  = new rotator(m,0.1,40);
// turn.rotate();
// })
// document.getElementsByClassName('tr').forEach(e =>console.log(e))

var els = document.getElementsByClassName("tr");

Array.prototype.forEach.call(els, function(el) {
    // console.log(el.innerText.split("-")[0].replace(/\r?\n|\r/g,""),window.location.href.split('/')[window.location.href.split('/').length-1].replace(/\r?\n|\r/g,"") )
   
    if(el.innerText.split("-")[0].replace(/\r?\n|\r/g,"")  === window.location.href.split('/')[window.location.href.split('/').length-1].replace(/\r?\n|\r/g,"")  ){ el.style.backgroundColor = "#3db5ff";
    console.log(el.innerText,"sf")

}

    // Do stuff here
el.addEventListener('click',()=>{
    // console.log(el.innerText)
    link_arr = window.location.href.split('/')
    link_arr.pop();
    link_arr.push(el.innerText.split("-")[0]);
 url=    link_arr.join("/")
    console.log("url=",url)
    window.open(url,"_self")
})
});

// .map(m => {
// m.addEventListener('click',()=>{
//     console.log(this)
//     console.log(window.location.href)
// })    
// });