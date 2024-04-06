'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const router = useRouter()

    const [myBlog, setmyBlog] = useState();

    async function fetchData() {
        try {
            const response = await fetch(
                `http://localhost:3000/api/blogs`,
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
                setmyBlog(data?.result);
            } else {
                console.error("Failed to fetch data. Status code:", response.status);
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        console.log("clicked delete")
        try {
            const response = await fetch(
                `http://localhost:3000/api/blogs/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // Check if the response status is 200
            if (response.status === 200) {
                const data = await response.json();
                console.log("deleted data ", data?.result);

            } else {
                console.error("Failed to fetch data. Status code:", response.status);
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
        fetchData()
    }
    const handleEdit = (id) => {
        console.log("clicked edit")
    }


    return (
        <div>

            <h1>my Blogs Page</h1>
            <button class="border p-2 border-black" onClick={() => router.push('/pages/yourblogs/addblog')}>Add </button>
            {myBlog?.map((blog) => (
                <div key={blog?._id} class="my-2 mx-2">
                    <h2>title: {blog?.title}</h2>
                    <p>content: {blog?.content}</p>
                    <p>Author: {blog?.author}</p>
                    <p>Tags: {blog?.tags.join(', ')}</p>
                    <p>Created At: {new Date(blog?.createdAt).toLocaleString()}</p>
                    <p>Updated At: {new Date(blog?.updatedAt).toLocaleString()}</p>
                    <div class="flex flex-row space-x-4">

                        <button class="border p-2 border-black" onClick={() => handleDelete(blog._id)}>delete</button>
                        <button class="border p-2 border-black" onClick={() => router.push(`/pages/yourblogs/${blog._id}`)}>edit</button>

                    </div>


                </div>
            ))}
        </div>
    )
}

export default page
