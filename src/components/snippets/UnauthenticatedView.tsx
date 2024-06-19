import SessionLoading from './SessionLoading';
import SessionUnauthenticated from './SessionUnauthenticated';

export default function UnauthenticatedView({ status }: { status: 'authenticated' | 'unauthenticated' | 'loading' }) {
  return (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
      <div className="text-center">
        {status === 'unauthenticated' ? <SessionUnauthenticated /> : <SessionLoading />}
      </div>
    </div>
  );
}
