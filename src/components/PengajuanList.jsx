import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const PengajuanList = () => {
  const [pengajuan, setPengajuan] = useState([]);

  useEffect(() => {
    getPengajuan();
  }, []);

  const getPengajuan = async () => {
    const response = await axios.get('http://localhost:5000/pengajuan');
    setPengajuan(response.data);
  };

  const deletePengajuan = async(pengajuanId) =>{
    await axios.delete(`http://localhost:5000/pengajuan/${pengajuanId}`);
    getPengajuan();
  }
  return (
    <div>
      <h1 className='title'>Pengajuan</h1>
      <h2 className='subtitle'>Daftar Pengajuan</h2>
      <Link to="/pengajuan/add" className='button is-primary mb-2'>Tambah</Link>
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Pemohon</th>
            <th>Divisi</th>
            <th>Nominal</th>
            <th>Metode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pengajuan.map((pengajuan, index) => (
            <tr key={pengajuan.id}>
              <td>{index + 1}</td>
              <td>{pengajuan.user.name}</td>
              <td>{pengajuan.user.divisi.nama_divisi}</td>
              <td>{pengajuan.nominal}</td>
              <td>{pengajuan.metode.nama_metode}</td>
              <td>
                <Link to={`/pengajuan/edit/${pengajuan.id}`} className='button is-small is-info'>Ubah</Link>
                <button onClick={()=> deletePengajuan(pengajuan.id)} className='button is-small is-danger'>Hapus</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default PengajuanList