'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import React from "react";

const page = () => {
  const router = useRouter()

  useEffect(() => {

    router.push('/pages/allblogs');

  }, [router]);

  return (
    <div>Loading...</div>
  );
};

export default page;




