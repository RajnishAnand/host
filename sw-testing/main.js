if('serviceWorker' in navigator){
  window.onload=()=>{
    navigator.serviceWorker
      .register('./sw.js')
      .then(reg=>alert('sw-registered'))
      .catch(err=>alert(err));
  }
} 
 