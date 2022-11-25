import { useCallback, useEffect } from "react";

let lastTimeout = null;

export const CustomTheme = ({ customTheme, setCustomTheme, userData, updateGraph }) => {

  useEffect(() => {
    const themeRaw = localStorage.getItem('customTheme');
    if (themeRaw) {
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

  const handleColorChange = (event, keyName) => {
    const newTheme = {
      ...customTheme,
      [keyName]: event.target.value,
    };
    setCustomTheme(newTheme);
    if (userData) {
      updateGraphThrottled(newTheme);
    }
  };

  const handleSaveTheme = () => {
    localStorage.setItem('customTheme', JSON.stringify(customTheme));
  };

  return <div>Customize theme:
    <div>
      {
        Object.keys(customTheme).map((key) => {
          return <div key={key} className="picker-row">
            <label>{key}</label>
            <input type="color" value={customTheme[key]} onChange={(e) => handleColorChange(e, key)} />
          </div>;
        })
      }
    </div>
    <br />
    <button onClick={handleSaveTheme}>Save</button>
  </div>;
};
