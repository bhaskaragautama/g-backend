export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-white">

            <div className="w-full sm:max-w-lg px-2 lg:px-6 my-auto py-4 bg-white shadow-none lg:shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
