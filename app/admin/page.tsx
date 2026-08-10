import Link from "next/link";

function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Admin Page</h1>
        <p className="mt-3 text-2xl">Welcome to the admin page!</p>
        <Link
          href="/admin/getintouch"
          className="mt-6 text-blue-500 hover:underline"
        >
          View Contact Form Submissions
        </Link>
      </main>
    </div>
  );
}

export default Page;
