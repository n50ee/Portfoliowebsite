import { useRef, useState } from "react";
import { Input } from "../brand/Field";
import { uploadImage } from "../../lib/upload-client";

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      onChange(await uploadImage(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      {value && (
        <div className="mb-2 aspect-thumb w-full max-w-[240px] overflow-hidden rounded-md border border-line-soft">
          <img src={value} alt="" className="h-full w-full object-cover" />
        </div>
      )}
      <Input label={label} value={value} onChange={(e) => onChange(e.target.value)} placeholder="Paste a link, or upload below" />
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={(e) => handleFile(e.target.files)}
        disabled={uploading}
        className="mt-2 block text-body-sm text-ink-700 file:mr-3 file:rounded-md file:border file:border-line file:bg-paper-sunken file:px-3 file:py-1.5 file:text-caption file:font-semibold file:text-ink-900"
      />
      {uploading && <p className="mt-1 text-caption text-ink-500">Uploading…</p>}
      {error && <p className="mt-1 text-caption text-critical">{error}</p>}
    </div>
  );
}
