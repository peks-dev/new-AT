export default function ImageItem({ url, alt, category, key, variant }) {
  return (
    <picture
      className={`img-container ${variant}`}
      key={key}
      category={category}
    >
      <img src={url} alt={alt} className={"img"} />
    </picture>
  );
}
