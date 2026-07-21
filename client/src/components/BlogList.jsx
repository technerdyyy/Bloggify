import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const Bloglist = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();
  const filteredBlogs = () => {
    if (input === "") {
      return blogs;
    }
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  const visibleBlogs = filteredBlogs().filter((blog) =>
    menu === "All" ? true : blog.category === menu
  );

  const emptyMessage = input
    ? `We couldn't find anything matching "${input}". Try a different search.`
    : menu === "All"
    ? "There are no blogs published yet. Come back later!"
    : `No blogs in ${menu} at the moment. Come back later!`;
  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${
                menu === item && "text-white px-4 pt-0.5"
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>
      {/* --- Blog Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xxl:mx-40">
        {visibleBlogs.length === 0 ? (
          <div className="col-span-full flex flex-col items-center text-center py-20">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-5">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5A3.375 3.375 0 0 0 10.125 2.25H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Oops! Nothing here yet
            </h3>
            <p className="text-sm text-gray-500 max-w-xs">{emptyMessage}</p>
          </div>
        ) : (
          visibleBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        )}
      </div>
    </div>
  );
};

export default Bloglist;
