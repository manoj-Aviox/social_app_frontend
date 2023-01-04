import  { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
    const pathname = useLocation().pathname
 useEffect(()=>{
    window.scrollTo({top:"0px",left:"0px",behavior:"smooth"})
 },[pathname])
}

export default ScrollToTop