'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const page = () => {
    const id = sessionStorage.getItem('userId')
    console.log(id)

    const [allBlog, setallBlog] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `http://localhost:3000/backend/api/blogs`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "User-Id": sessionStorage.getItem("userId"),
                        },
                    }
                );
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


    return (
        <div>
            <h1>All Blogs Page</h1>
            {allBlog?.map((blog) => (
                <div key={blog?._id} class="my-2 mx-2">
                    <h2>title: {blog?.title}</h2>
                    <p>content: {blog?.content}</p>
                    <p>Author: {blog?.author}</p>
                    <p>Tags: {blog?.tags.join(', ')}</p>
                    <p>Created At: {new Date(blog?.createdAt).toLocaleString()}</p>
                    <p>Updated At: {new Date(blog?.updatedAt).toLocaleString()}</p>
                </div>
            ))}
        </div>
    )
}

export default page
