import type { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'Başvuru Formu | Tarabya Final Dershanesi',
 description: 'Tarabya Final Dershanesi kayıt başvuru formu',
 robots: {
 index: false,
 follow: false,
 },
};

export default function FormLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return <>{children}</>;
}
