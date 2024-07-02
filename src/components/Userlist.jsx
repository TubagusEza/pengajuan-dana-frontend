import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Userlist = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get('http://localhost:5000/users');
    setUsers(response.data);
  };

  const deleteUsers = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  }
  return (
    <div>
      <h1 className='title'>Users</h1>
      <h2 className='subtitle'>Daftar Pengguna</h2>
      <Link to="/users/add" className='button is-primary mb-2'>Tambah</Link>
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Role</th>
            <th>Divisi</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) =>
            <tr key={user.id}>
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.divisi.nama_divisi}</td>
              <td>
              <Link to={`/users/edit/${user.id}`} className='button is-small is-info'>Ubah</Link>
              <button onClick={()=> deleteUsers(user.id)} className='button is-small is-danger'>Hapus</button>
              </td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  )
}

export default Userlist