import {useRef} from "react"

const useThrottle = (cb,delay)=>{
 
        const lastRun = useRef(Date.now())

        return function(){
            if(Date.now() - lastRun.current >= delay)
            {
                cb();
                lastRun.current = Date.now()
            }
        }
}
export default useThrottle