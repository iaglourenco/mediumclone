import { Comment } from "../typings";

function Comment(comment: Comment) {
  return (
    <div className="flex justify-between my-2 max-w-2xl  mx-auto shadow border p-10 space-y-2  shadow-yellow-500">
      <div className="flex flex-col">
        <p className="font-light">
          <span className="font-bold text-yellow-500">{comment.name}</span> -{" "}
          {comment.email}
        </p>
        <span>{comment.comment}</span>
      </div>

      <span className="font-light text-sm">
        {new Date(comment._createdAt).toLocaleString()}
      </span>
    </div>
  );
}

export default Comment;
