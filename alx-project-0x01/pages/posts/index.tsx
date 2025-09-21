import PostCard from "../../components/common/PostCard";
import Header from "../../components/layout/Header";
import { PostProps } from "../../interfaces";

// FIX: Component props interface
interface PostsPageProps {
  posts: PostProps[];
}

const PostsPage: React.FC<PostsPageProps> = ({ posts }) => {
  console.log(posts)
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="p-4 flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">Post Content</h1>
            <button className="bg-blue-700 px-4 py-2 rounded-full text-white hover:bg-blue-800 transition-colors">
              Add Post
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.map((post: PostProps) => (
              <PostCard
                key={post.id}
                title={post.title}
                body={post.body}
                userId={post.userId}
                id={post.id}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  const posts = await response.json()

  return {
    props: {
      posts: posts.slice(0, 12) // Limit to 12 posts for better performance
    }
  }
}

export default PostsPage;