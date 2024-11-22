'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login'); // Redirige al login
        } else {
            router.push('/dashboard'); // Redirige al dashboard si hay un token válido
        }
    }, [router]);

    return null; // Evita renderizar contenido mientras redirige
};

export default HomePage;


