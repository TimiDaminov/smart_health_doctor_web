"use client";
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getExampleData } from '../api/example';

export default function Home() {
  const [patients, setPatients] = useState([{id:1,name:'Timur Daminov',status:"OK"},{id:2,name:'Timur Daminov',status:"OK"},{id:3,name:'Timur Daminov',status:"OK"}]);
 
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getExampleData();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  if (error) return <p>Ошибка: {error}</p>;
  if (!data) return <p>Загрузка...</p>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Head>
        <title>Doctor Dashboard</title>
      </Head>

    <div>
      <h1>Данные из API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold text-gray-800">Doctor Dashboard</h1>
        <nav className="mt-2">
          <ul className="flex space-x-4">
            <li>
              <Link href="/patients" className="text-blue-500 hover:underline">Patients</Link>
            </li>
            <li>
              <Link href="/profile" className="text-blue-500 hover:underline">Profile</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="p-6 flex-grow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Patient List</h2>
        <div className="overflow-hidden rounded-lg shadow-lg bg-white">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{patient.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{patient.status}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <Link href={`/patients/${patient.id}`} className="text-blue-500 hover:underline">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="bg-gray-200 text-center py-4 mt-auto">
        <p className="text-sm text-gray-600">&copy; 2024 IoMT Monitoring System</p>
      </footer>
    </div>
  );
}
