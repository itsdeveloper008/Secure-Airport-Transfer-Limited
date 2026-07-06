interface PartnerLogoImageProps {
  src: string;
  name: string;
  color: string;
  className?: string;
}

const GRAY_LOGO = '#94A3B8';

export default function PartnerLogoImage({ src, name, color, className = '' }: PartnerLogoImageProps) {
  const maskStyle = {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
  } as const;

  return (
    <span
      role="img"
      aria-label={name}
      title={name}
      className={`relative inline-block shrink-0 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
        style={{ ...maskStyle, backgroundColor: GRAY_LOGO }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ ...maskStyle, backgroundColor: color }}
      />
    </span>
  );
}
