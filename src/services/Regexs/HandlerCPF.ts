function HandlerCpf (cpf: string): string {
    const cpfRegex = /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/;
    const match = cpfRegex.exec(cpf.replace(/\D/g, '')) || ['', '', '', '', ''];
    return !match[2]
      ? match[1]
      : `${match[1]}.${match[2]}${!match[3] ? '' : `.${match[3]}`}${!match[4] ? '' : `-${match[4]}`}`;

     
  }
  

export default HandlerCpf  