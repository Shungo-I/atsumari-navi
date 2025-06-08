import Image from "next/image";

interface NavLinkProps {
  href: string;
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

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  icon,
  target = "_self",
  rel,
}) => {
  return (
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href={href}
      target={target}
      rel={rel}
    >
      {icon && (
        <Image
          aria-hidden
          src={icon.src}
          alt={icon.alt}
          width={icon.width || 16}
          height={icon.height || 16}
        />
      )}
      {children}
    </a>
  );
};
