import { useEffect, useState } from "react";

const blankThemeJSON = JSON.stringify({
  background: '',
  text: '',
  meta: '',
  grade4: '',
  grade3: '',
  grade2: '',
  grade1: '',
  grade0: '',
});

export const CustomTheme = ({ onSubmitTheme, userData, updateGraph }) => {
  const [customTheme, setCustomTheme] = useState(blankThemeJSON);

  useEffect(() => {
    const theme = localStorage.getItem('customTheme');
    if (theme) {
      setCustomTheme(theme);
      onSubmitTheme(JSON.parse(theme));
    }
  }, []);

  const handleTextChange = (event) => {
    console.log(event.target.value);
    setCustomTheme(event.target.value);
  };

  const handleSaveTheme = () => {
    let theme;
    try {
      theme = JSON.parse(customTheme);
    } catch (e) {
      console.log(e);
      alert('Invalid JSON');
      return;
    }

    if (!theme) {
      alert("Empty JSON");
      return;
    }

    localStorage.setItem('customTheme', customTheme);
    onSubmitTheme(theme);
    if (userData) {
      updateGraph(theme);
    }
  };

  return <div>Custom theme JSON:
    <textarea value={customTheme} onChange={handleTextChange} rows={7} />
    <br />
    <button onClick={handleSaveTheme}>{userData ? 'Apply' : 'Save'}</button>
  </div>;
};
