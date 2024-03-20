import { Header } from './ui/header';

export function AppLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-7xl px-4 pt-8 pb-16">
      <div className="flex-grow">
        <Header />
        <main className="my-0 py-10">{children}</main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
