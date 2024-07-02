import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FormEditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [divisiId, setDivisiId] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    const getUserById = async () =>{
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.nominal);
        setEmail(response.data.email);
        setRole(response.data.role);
        setDivisiId(response.data.divisiId);
      } catch (error){
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
        divisiId: divisiId,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className='title'>Users</h1>
      <h2 className='subtitle'>Ubah Pengguna</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateUser}>
              <div className="field">
                <label className="label">Nama</label>
                <div className="control">
                  <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder='Nama' />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Pasword' />
                </div>
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input type="password" className="input" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} placeholder='Pasword' />
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Divisi</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={divisiId} onChange={(e) => setDivisiId(e.target.value)}>
                      <option value="1">Marketing & Sales</option>
                      <option value="2">HC & GA</option>
                      <option value="3">Operational & Procurement</option>
                      <option value="4">Finance Accounting & Tax</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type='submit' className="button is-success">Ubah</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormEditUser