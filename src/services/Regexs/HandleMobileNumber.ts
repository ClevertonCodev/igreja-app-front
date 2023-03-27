function HandleMobileNumber(number: string): string {
    const telRegex = /^(\d{0,2})\s?(\d{0,5})\s?-?\s?(\d{0,4})$/;
  const match = telRegex.exec(number.replace(/\D/g, '')) || ['', '', '', ''];
  return !match[2]
    ? match[1]
    : `(${match[1]}) ${match[2]}${!match[3] ? '' : `-${match[3]}`}`;

}

export default HandleMobileNumber;