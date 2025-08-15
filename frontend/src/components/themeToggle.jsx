import { useTheme } from "../contexts/themeContext.jsx"
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button onClick={toggleTheme}
            className="p-2 rounded-full focus:outline-none text-black dark:text-white"
        >
            {
                theme === 'light' ?  (<FiMoon className="w-5 h-5" />) : (<FiSun className="w-5 h-5" />)
            }
        </button>
    )
}

export default ThemeToggle;