import { useRef, useState } from "react";
import { uploadImage } from "../../lib/upload-client";

export function GalleryField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    setError("");
    const uploaded: string[] = [];
    for (const file of Array.from(fileList)) {
      try {
        uploaded.push(await uploadImage(file));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed.");
      }
    }
    if (uploaded.length > 0) onChange([...value, ...uploaded]);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="mb-2 text-body-sm font-semibold text-ink-900">{label}</div>
      {value.length > 0 && (
        <div className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {value.map((url, i) => (
            <div key={url} className="group relative aspect-square overflow-hidden rounded-md border border-line-soft">
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink-900/70 text-xs font-semibold text-paper"
                aria-label="Remove photo"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        disabled={uploading}
        className="block text-body-sm text-ink-700 file:mr-3 file:rounded-md file:border file:border-line file:bg-paper-sunken file:px-3 file:py-1.5 file:text-caption file:font-semibold file:text-ink-900"
      />
      {uploading && <p className="mt-1 text-caption text-ink-500">Uploading…</p>}
      {error && <p className="mt-1 text-caption text-critical">{error}</p>}
    </div>
  );
}
