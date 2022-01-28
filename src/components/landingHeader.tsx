const LandingHeader = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl tracking-tight font-extrabold text-green-300 sm:text-5xl md:text-6xl">
        <span className="block xl:inline">Your books</span>{" "}
        <span className="block text-indigo-600 xl:inline">but better</span>
      </h1>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Find books including notes from your favorite thinkers.
      </p>
    </div>
  );
};

export default LandingHeader;
