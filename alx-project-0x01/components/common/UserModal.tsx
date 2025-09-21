import React, { useState } from 'react';
import { UserData, UserModalProps } from '../interfaces';

const emptyUser: UserData = {
  id: undefined,
  name: '',
  username: '',
  email: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: { lat: '', lng: '' },
  },
  phone: '',
  website: '',
  company: { name: '', catchPhrase: '', bs: '' },
};

function setNestedValue<T = any>(obj: T, keys: string[], value: any): T {
  if (keys.length === 0) return obj;
  const [first, ...rest] = keys;
  return {
    ...((obj as any) ?? {}),
    [first]: rest.length === 0
      ? value
      : setNestedValue((obj as any)[first] ?? {}, rest, value),
  } as T;
}

const UserModal: React.FC<UserModalProps> = ({ onClose, onSubmit, initialUser }) => {
  const [user, setUser] = useState<UserData>(initialUser ?? emptyUser);

  const handleChange = (path: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const keys = path.split('.');
    setUser(prev => setNestedValue(prev, keys, val));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    if (!user.name || !user.email) {
      alert('Please provide name and email.');
      return;
    }
    onSubmit(user);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">{user.id ? 'Edit User' : 'Create User'}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <input value={user.name} onChange={handleChange('name')} placeholder="Name" required className="p-2 border rounded" />
            <input value={user.username} onChange={handleChange('username')} placeholder="Username" className="p-2 border rounded" />
            <input value={user.email} onChange={handleChange('email')} placeholder="Email" type="email" required className="p-2 border rounded" />
            <input value={user.phone} onChange={handleChange('phone')} placeholder="Phone" className="p-2 border rounded" />
            <input value={user.website} onChange={handleChange('website')} placeholder="Website" className="p-2 border rounded" />
          </div>

          <fieldset className="border p-3 rounded">
            <legend className="px-2">Address</legend>
            <div className="grid grid-cols-2 gap-3">
              <input value={user.address.street} onChange={handleChange('address.street')} placeholder="Street" className="p-2 border rounded" />
              <input value={user.address.suite} onChange={handleChange('address.suite')} placeholder="Suite" className="p-2 border rounded" />
              <input value={user.address.city} onChange={handleChange('address.city')} placeholder="City" className="p-2 border rounded" />
              <input value={user.address.zipcode} onChange={handleChange('address.zipcode')} placeholder="Zipcode" className="p-2 border rounded" />
            </div>

            <div className="mt-2 grid grid-cols-2 gap-3">
              <input value={user.address.geo.lat} onChange={handleChange('address.geo.lat')} placeholder="Lat" className="p-2 border rounded" />
              <input value={user.address.geo.lng} onChange={handleChange('address.geo.lng')} placeholder="Lng" className="p-2 border rounded" />
            </div>
          </fieldset>
          <fieldset className="border p-3 rounded">
            <legend className="px-2">Company</legend>
            <div className="grid grid-cols-1 gap-2">
              <input value={user.company.name} onChange={handleChange('company.name')} placeholder="Company name" className="p-2 border rounded" />
              <input value={user.company.catchPhrase} onChange={handleChange('company.catchPhrase')} placeholder="Catch phrase" className="p-2 border rounded" />
              <input value={user.company.bs} onChange={handleChange('company.bs')} placeholder="BS" className="p-2 border rounded" />
            </div>
          </fieldset>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import UserModal from '../components/UserModal';
import { UserData } from '../interfaces';

export default function UsersPage() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<UserData[]>([]);

  const handleCreate = async (user: UserData) => {

    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const created = await res.json();
    setUsers(prev => [...prev, created]);
    setOpen(false);
  };

  return (
    <div className="p-6">
      <button onClick={() => setOpen(true)} className="px-4 py-2 bg-green-600 text-white rounded">New User</button>

      {open && <UserModal onClose={() => setOpen(false)} onSubmit={handleCreate} />}

      <ul className="mt-6">
        {users.map(u => (
          <li key={u.id ?? Math.random()}>
            {u.name} — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
  export default UserModal;
}
