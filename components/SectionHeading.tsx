type SectionHeadingProps = {
  overline?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  overline,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {overline && <p className="label-meta">{overline}</p>}
      <h2 className={`section-heading ${overline ? "mt-3" : ""}`}>{title}</h2>
      {description && (
        <p className={`body-lg mt-5 max-w-2xl ${alignClass}`}>{description}</p>
      )}
    </div>
  );
}
