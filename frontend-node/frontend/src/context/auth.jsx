import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  
  const updateLocalStorage=()=>{
    localStorage.setItem('auth', JSON.stringify(auth))
  }
  
  const getLocalStorage=()=>{
    let localAuth = localStorage.getItem('auth');
    if(localAuth){
      localAuth = JSON.parse(localAuth);
      setAuth(localAuth);
    }
  }
  
  axios.defaults.headers.common['Authorization']=auth?.token;

  useEffect(()=>{
    
    if(auth.user){
      updateLocalStorage();
    }
  },[auth])

  useEffect(()=>{
    getLocalStorage();
  },[])
  
  return (
      <AuthContext.Provider value={[auth, setAuth]}>
        {children}
      </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
