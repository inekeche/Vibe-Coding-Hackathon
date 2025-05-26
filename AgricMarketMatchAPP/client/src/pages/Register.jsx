// File: client/src/pages/Register.jsx
export default function Register() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form className="flex flex-col gap-3">
        <input type="text" placeholder="Name" className="border p-2 rounded" />
        <input type="email" placeholder="Email" className="border p-2 rounded" />
        <input type="password" placeholder="Password" className="border p-2 rounded" />
        <button className="bg-green-600 text-white py-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}