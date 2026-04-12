import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export function PostHeader({
  categorySlug,
  categoryName,
  publishedAt,
}: {
  categorySlug?: string;
  categoryName?: string;
  publishedAt?: Date;
}) {
  return (
    <div className="mb-2 flex items-center gap-3 text-sm text-muted-foreground">
      {categorySlug && categoryName && (
        <Link href={`/category/${categorySlug}`}>
          <Badge
            variant="secondary"
            className="font-medium transition-colors hover:text-primary"
          >
            {categoryName}
          </Badge>
        </Link>
      )}
      {publishedAt && (
        <span>{formatDate(publishedAt, { withTime: true })}</span>
      )}
    </div>
  );
}
