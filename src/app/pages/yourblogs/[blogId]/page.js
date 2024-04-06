'use client'
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { blogPostSchema } from '../../schema';
import { useRouter } from 'next/navigation';



const page = ({ params }) => {
    const router = useRouter()
    const id = params.blogId
    console.log(id)

    const [blogData, setBlogData] = useState(null);

    const fetchBlog = async () => {

        try {
            const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data.result);
            setBlogData(data.result)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {

        fetchBlog()

    }, []);

    const initialValues = {
        title: blogData ? blogData.title : '',
        content: blogData ? blogData.content : '',
        tags: blogData ? (blogData.tags ? blogData.tags.join(', ') : '') : '',
        updatedAt: ''
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        values.updatedAt = new Date().toISOString();
        console.log("put api values ", values)

        try {
            const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            if (!response.ok) {
                throw new Error('Failed to update blog');
            }
            let data = await response.json();
            console.log(data)
            router.push('/pages/yourblogs')

        } catch (error) {
            console.error('Error updating blog:', error);
        }

        setSubmitting(false);
    };

    if (!blogData) {
        return <div>Loading...</div>;
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={blogPostSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 mx-auto">
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Title
                        </label>
                        <Field
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Title"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage
                            name="title"
                            component="div"
                            className="text-red-500 text-xs italic"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="content"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Content
                        </label>
                        <Field
                            as="textarea"
                            id="content"
                            name="content"
                            placeholder="Content"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage
                            name="content"
                            component="div"
                            className="text-red-500 text-xs italic"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="tags"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Tags
                        </label>
                        <Field
                            type="text"
                            id="tags"
                            name="tags"
                            placeholder="Tags (comma-separated)"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage
                            name="tags"
                            component="div"
                            className="text-red-500 text-xs italic"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={isSubmitting}
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik >

    );
}

export default page


















