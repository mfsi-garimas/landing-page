"use client"
interface ErrorProps {
  error: {
    message: string;
  };
}

export default function Error({ error }: ErrorProps) {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>{error.message}</p>
    </main>
  );
}
