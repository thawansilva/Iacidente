import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Oops!</h1>
        <p className="my-2">Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
