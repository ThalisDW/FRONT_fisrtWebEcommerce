export default function validaToken (){
    const storedToken = localStorage.getItem('token');
    if (storedToken == null) {
        window.location.assign('/');
      }else{
          true
      }
    
}