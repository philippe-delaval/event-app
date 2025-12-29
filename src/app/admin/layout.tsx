export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Espace Administrateur</h1>
          <div className="flex space-x-4">
            <a href="/admin" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </a>
            <a href="/admin/users" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Utilisateurs
            </a>
            <span className="text-sm self-center ml-4 text-gray-400">|</span>
            <span className="text-sm self-center">Super Admin</span>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
