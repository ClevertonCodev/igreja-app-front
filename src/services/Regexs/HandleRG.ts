function HandleRG(rg: string): string {
  const rgRegex = /^(\d{0,2})(\d{0,3})(\d{0,3})(\w{0,1})$/;
  const match = rgRegex.exec(rg.replace(/\D/g, '')) || ['', '', '', '', ''];
  return !match[2]
    ? match[1]
    :`${match[1]}.${match[2]}${!match[3] ? '' : `.${match[3]}`}${!match[4] ? '' : `-${match[4]}`}`;

  }

 export default HandleRG