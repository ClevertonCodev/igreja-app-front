function Token(){
    try {
        let token:string | number | any = document.cookie.split(';').find(indice => {
            return indice.includes('token=')
        })
    
        token = token.split('=')[1];
        token = 'Bearer ' + token;
    
        return token
        
    } catch (error) {
        return ''
    }
   

}

export default Token;