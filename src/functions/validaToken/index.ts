export default async function validaToken (){
    const storedToken = localStorage.getItem('token');
    console.log(storedToken);
    
    if (storedToken == null) {
        window.location.assign('/');
    }else{
        const response = await fetch("http://localhost:8080/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
            body: JSON.stringify({ storedToken }),
        });

        const data = await response.json();
        if (!data.message) {
            localStorage.removeItem('token')
            window.location.assign('/');
        }
    }


    
}