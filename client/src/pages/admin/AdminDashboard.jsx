export default function AdminDashboard() {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold mt-2">245</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold mt-2">₹52,430</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Pending Orders</h3>
          <p className="text-2xl font-bold mt-2">18</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Menu Items</h3>
          <p className="text-2xl font-bold mt-2">32</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b">
              <tr>
                <th className="py-2 px-4">Order ID</th>
                <th className="py-2 px-4">Customer</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">#1021</td>
                <td className="py-2 px-4">Rahul Sharma</td>
                <td className="py-2 px-4">₹850</td>
                <td className="py-2 px-4 text-yellow-500 font-medium">
                  Pending
                </td>
                <td className="py-2 px-4">
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}