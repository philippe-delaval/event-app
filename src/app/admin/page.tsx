export default function AdminDashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Vue d&apos;Hélicoptère</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Volume d&apos;Affaires (GMV)</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0 €</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Nouveaux Utilisateurs</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Revenus Plateforme</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0 €</p>
        </div>
      </div>
    </div>
  );
}
