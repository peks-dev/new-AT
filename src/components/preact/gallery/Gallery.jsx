import { useState, useEffect } from "preact/hooks";
import { furnitures } from "../../../lib/furnitures";
import "./gallery.css";

function random() {
  return Math.random() - 0.5;
}
const furnituresRandomized = furnitures.sort(random);
const categories = [
  "baños",
  "recamara",
  "comedores",
  "tvs",
  "oficina",
  "puertas",
  "cocinas",
  "especiales",
  "credenzas",
];

export default function Gallery() {
  const [displayedImages, setDisplayedImages] = useState([]);
  const [activeButton, setActiveButton] = useState("todos");

  useEffect(() => {
    loadMoreImages();
  }, []);

  const loadMoreImages = () => {
    const newImages = [];

    if (activeButton === "todos") {
      // Cargar las 12 primeras imágenes si el botón activo es "todos"
      for (let i = 0; i < 12 && i < furnituresRandomized.length; i++) {
        newImages.push(furnituresRandomized[i]);
      }
      furnituresRandomized.splice(0, newImages.length);
    } else {
      // Cargar las imágenes correspondientes a la categoría del botón activo
      for (let i = 0; i < furnituresRandomized.length; i++) {
        if (furnituresRandomized[i].category === activeButton) {
          newImages.push(furnituresRandomized[i]);
          furnituresRandomized.splice(i, 1);
        }
      }
    }

    setDisplayedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleButtonClick = (category) => {
    setActiveButton(category);
  };

  const categoryButtons = categories.map((category) => (
    <li className="gallery__btn-container" key={category}>
      <button
        className={`btn ${activeButton === category ? "active" : ""}`}
        onClick={() => handleButtonClick(category)}
      >
        {category}
      </button>
    </li>
  ));

  // renderizado
  return (
    <div className="gallery">
      <ul className="gallery__btns-wrapper">
        <li className="gallery__btn-container">
          <button
            className={`btn ${activeButton === "todos" ? "active" : ""}`}
            onClick={() => handleButtonClick("todos")}
          >
            todos
          </button>
        </li>
        {categoryButtons}
      </ul>
      <div className={"gallery__content"}>
        <div className="gallery__imgs-wrapper" id={"imgs-wrapper"}>
          {displayedImages.map((img, index) => (
            <picture
              className={`img-container img-container--gallery ${
                img.category !== activeButton && activeButton !== "todos"
                  ? "hidden"
                  : ""
              }`} // Oculta las imágenes que no corresponden al botón activo
              key={index}
              data-category={img.category}
            >
              <img
                src={img.url}
                alt={`${img.type} en madera de ${img.wood} color ${img.color} construido en Mérida Yucatán por Aguilar Talleres Carpinteria`}
                className={"img"}
              />
            </picture>
          ))}
        </div>
        <button
          class={"btn active btn--gallery"}
          onClick={loadMoreImages}
          type={"button"}
        >
          cargar más
        </button>
      </div>
    </div>
  );
}
