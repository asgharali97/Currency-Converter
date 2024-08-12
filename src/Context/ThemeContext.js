import { createContext, useContext } from "react";
// This is the context of Theme mode
export const ThemeContext = createContext({
    ThemeMode:"light",
    darkTheme:()=>{},
    lightTheme:()=>{}
});
// Providing Context to children 
export const ThemeProvider = ThemeContext.Provider

// Custom hook for context
export default function useTheme () {
    return useContext(ThemeContext)
}