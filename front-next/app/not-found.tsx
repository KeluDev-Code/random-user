import { Metadata } from 'next';
import { AppLayout } from '@/components/app-layout';
import { Btn } from '@/components/ui/core/btn';

export const metadata: Metadata = {
  title: '404 NotFound',
};

export default function NotFound() {
  return (
    <AppLayout>
      <div>
        <h2 className="h2 text-fuchsia-600">404</h2>
        <p>Página no encontrada</p>
      </div>

      <div className="w-full flex justify-center pt-4">
        <Btn href="/" className="mt-2" color="primary">
          Return Home
        </Btn>
      </div>
    </AppLayout>
  );
}
