import { Brand } from "@/interfaces/brand";
import { Category } from "@/interfaces/categories";
import Image from "next/image";
import Link from "next/link";

export default function Item({
  item,
  isBrand,
}: {
  item: Category | Brand;
  isBrand?: boolean;
}) {
  return (
    <div>
      <div>
        <Link
          href={isBrand ? `/brands/${item?._id}` : `/categories/${item?._id}`}
        >
          <Image
            src={item?.image}
            alt={item?.name}
            width={270}
            height={250}
            className={
              isBrand
                ? `w-full h-[15.625rem] object-contain border-2 `
                : `w-full h-[15.625rem] object-contain bg-gray-100`
            }
            loading="lazy"
          />
        </Link>
      </div>
      <Link
        href={isBrand ? `/brands/${item?._id}` : `/categories/${item?._id}`}
      >
        <h1 className="text-center mt-2 font-medium line-clamp-1">
          {item?.name}
        </h1>
      </Link>
    </div>
  );
}
