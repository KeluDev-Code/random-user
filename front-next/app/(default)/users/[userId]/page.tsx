import { Metadata } from 'next';

type Props = {
  params: { userId: string }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { userId } = params;

  return {
    title: `Usuario ${userId}`,
  };
}

export default function UserDetail({ params }: { params: { userId: string };}) {
  return (
    <div>
      <h3 className="h3">
        Detalles del usuario:
      </h3>
      <p>
        {`Id -> '${params.userId}'`}
      </p>
    </div>
  );
}
