import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DetailBlog() {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [recentArticles, setRecentArticles] = useState([]);
  const { slug } = useParams();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://127.0.0.1:8000/api/posts/${slug}`);
      const data = await response.json();
      setBlog(data);
      setComments(data.comments || []);
    }
    fetchData();
  }, [slug]);

  useEffect(() => {
    async function fetchRecentArticles() {
      const response = await fetch("http://127.0.0.1:8000/api/posts?limit=5");
      const data = await response.json();
      setRecentArticles(data);
    }
    fetchRecentArticles();
  }, []);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentData = {
      id: comments.length + 1,
      name: "Guest",
      avatar: "/assets/user.png",
      comment: newComment,
      date: new Date().toLocaleDateString("id-ID"),
    };

    setComments([newCommentData, ...comments]);
    setNewComment("");
  };

  if (!blog) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="w-full py-20 px-44">
      <div className="w-3/4">
        <img
          src={
            blog.image
              ? `http://127.0.0.1:8000/storage/${blog.image}`
              : "/assets/news-1.jpg"
          }
          alt={blog.title}
          className="rounded-xl w-full h-[500px] object-cover"
        />

        <div className="py-7">
          <h1 className="text-3xl font-bold">{blog.title}</h1>
        </div>

        <div className="flex gap-5 items-center">
          <img
            src="/assets/user.png"
            alt="user"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-sm underline text-black font-medium">
              {blog.user?.full_name || "Anonim"}
            </h1>
            <div className="flex gap-3">
              <p className="text-slate-500 text-sm">
                {new Date(blog.created_at).toLocaleDateString("id-ID")} |{" "}
                {blog.category?.name || "Tanpa Kategori"} |{" "}
                {blog.tags
                  .map((item, index) => (
                    <span key={index + 1} className="text-blue-500">
                      {item.name}
                    </span>
                  ))
                  .reduce((prev, curr) => [prev, " ", curr])}
              </p>

              <button onClick={handleLike}>
                <i
                  className={`bi bi-heart${
                    liked ? "-fill text-red-600" : " text-gray-400"
                  } text-xl`}
                ></i>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-200 w-3/4 h-0.5 mt-5"></div>

        <div className="py-5 w-7/8">
          <div
            className="text-slate-800 text-sm"
            dangerouslySetInnerHTML={{
              __html: blog.body.replace(/<p>/g, '<p class="mt-2">'),
            }}
          ></div>
        </div>

        <div className="w-full text-white rounded-lg py-10">
          <h2 className="text-2xl font-semibold border-b border-gray-700 pb-3 mb-5">
            Komentar ({comments.length})
          </h2>

          <form onSubmit={handleSubmitComment} className="mb-7">
            <textarea
              className="w-full bg-white text-black p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-red-500"
              rows="3"
              placeholder="Tulis komentar Anda..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="mt-3 w-full bg-red-500 hover:bg-red-600 transition-all py-2 rounded-lg font-medium"
            >
              Kirim Komentar
            </button>
          </form>

          <div className="space-y-5">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 items-start">
                <img
                  src={comment.avatar}
                  alt={comment.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="bg-slate-100 p-4 rounded-lg w-full">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-slate-800">
                      {comment.name}
                    </h3>
                    <span className="text-sm text-slate-500">
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-slate-500">{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailBlog;
