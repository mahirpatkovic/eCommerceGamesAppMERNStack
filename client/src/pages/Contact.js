import React, { useEffect, useState } from 'react';
import Loader from "../components/Loader";
function Contact() {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        let startTime = new Date().getTime();
        let interval = setInterval(() => {
            setIsLoading(true);
            if (new Date().getTime() - startTime > 1000) {
                setIsLoading(false);
                clearInterval(interval);
                return;
            }
        }, 0);
    }, []);
    return (
        <div style={{display: 'flex'}}>
            {isLoading ? <Loader /> : <p> Contact Page</p>}
        </div >
    )
}

export default Contact;