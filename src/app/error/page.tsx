'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const messages: Record<string, JSX.Element> = {
  Configuration: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{' '}
      <code className="text-xs bg-slate-100 p-1 rounded-sm">Configuration</code>
    </p>
  ),
};

function Message() {
  const error = useSearchParams().get('error') ?? '';
  return <>{messages[error] ?? 'Please contact us if this error persists.'}</>;
}

export default function AuthErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white flex flex-row justify-center items-center gap-2">
          Something went wrong
        </h5>
        <div className="font-normal text-gray-700 dark:text-gray-400">
          <Suspense>
            <Message />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
