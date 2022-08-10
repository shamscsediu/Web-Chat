import {useEffect} from 'react';

const useScriptCode = ({code}) => {
    useEffect(() => {
        const script = document.createElement('script');

        script.text = code

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [code]);
};

export default useScriptCode;