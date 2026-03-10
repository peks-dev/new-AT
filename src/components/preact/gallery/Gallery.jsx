import { useState, useMemo, useCallback } from "preact/hooks";
import { furnitures } from "../../../lib/furnitures";
import "./gallery.css";

const ITEMS_PER_PAGE = 12;
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

const shuffled = [...furnitures].sort(() => Math.random() - 0.5);

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [page, setPage] = useState(1);

  const filteredImages = useMemo(() => {
    if (activeCategory === "todos") return shuffled;
    return shuffled.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  const displayedImages = useMemo(() => {
    return filteredImages.slice(0, page * ITEMS_PER_PAGE);
  }, [filteredImages, page]);

  const hasMore = displayedImages.length < filteredImages.length;

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
    setPage(1);
  }, []);

  const loadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  return (
    <div className="gallery">
      <ul className="gallery__btns-wrapper">
        <li className="gallery__btn-container">
          <button
            className={`btn ${activeCategory === "todos" ? "active" : ""}`}
            onClick={() => handleCategoryChange("todos")}
          >
            todos
          </button>
        </li>
        {categories.map((category) => (
          <li className="gallery__btn-container" key={category}>
            <button
              className={`btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
      <div className="gallery__content">
        <div className="gallery__imgs-wrapper" id="imgs-wrapper">
          {displayedImages.map((img, index) => (
            <picture
              className="img-container img-container--gallery"
              key={img.url}
              data-category={img.category}
            >
              <img
                src={img.url}
                alt={`${img.type} en madera de ${img.wood} color ${img.color} construido en Mérida Yucatán por Aguilar Talleres Carpinteria`}
                className="img"
                loading="lazy"
                decoding="async"
              />
            </picture>
          ))}
        </div>
        {hasMore && (
          <div className="gallery__load-more">
            <button
              className="btn active btn--gallery"
              onClick={loadMore}
              type="button"
            >
              cargar más
            </button>
            <span className="gallery__counter">
              {displayedImages.length} / {filteredImages.length}
            </span>
          </div>
        )}
        {!hasMore && filteredImages.length > ITEMS_PER_PAGE && (
          <div className="gallery__load-more">
            <span className="gallery__counter gallery__counter--done">
              {filteredImages.length} imágenes
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
