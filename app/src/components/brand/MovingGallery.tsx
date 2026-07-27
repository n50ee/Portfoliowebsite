/**
 * Auto-scrolling photo strip for a case study's gallery. The image list is
 * duplicated once and slid by exactly one set-width (-50%) so the loop is
 * seamless; hovering pauses it, and prefers-reduced-motion (styles.css)
 * freezes the animation entirely.
 */
export function MovingGallery({ images }: { images: string[] }) {
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="moving-gallery-item">
        <img src={images[0]} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  const loop = [...images, ...images];

  return (
    <div className="moving-gallery">
      <div className="moving-gallery-track">
        {loop.map((url, i) => (
          <div key={i} className="moving-gallery-item">
            <img src={url} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
