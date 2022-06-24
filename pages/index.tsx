import Head from "next/head";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import { sanityClient } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex justify-between items-center  bg-yellow-400 border-black border-y py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{" "}
            is a place to write, read and connect
          </h1>
          <h2>
            It's easy and freeto postyour thinking on any topic and connect with
            millions of readers.
          </h2>
        </div>

        <img
          className="hidden md:inline-flex h-32 lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt=""
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6   ">
        {posts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
  _id,
  title,
  description,
  author->{
  name,
  image
},
mainImage,
slug

}`;

  const posts = await sanityClient.fetch(query);

  return {
    props: { posts },
  };
};
