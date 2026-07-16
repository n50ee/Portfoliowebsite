import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { ComponentProps } from "react";

/**
 * Renders a blog post body written in Markdown. Supports headings,
 * blockquotes (with an optional "-- Name, Role" attribution line right
 * after), captioned images (`![alt](url "caption")`), lists, and raw
 * `<div class="callout">...</div>` HTML blocks for a highlighted
 * "Conclusion"-style box. Images blur on hover as a quiet decorative touch.
 */
export function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="flex flex-col gap-5 font-body text-body leading-body text-ink-700">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          p: (props: ComponentProps<"p">) => {
            const text = typeof props.children === "string" ? props.children : "";
            if (text.startsWith("-- ")) {
              return <cite className="block text-body-sm not-italic text-ink-500">{text.slice(3)}</cite>;
            }
            return <p className="text-body leading-body text-ink-700" {...props} />;
          },
          h2: (props: ComponentProps<"h2">) => (
            <h2 className="mt-4 font-display text-heading-sm font-semibold text-ink-900" {...props} />
          ),
          h3: (props: ComponentProps<"h3">) => (
            <h3 className="mt-2 font-display text-body font-semibold text-ink-900" {...props} />
          ),
          hr: () => <hr className="border-line-soft" />,
          blockquote: (props: ComponentProps<"blockquote">) => (
            <blockquote
              className="border-l-2 border-signature-500 py-1 pl-5 font-display text-heading-sm font-medium leading-tight text-ink-900"
              {...props}
            />
          ),
          ul: (props: ComponentProps<"ul">) => <ul className="list-disc space-y-1.5 pl-5" {...props} />,
          ol: (props: ComponentProps<"ol">) => <ol className="list-decimal space-y-1.5 pl-5" {...props} />,
          a: (props: ComponentProps<"a">) => (
            <a className="text-signature-500 underline underline-offset-2" {...props} />
          ),
          img: ({ src, alt, title }) => (
            <figure className="my-2">
              <img
                src={src}
                alt={alt ?? ""}
                className="w-full cursor-pointer rounded-lg border border-line-soft transition-all duration-300 ease-out hover:opacity-80 hover:blur-[2px]"
              />
              {title && <figcaption className="mt-2 text-caption text-ink-500">{title}</figcaption>}
            </figure>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
