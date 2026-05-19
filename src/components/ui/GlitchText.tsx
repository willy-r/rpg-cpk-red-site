interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span";
}

export default function GlitchText({
  text,
  className = "",
  as: Tag = "h1",
}: GlitchTextProps) {
  return (
    <Tag
      className={`glitch-text relative ${className}`}
      data-text={text}
    >
      {text}
    </Tag>
  );
}
