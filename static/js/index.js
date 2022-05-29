

function toastFunction(msg,col) {
    var x = document.getElementById("toast");
    x.className = "show";
    document.getElementById('message').innerText = msg;
    document.getElementById('toast').style.backgroundColor = col;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
  }

const success = () =>{
toastFunction("you successfully accepted","green")
document.getElementById('frm').style.width = "0";
document.getElementById('frm').style.overflow = "hidden";
document.getElementById('loading').innerHTML = `<button id = "btn-acc" style = "background-color :green ">Verified</button>`

document.getElementById('loading').style.display = "block"

}

const failure = () =>{
  toastFunction("please try again later!","red")

}

  window.addEventListener('load', (event) => {
    
    t= document.getElementById('state').innerText;
    window.open("#btn-acc");
    console.log(t);
   if( t!=0) {

     if(t == 1){
      success()

     }
else 
failure()

   }
  })

  loading = true;
  document.getElementById('frm').addEventListener("submit",(e)=>{
      // e.preventDefault();
      document.getElementById('frm').style.width = "0";
      document.getElementById('frm').style.overflow = "hidden";
      
      document.getElementById('loading').style.display = "block"

//     document.getElementById('btn').style.backgroundColor = "yellow"
//     document.getElementById('btn').innerText = "verifying..."
//     toastFunction("Verifyling....please wait it will take some time","rgb(12, 178, 224)")
//  console.log(e);
//     formData={
//         fname : "sajhf",
//         lname : "dalknfa",
//         client_accountname : "ljanf",
//     }
//  console.log("aaya");
//     axios.post(
//         "http://localhost:5000/dat",
//         formData,
//         {
//             headers: { "X-Requested-With": "XMLHttpRequest" },
      
       
    

//           }
//       ).then(e=>{
//         document.getElementById('btn').style.backgroundColor = "#90EE90"
//         document.getElementById('btn').innerText = "Verified" 
//         console.log(e)
//         toastFunction("success","#90EE90")
//       }).catch(e=>{
//         toastFunction("error....please verify at your end","red")
//         console.log(e);
//       })




  }
  )

document.getElementById('copy1').addEventListener("click",()=>{
    navigator.clipboard.writeText(document.getElementById('cont1').innerHTML)
    toastFunction("code copied","rgb(12, 178, 224)")
})


document.getElementById('copy2').addEventListener("click",()=>{
    navigator.clipboard.writeText(document.getElementById('cont2').innerHTML)
    toastFunction("code copied","rgb(12, 178, 224)")
})

document.getElementById('copy3').addEventListener("click",()=>{
    navigator.clipboard.writeText(document.getElementById('cont3').innerHTML)
    toastFunction("code copied","rgb(12, 178, 224)")
})

