const LOGO_SRC = '/images/satl-logo.png';
const ICON_SRC = '/images/satl-icon.png';

type LogoProps = {
  large?: boolean;
  plain?: boolean;
  className?: string;
  height?: number;
};

export function LogoMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={ICON_SRC}
      alt=""
      className={`${className} shrink-0 rounded-md object-contain`}
      aria-hidden="true"
    />
  );
}

export default function Logo({ large = false, plain = true, className = '', height: heightProp }: LogoProps) {
  const defaultHeight = large ? 88 : 56;
  const useInlineHeight = heightProp !== undefined;
  const height = heightProp ?? defaultHeight;

  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt="Secure Airport Transfer Limited"
      width={320}
      height={320}
      className={`block h-10 w-auto object-contain sm:h-11 lg:h-[52px] ${className}`}
      style={useInlineHeight ? { height, width: 'auto' } : undefined}
    />
  );

  if (plain) return image;

  return (
    <div className={`rounded-xl bg-white shadow-sm ${large ? 'px-3 py-2' : 'px-2 py-1'}`}>
      {image}
    </div>
  );
}
