import React, { useState } from 'react';
import { COMMUNITY_POSTS } from '../../../data/mockData';
import { CommunityPost } from '../../../types';
import { useApp } from '../../../context/AppContext';
import {
  MessageSquare,
  ThumbsUp,
  ShieldCheck,
  Plus,
  HelpCircle,
  Sparkles,
  Share2,
} from 'lucide-react';

export const CommunityScreen: React.FC = () => {
  const { showToast } = useApp();
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAsking, setIsAsking] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const categories = [
    'All',
    'Electrical Safety',
    'DIY',
    'Smart Home',
    'Energy Saving',
    'Solar',
    'Home Maintenance',
  ];

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextLiked = !p.isLiked;
          return {
            ...p,
            isLiked: nextLiked,
            likesCount: nextLiked ? p.likesCount + 1 : p.likesCount - 1,
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: 'Alex Mercer',
      authorRole: 'Customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      title: newTitle,
      content: newContent,
      category: 'Electrical Safety',
      likesCount: 1,
      commentsCount: 0,
      timeAgo: 'Just now',
      isLiked: true,
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setIsAsking(false);
    showToast('success', 'Question Posted', 'Master electricians in your area have been notified.');
  };

  const filteredPosts = posts.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            Electrical Community & Q&A
          </h2>
          <p className="text-xs text-slate-500">Ask certified electricians & safety engineers</p>
        </div>
        <button
          onClick={() => setIsAsking(!isAsking)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0057D9] text-white text-xs font-bold shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Ask Question</span>
        </button>
      </div>

      {/* Ask Question Form */}
      {isAsking && (
        <form
          onSubmit={handleCreatePost}
          className="p-4 rounded-2xl bg-white border border-blue-200 shadow-sm space-y-3 animate-in fade-in"
        >
          <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Describe Your Electrical Question</span>
          </h3>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Can I run a 2-ton inverter AC on a 16A breaker?"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <textarea
            rows={3}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Give details about existing wire gauge, breaker brand, or tripping symptoms..."
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAsking(false)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-[#0057D9] hover:bg-blue-700 text-white text-xs font-bold shadow-xs"
            >
              Post Question
            </button>
          </div>
        </form>
      )}

      {/* Category Pills */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
              selectedCategory === cat
                ? 'bg-[#0057D9] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-3">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={post.avatar}
                  alt={post.authorName}
                  className="w-9 h-9 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-900">{post.authorName}</h4>
                    {post.authorRole !== 'Customer' && (
                      <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-bold">
                        {post.authorRole}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>{post.timeAgo}</span>
                  </div>
                </div>
              </div>

              {post.hasSolution && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Solution
                </span>
              )}
            </div>

            <div>
              <h3 className="text-xs font-black text-slate-900 leading-snug">{post.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{post.content}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1.5 font-bold cursor-pointer transition-colors ${
                  post.isLiked ? 'text-[#0057D9]' : 'hover:text-slate-900'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-[#0057D9]' : ''}`} />
                <span>{post.likesCount} Helpful</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>{post.commentsCount} replies</span>
                </span>
                <button
                  onClick={() => showToast('info', 'Link Copied', 'Post link copied.')}
                  className="hover:text-slate-900 p-1"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
