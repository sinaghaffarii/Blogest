import Image from 'next/image';

interface FeaturedPostSidebarItemProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
}

export function FeaturedPostSidebarItem({
  imageSrc,
  imageAlt,
  title,
}: FeaturedPostSidebarItemProps) {
  return (
    <div className="flex items-center gap-4">
      <img
        height={64}
        width={64}
        alt={imageAlt}
        className="aspect-square rounded-md object-cover"
        src={imageSrc || '/placeholder.svg'}
      />
      <h4 className="text-sm leading-snug font-medium">{title}</h4>
    </div>
  );
}
