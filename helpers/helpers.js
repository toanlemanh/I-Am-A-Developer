
export function formatDate() {
    let date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    date = `${year}/${month}/${day}`;
    return date;
}

export function transformText(text) {
    if (text) {
      let modifiedText = text
      const firstUpperCaseIndex = modifiedText.search(/[A-Z]/);
      if (firstUpperCaseIndex !== -1) {
        modifiedText = modifiedText.substring(0, firstUpperCaseIndex) + " " + modifiedText.substring(firstUpperCaseIndex);
      }
      modifiedText = modifiedText[0].toUpperCase() + modifiedText.substring(1);
      return modifiedText
    }
    return ""
  }