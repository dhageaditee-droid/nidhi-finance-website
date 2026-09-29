import { useParams, Link, Navigate } from 'react-router-dom';
import { blogs } from '../data/blogs';
import CTA from '../components/CTA';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  User, 
  ArrowLeft, 
  Share2, 
  CheckCircle2,
  Phone
} from 'lucide-react';

export default function BlogDetails() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  const relatedBlogs = blogs.filter((b) => b.id !== id).slice(0, 2);

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all financial articles</span>
        </Link>

        {/* Article Container */}
        <article className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/90 shadow-xl space-y-8">
          
          {/* Category & Meta */}
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
              {blog.category}
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-100 pb-4">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <User className="w-4 h-4 text-blue-600" />
                {blog.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                {blog.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                {blog.readTime}
              </span>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="rounded-2xl overflow-hidden h-72 sm:h-96 bg-slate-100 border border-slate-200">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* HTML / Formatted Content */}
          <div 
            className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[#0A192F] [&>h3]:pt-4 [&>h3]:pb-1 [&>p.lead]:text-base [&>p.lead]:font-medium [&>p.lead]:text-slate-800"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Consultation Note in Article */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                Need personalized advice on this topic?
              </h4>
              <p className="text-xs text-slate-600">
                Our loan advisors are available for direct telephone consultation.
              </p>
            </div>

            <a
              href="tel:9112927218"
              className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call 9112927218</span>
            </a>
          </div>

        </article>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="space-y-6 pt-4">
            <h3 className="text-xl font-bold text-[#0A192F]">
              Recommended Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedBlogs.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.id}`}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                      {rel.category}
                    </span>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors text-sm line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span>{rel.readTime}</span>
                    <span className="font-semibold text-blue-700">Read &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
