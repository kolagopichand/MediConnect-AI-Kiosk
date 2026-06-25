import React, { useState } from "react";
import { BLOG_POSTS } from "../data";
import { BlogPost } from "../types";
import { BookOpen, Calendar, Clock, User, X, ChevronRight, HelpCircle } from "lucide-react";

export default function BlogView() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = ["All", "Telemedicine", "Data Security", "Healthcare Innovation"];

  const filteredPosts =
    selectedCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  return (
    <div className="space-y-16 pb-20 animate-fade-in" id="blog-view-container">
      {/* Title */}
      <section className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
          Clinical Insights
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
          MediConnect Information Hub
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Read detailed whitepapers and articles detailing how smart kiosks are solving primary care shortages and maintaining robust security standards.
        </p>

        {/* Categories Tab selector */}
        <div className="pt-6 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white border-slate-800 shadow-sm"
                  : "glass text-gray-750 hover:border-blue-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blogs grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => setActivePost(post)}
            className="glass rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:translate-y-[-2px] hover:border-blue-300 transition-all duration-200 cursor-pointer flex flex-col justify-between h-[440px] group"
            id={`blog-card-${post.id}`}
          >
            <div>
              {/* Image header */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-3 left-3 bg-slate-950/85 text-teal-400 border border-slate-800 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded">
                  {post.category.toUpperCase()}
                </span>
              </div>

              {/* Text content */}
              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-2.5 text-[10px] text-gray-400 font-mono">
                  <span className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" /> {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" /> {post.readTime}
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-base text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-xs line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            {/* Author panel */}
            <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 font-medium">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-gray-700 font-mono">
                  {post.author[0]}
                </div>
                <span className="font-semibold text-gray-700">{post.author}</span>
              </div>
              <span className="text-blue-500 flex items-center hover:underline">
                Read File <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Blog Detail modal overlay */}
      {activePost && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl p-6 md:p-8 space-y-6 animate-fade-in relative">
            {/* Close btn */}
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-4 right-4 p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-gray-500 hover:text-gray-950 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal headers */}
            <div className="space-y-4 pt-4 md:pt-0">
              <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                {activePost.category}
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-gray-900 leading-tight">
                {activePost.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 border-y border-gray-50 py-3 font-mono">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="font-bold text-gray-700">{activePost.author} ({activePost.role})</span>
                </div>
                <span>•</span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" /> {activePost.date}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" /> {activePost.readTime}
                </span>
              </div>
            </div>

            {/* Image banner */}
            <div className="h-64 rounded-2xl overflow-hidden border border-gray-100">
              <img
                src={activePost.image}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Full text */}
            <div className="text-xs md:text-sm text-gray-700 leading-relaxed font-sans space-y-4 prose max-w-none">
              {activePost.content.split("\n\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 font-mono">
              <span>MediConnect Clinical Whitepaper Hub</span>
              <button
                onClick={() => setActivePost(null)}
                className="text-blue-600 font-bold hover:underline"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
