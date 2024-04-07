"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const [allBlog, setallBlog] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/api/allblogs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // Check if the response status is 200
        if (response.status === 200) {
          const data = await response.json();
          console.log("data in the json ", data?.result);
          // Do something with the data, for example, set it in state
          setallBlog(data?.result);
        } else {
          console.error("Failed to fetch data. Status code:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = () => {
    console.log("clicked delete");
  };
  const handleEdit = () => {
    console.log("clicked edit");
  };

  return (
    <div>
      <h1>All Blogs Page</h1>
      <button
        class="border p-2 border-black"
        onClick={() => router.push("/pages/yourblogs")}
      >
        my blogs
      </button>
      {allBlog?.map((blog) => (
        <div key={blog?._id} class="my-2 mx-2">
          <h2>title: {blog?.title}</h2>
          <p>content: {blog?.content}</p>
          <p>Tags: {blog?.tags.join(", ")}</p>
          <p>Created At: {new Date(blog?.createdAt).toLocaleString()}</p>
          <p>Updated At: {new Date(blog?.updatedAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default page;
