function Token(cookieName?: string): string {
    if(!cookieName){
        let token:string | number | any = document.cookie.split(';').find(indice => {
            return indice.includes('token=')
        })
    
        token = token.split('=')[1];
        token = 'Bearer ' + token;
    
        return token
    }

    let token:string | number | any = document.cookie.split(';').find(indice => {
            return indice.includes('token=')
        })
    
        token = token.split('=')[1];
        token = 'Bearer ' + token;
        
        return token

  
}

export default Token