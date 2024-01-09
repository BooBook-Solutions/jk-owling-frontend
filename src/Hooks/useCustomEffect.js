import { useEffect } from "react";

const useCustomEffect = ({functions, dependencies=[]}) => {
    useEffect(() => {
        functions.forEach(f => f());
    }, dependencies); // eslint-disable-line
}

export default useCustomEffect;