import Link from "next/link";
import { urlFor } from "../sanity";
import { Post } from "../typings";

function PostCard({ title, description, mainImage, author, slug }: Post) {
  return (
    <Link href={`/post/${slug.current}`}>
      <div className="group cursor-pointer border shadow rounded-lg overflow-hidden">
        <img
          className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
          src={urlFor(mainImage).url()!}
          alt={title}
        />
        <div className="flex items-center justify-between p-5 bg-white">
          <div>
            <p className="text-lg font-bold">{title}</p>
            <p className="text-xs font-light">
              {description} by {author.name}
            </p>
          </div>

          <div>
            <img
              className="rounded-full h-12 w-12 object-cover"
              src={urlFor(author.image).url()!}
              alt={author.name}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
