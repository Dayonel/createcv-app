import NewPassword from '@/components/auth/new-password/new-password';

export default function Reset() {
  return (
    <div className="container">
      <div className="page">
        <div className="grid max-w-[448px] m-auto items-center h-full">
          <NewPassword />
        </div>
      </div>
    </div>
  );
}
