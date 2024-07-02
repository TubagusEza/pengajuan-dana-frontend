import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FormEditPengajuan = () => {
  const [nominal, setNominal] = useState("");
  const [metodeId, setMetodeId] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    const getPengajuanById = async () =>{
      try {
        const response = await axios.get(`http://localhost:5000/pengajuan/${id}`);
        setNominal(response.data.nominal);
        setMetodeId(response.data.metodeId);
      } catch (error){
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }
    getPengajuanById();
  }, [id]);

  const updatePengajuan = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/pengajuan/${id}`, {
        nominal: nominal,
        metodeId: metodeId
      });
      navigate("/pengajuan");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className='title'>Pengajuan Dana</h1>
      <h2 className='subtitle'>Ubah Pengajuan Dana</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updatePengajuan}>
              <p className='has-text-centered'>{msg}</p>
              <div className="field">
                <label className="label">Nominal</label>
                <div className="control">
                  <input type="text" className="input" value={nominal} onChange={(e) => setNominal(e.target.value)} placeholder='Nama' />
                </div>
              </div>
              <div className="field">
                <label className="label">Metode</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={metodeId} onChange={(e) => setMetodeId(e.target.value)}>
                      <option value="1">Transfer</option>
                      <option value="2">Auto Debit</option>
                      <option value="3">Cash</option>
                      <option value="4">Lain-Lain</option>
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

export default FormEditPengajuan