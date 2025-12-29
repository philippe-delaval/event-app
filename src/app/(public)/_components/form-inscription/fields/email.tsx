export default function Email() {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
      >
        Email
      </label>
      <div className="mt-2 sm:col-span-2 sm:mt-0">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
          placeholder="vous@example.com"
        />
      </div>
    </div>
  );
}
