import { useState, useEffect } from 'react';
import { getStoredTestimonials, saveTestimonial, deleteTestimonial } from '../../utils/storage';
import { Star, Quote, Plus, Trash2 } from 'lucide-react';

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newReview, setNewReview] = useState({
    name: '',
    designation: 'Client, Pune',
    serviceUsed: 'Personal Loan',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    comment: ''
  });

  const loadData = () => {
    setTestimonials(getStoredTestimonials());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Delete this testimonial?')) {
      const updated = deleteTestimonial(id);
      if (updated) setTestimonials(updated);
    }
  };

  const handleCreateTestimonial = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    saveTestimonial(newReview);
    loadData();
    setShowAddModal(false);
    setNewReview({
      name: '',
      designation: 'Client, Pune',
      serviceUsed: 'Personal Loan',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      comment: ''
    });
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Testimonials & Customer Reviews
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage genuine client reviews and placeholder sample content displayed on the homepage.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 relative group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-2">
                {t.isSample && (
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-900 px-2 py-0.5 rounded">
                    Sample / Demo
                  </span>
                )}
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-1 rounded bg-rose-950 text-rose-400 hover:bg-rose-900 transition-colors"
                  title="Delete Review"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm italic">
              "{t.comment}"
            </p>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-xs">{t.name}</div>
                <div className="text-[11px] text-slate-500">{t.designation}</div>
              </div>
              <span className="text-xs font-semibold text-blue-400">{t.serviceUsed}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">Add Customer Review</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTestimonial} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="e.g. Sunil Patil"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Designation / City</label>
                  <input
                    type="text"
                    value={newReview.designation}
                    onChange={(e) => setNewReview({ ...newReview, designation: e.target.value })}
                    placeholder="e.g. Business Owner, Pune"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Service Used</label>
                  <select
                    value={newReview.serviceUsed}
                    onChange={(e) => setNewReview({ ...newReview, serviceUsed: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="Personal Loan">Personal Loan</option>
                    <option value="Business Loan">Business Loan</option>
                    <option value="Home Loan">Home Loan</option>
                    <option value="Car Loan">Car Loan</option>
                    <option value="Financial Planning">Financial Planning</option>
                    <option value="Insurance Solutions">Insurance Solutions</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Rating (Stars)</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Client Testimonial *</label>
                <textarea
                  rows={3}
                  required
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Review statement..."
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
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
