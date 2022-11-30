import { useCallback, useEffect, useState } from "react";

let lastTimeout = null;

export const CustomTheme = ({ customTheme, setCustomTheme, userData, updateGraph }) => {
  const [newThemeText, setNewThemeText] = useState(JSON.stringify(customTheme) || "");

  useEffect(() => {
    const themeRaw = localStorage.getItem('customTheme');
    if (themeRaw) {
      setNewThemeText(themeRaw);
      const theme = JSON.parse(themeRaw);
      setCustomTheme(theme);
    }
  }, []);

  const updateGraphThrottled = useCallback((newTheme) => {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(() => {
      updateGraph(newTheme);
      lastTimeout = null;
    }, 50);
  }, []);

  const handleSaveTheme = () => {
    let parsedTheme;

    try {
      parsedTheme = JSON.parse(newThemeText);
    } catch {
      alert('Invalid JSON');
      return;
    }

    localStorage.setItem('customTheme', newThemeText);
    setCustomTheme(parsedTheme);
    if (userData) {
      updateGraphThrottled(parsedTheme);
    }
  };

  const handleTextChange = (event) => {
    setNewThemeText(event.target.value);
  };

  return <div>Customize theme:
    <div>
    <textarea value={newThemeText} onChange={handleTextChange} rows={7} />
    </div>
    <br />
    <button onClick={handleSaveTheme}>Save{userData && ' & Apply'}</button>
  </div>;
};
