
'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { blogPostSchema } from '../../schema';


const page = () => {

    const initialValues = {
        title: "",
        content: "",
        tags: "",
    };
    const handleSubmit = async (values, { setSubmitting }) => {
        // Handle form submission, e.g., send data to server

        console.log(values);
        const object = {
            title: values.title,
            content: values.content,
            tags: values.tags.split(','),
            author: sessionStorage.getItem('userId')
        }

        console.log("final response", object)
        try {
            const response = await fetch('http://localhost:3000/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(object),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
        setSubmitting(false);
    };

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
        </Formik>
    );
}

export default page






