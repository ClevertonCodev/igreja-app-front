import { Carousel } from 'react-bootstrap';
import './carousel.scss';

const MyCarousel = () => {
  const importPhotos = require.context('../../assets/carussel', false, /\.(png|jpe?g|svg)$/);
  const photos: any[] = importPhotos.keys().map(importPhotos);

  return (
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={photos[3]}
              alt="First slide"
            />
            <Carousel.Caption>
              {/* <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src= {photos[2]}
              alt="Second slide"
            />
            <Carousel.Caption>
              {/* <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src= {photos[1]}
              alt="Third slide"
            />
            <Carousel.Caption>
              {/* <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src= {photos[0]}
              alt="Third slide"
            />
            <Carousel.Caption>
              {/* <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src= {photos[4]}
              alt="Third slide"
            />
            <Carousel.Caption>
              {/* <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src= {photos[5]}
              alt="Third slide"
            />
            <Carousel.Caption>
              {/* <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
  );
};

export default MyCarousel;
