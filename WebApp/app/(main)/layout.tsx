import { Metadata } from 'next';
import Layout from '../../layout/layout';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Patient Management System',
    description: 'Patient Management System',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'Patient Management System',
        url: 'https://github.com/DanielDevHN',
        description: '',
        ttl: 604800
    },
    icons: {
        icon: '/app/favicon.ico',
    }
};

export default function AppLayout({ children }: AppLayoutProps) {
    return <Layout>{children}</Layout>;
}
