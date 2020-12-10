import { useEffect } from "react";

export default (ref, onOutsideClick, active = false)=> {
  useEffect(() => {

    if(!active) return
    
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick()
        
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active, onOutsideClick, ref]);

}
