import { gradientFor } from "@/lib/utils/course";
import { initials } from "@/lib/utils/text";

export default function Thumb({ title = "", image, round = false, className = "size-10" }) {
  const shape = round ? "rounded-full" : "rounded-md";
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt="" loading="lazy" className={`${className} ${shape} shrink-0 object-cover`} />;
  }
  return (
    <span className={`${className} ${shape} flex shrink-0 items-center justify-center text-sm font-semibold text-white`} style={{ background: gradientFor(title) }}>
      {initials(title)}
    </span>
  );
}
