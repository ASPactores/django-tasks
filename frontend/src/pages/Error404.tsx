export default function Error404() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="align-center text-center">
                <h1 className="text-9xl font-bold">404</h1>
                <p className="mt-3 text-5xl font-bold">PAGE NOT FOUND</p>
                <p className="mt-5 text-base">
                    The page you're looking for was removed, renamed, or was
                    never created.
                </p>
            </div>
        </div>
    );
}
