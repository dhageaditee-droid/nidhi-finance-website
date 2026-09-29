import { useState, useEffect } from 'react';
import { getStoredBlogs, saveBlog, deleteBlog } from '../../utils/storage';
import { BookOpen, Clock, Calendar, ArrowUpRight, Plus, Trash2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newPost, setNewPost] = useState({
    title: '',
    category: 'Loans',
    author: 'Nidhi Finance Advisory',
    readTime: '4 min read',
    summary: '',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    content: '<p>Content for this new article goes here...</p>'
  });

  const loadData = () => {
    setBlogs(getStoredBlogs());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const updated = deleteBlog(id);
      if (updated) setBlogs(updated);
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.summary) return;

    saveBlog(newPost);
    loadData();
    setShowAddModal(false);
    setNewPost({
      title: '',
      category: 'Loans',
      author: 'Nidhi Finance Advisory',
      readTime: '4 min read',
      summary: '',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      content: '<p>Content for this new article goes here...</p>'
    });
  };

  const filtered = blogs.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Financial Blog & Education Articles
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Publish, edit, and manage educational articles and EMI guides shown on the website.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Filter */}
      <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title, category, author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 font-bold">Article Title</th>
                <th className="py-3.5 px-4 font-bold">Category</th>
                <th className="py-3.5 px-4 font-bold">Author</th>
                <th className="py-3.5 px-4 font-bold">Read Time</th>
                <th className="py-3.5 px-4 font-bold">Date</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white max-w-sm">
                    {b.title}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800/60">
                      {b.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{b.author}</td>
                  <td className="py-3.5 px-4 text-slate-400">{b.readTime}</td>
                  <td className="py-3.5 px-4 text-slate-400 text-xs whitespace-nowrap">{b.date}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/blog/${b.id}`}
                        target="_blank"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-white transition-colors"
                        title="View on Website"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="p-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Blog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">Create New Article</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Article Title *</label>
                <input
                  type="text"
                  required
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="e.g. 5 Mistakes to Avoid When Choosing a Loan"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="Loans">Loans</option>
                    <option value="Personal Finance">Personal Finance</option>
                    <option value="Business Finance">Business Finance</option>
                    <option value="Financial Planning">Financial Planning</option>
                    <option value="Insurance">Insurance</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Estimated Read Time</label>
                  <input
                    type="text"
                    value={newPost.readTime}
                    onChange={(e) => setNewPost({ ...newPost, readTime: e.target.value })}
                    placeholder="4 min read"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Short Summary / Intro *</label>
                <textarea
                  rows={3}
                  required
                  value={newPost.summary}
                  onChange={(e) => setNewPost({ ...newPost, summary: e.target.value })}
                  placeholder="A short overview of the article..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
