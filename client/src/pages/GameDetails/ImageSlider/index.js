import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

export default function ImageSlider(props) {
    const [images, setImages] = useState([]);
    useEffect(() => {
        setImages(props.images);
    }, [props.images]);

    return (
        <div className='imageSlider'>
            <Carousel fade>
                {images.map((image, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className='d-block w-100'
                            src={image}
                            alt='Slides'
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}
