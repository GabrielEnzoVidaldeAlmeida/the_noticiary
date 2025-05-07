import clsx from "clsx";

type PostHeadingProps = {
  children: React.ReactNode;
  as: "h1" | "h2";
};

export default function PostHeading({
  children,
  as: Tag = "h2",
}: PostHeadingProps) {
  const headingClassesMap = {
    h1: "text-2xl/tight font-extrabold sm:text-2xl",
    h2: "text-2xl/tight font-bold",
  };

  const commonClasses = "";

  return (
    <Tag className={clsx(headingClassesMap[Tag], commonClasses)}>
      <div className="group-hover:text-slate-600 transition">{children}</div>
    </Tag>
  );
}
