import Link from "next/link";

const getYoutubeUrl = (href: string): string | null => {
  const youtubeRegex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
  const match = href.match(youtubeRegex);
  if (!match || !match[1]) {
    return null;
  }

  return `https://www.youtube.com/embed/${match[1]}`;
};

export function MdxUrl({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const youtubeUrl = getYoutubeUrl(href);

  if (youtubeUrl) {
    return (
      <iframe
        src={youtubeUrl}
        title="YouTube video player"
        className="my-6 block aspect-video w-full overflow-hidden rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  const isInternalUrl =
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.includes(process.env.PUBLIC_BASE_URL || "");
  if (isInternalUrl) {
    return <Link href={href}>{children}</Link>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
