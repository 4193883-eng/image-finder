import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import Modal from './components/Modal';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [images, setImages] = useState([]);
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        axios
            .get('https://pixabay.com/api/', {
                params: {
                    q: 'cats',
                    page: 1,
                    per_page: 12,
                    image_type: 'photo',
                    orientation: 'horizontal',
                    key: '37018413-8716f96595338d02291f7818d',
                },
            })
            .then((res) => {
                setImages(res.data.hits);
            });
    }, []);

    function openModal(image) {
        setActiveImage(image);
    }

    function closeModal() {
        setActiveImage(null);
    }
  return (
      <div className="App">
          {activeImage && <Modal onClose={closeModal} />}

          <Searchbar />
          <ImageGallery images={images} onOpen={openModal} />
      </div>
  );
}

export default App;
