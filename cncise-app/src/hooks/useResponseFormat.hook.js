export default function useResponseFormat () {
  
  function formatHTML (choices) {
    if (choices.length > 0) {
      return choices.map((choice, idx) => {
        if (choice.error) {
          return choice.error;
        }
        if (choice.text) {
          let text = choice.text || '<EMPTY>';
          text = text.replace(/\n\n/gi, '</p><p>');
          return `<p>${text}</p>`;
        }
        return '';
      });
    }
    return [];
  }
  
  return {formatHTML};
}