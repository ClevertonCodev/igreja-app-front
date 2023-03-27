function HandlerNumberInputkey(event: React.KeyboardEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    if (/[^\d]/.test(event.key)) {
      event.preventDefault();
      return;
    }
}

export default HandlerNumberInputkey;