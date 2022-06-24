import { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import PortableText from "react-portable-text";
import Comment from "../../components/Comment";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

interface Props {
  post: Post;
}

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

function PostPage({ post }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          setSubmitted(true);
        }
      })
      .catch((err) => {
        setSubmitted(false);
      });
  };

  return (
    <main>
      <Head>
        <title>{post.title} | Medium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <img
        className="w-full h-40 object-cover"
        src={urlFor(post.mainImage).url()}
        alt={post.title}
      />
      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>

        <div className="flex items-center space-x-2">
          <img
            className="rounded-full w-10 h-10 object-cover"
            src={urlFor(post.author.image).url()}
            alt={post.author.name}
          />
          <p className="font-extralight">
            Blog post by{" "}
            <span className="text-green-600">{post.author.name}</span> -
            Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body!}
            className="text-lg"
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold my-5 " {...props}></h1>
              ),
              h2: (props: any) => (
                <h2 className="text-xl font-bold my-5" {...props}></h2>
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => {
                const rel = href.startsWith("/")
                  ? "noreferrer noopener"
                  : undefined;
                const target = !href.startsWith("/") ? "_blank" : undefined;

                return (
                  <a
                    href={href}
                    target={target}
                    rel={rel}
                    className="text-blue-500 hover:underline"
                  >
                    {children}
                  </a>
                );
              },
            }}
          />
        </div>
      </article>
      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />
      {submitted ? (
        <div className="flex flex-col my-10 p-10 bg-yellow-500 text-white max-w-2xl mx-auto">
          <h3 className="text-3xl font bold">Thank you for submitting</h3>
          <p>Once it has been aprroved, i'll appear below!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5 max-w-2xl mx-auto mb-10 "
        >
          <h3 className="text-lg text-yellow-500 ">Enjoyed this article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below!</h4>
          <hr className="py-3 mt-2" />

          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />
          <label className="block mb-5 ">
            <span className="text-gray-700">Name</span>
            {errors.name && (
              <span className="mx-2 text-red-500">Name is required</span>
            )}
            <input
              {...register("name", { required: true })}
              className="transition-all duration-200 shadow border rounded px-3 py-2 form-input mt-1 block outline-none focus:ring ring-yellow-500 w-full"
              placeholder="Name"
              type="text"
            />
          </label>
          <label className="block mb-5 ">
            <span className="text-gray-700">Email</span>
            {errors.email && (
              <span className="mx-2 text-red-500">Email is required</span>
            )}
            <input
              {...register("email", { required: true })}
              className="transition-all duration-200 shadow border rounded px-3 py-2 form-input mt-1 outline-none focus:ring ring-yellow-500 block w-full"
              placeholder="Email"
              type="email"
            />
          </label>
          <label className="block mb-5 ">
            <span className="text-gray-700">Comment</span>
            {errors.comment && (
              <span className="mx-2 text-red-500">Comment is required</span>
            )}
            <textarea
              {...register("comment", { required: true })}
              className="transition-all duration-200 block shadow border rounded px-3 py-2 form-textarea outline-none focus:ring ring-yellow-500 mt-1 w-full"
              placeholder="Your comment here..."
              rows={8}
            />
          </label>
          <input
            type="submit"
            placeholder="Submit"
            className="bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline transition-all duration-200 cursor-pointer text-white font-bold py-2 px-4 rounded"
          />
        </form>
      )}

      <div>
        <h3 className="text-4xl max-w-2xl mx-auto p-5">Comments</h3>
        <hr className="max-w-2xl my-5 mx-auto border border-yellow-500" />

        {post.comments.length == 0 ? (
          <h3 className="max-w-2xl my-5 mx-auto">No comments until now!</h3>
        ) : (
          post.comments.map((comment) => (
            <Comment key={comment._id} {...comment} />
          ))
        )}
      </div>
    </main>
  );
}

export default PostPage;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug {
        current
    }
}`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    description,
    author->{
      name,
      image,
      slug
    },
    'comments': *[_type == "comment" && post._ref == ^._id && approved == true],
    mainImage,
    slug,
    body
    }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
