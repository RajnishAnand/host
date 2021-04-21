if('serviceWorker' in navigator){
  window.onload=()=>{
    navigator.serviceWorker
      .register('./sw.js')
      .then(reg=>console.log('sw-registered'))
      .catch(err=>console.log(err));
  }
} 
 