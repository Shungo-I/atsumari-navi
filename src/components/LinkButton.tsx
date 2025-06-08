import Image from "next/image";

interface LinkButtonProps {
  href: string;
  primary?: boolean;
  children: React.ReactNode;
  icon?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  target?: "_blank" | "_self";
  rel?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  primary = false,
  children,
  icon,
  target = "_self",
  rel,
}) => {
  const baseClass = "rounded-full border border-solid transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5";
  
  const primaryClass = "border-transparent bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] sm:w-auto";
  
  const secondaryClass = "border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent w-full sm:w-auto md:w-[158px]";

  const className = `${baseClass} ${primary ? primaryClass : secondaryClass}`;

  return (
    <a
      className={className}
      href={href}
      target={target}
      rel={rel}
    >
      {icon && (
        <Image
          className="dark:invert"
          src={icon.src}
          alt={icon.alt}
          width={icon.width || 20}
          height={icon.height || 20}
        />
      )}
      {children}
    </a>
  );
}; 