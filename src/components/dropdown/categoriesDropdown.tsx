import Link from "next/link";

interface SubCategory {
  id: string;
  name: string;
}

interface SubCategoryListProps {
  childrenCategories?: SubCategory[];
}

export const SubCategoryList = ({ childrenCategories }: SubCategoryListProps) => {
  // Check if there are actually children to display
  const hasChildren = childrenCategories && childrenCategories.length > 0;


  return (
    <ul className="grid grid-cols-4 gap-y-1 ">
      {hasChildren ? (
        childrenCategories.map((sub) => (
          <li
            key={sub?.id}
            className="text-sm text-brand-primary  hover:translate-x-1 transition-all duration-200"
          >
            <Link href={`/category/${sub?.id}`}>
              {sub?.name}
            </Link>
          </li>
        ))
      ) : (
        <li className="text-[10px] italic text-brand-primary opacity-50 uppercase tracking-tighter">
          No sub-categories
        </li>
      )}
    </ul>
  );
};