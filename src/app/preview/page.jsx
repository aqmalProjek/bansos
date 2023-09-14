"use client"
import supabase from '@/utils/supabase';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


export default function PageReference() {

const [dataBansos,setDataBansos] = useState([]);
  const getData = () => {
    supabase.from("tbl_bansos").select().then((res) => {
      setDataBansos(res.data)
      console.log(res.data);
    })
  }
  
    useEffect(() => {getData()},[
      
    ])
  return (
    <div className="container">
      <h2>Terimakasih telah mengisi data bantuan dana sosial</h2>
      <p>Berikut data data yang sudah mengisi form</p>
      <p className='text-warning'>Halaman ini adalah realtime, tidak perlu refresh</p>
      <Link href={'/'}>Kembali</Link>
{dataBansos.length !== 0 && (
  dataBansos.map((p,index) => (
    <table key={p.id}>
        <hr />
    <tr>
      <td>{index + 1} . Nama</td>
      <td>:</td>
      <td>{p?.nama}</td>
    </tr>
    <tr>
      <td>Nik</td>
      <td>:</td>
      <td>{p?.nik}</td>
    </tr>
    <tr>
      <td>Nomor KK</td>
      <td>:</td>
      <td>{p?.nkk}</td>
    </tr>
    <tr>
      <td>KTP</td>
      <td>:</td>
      <td><img src={process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/photos/'+ p?.ktp} width="300"/></td>
    </tr>
    <tr>
      <td>KK</td>
      <td>:</td>
      <td><img src={process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/photos/'+p?.kk} width="300"/></td>
    </tr>
    <tr>
      <td>Umur</td>
      <td>:</td>
      <td>{p?.umur}</td>
    </tr>
    <tr>
      <td>Alamat</td>
      <td>:</td>
      <td>{p?.alamat}</td>
    </tr>
    <tr>
      <td>Letak alamat</td>
      <td>:</td>
      <td>{p?.provinsi}, {p?.kabkot}, {p?.kel}, {p?.kec} </td>
    </tr>
    <tr>
      <td>RT</td>
      <td>:</td>
      <td>{p?.rt}</td>
    </tr>
    <tr>
      <td>RW</td>
      <td>:</td>
      <td>{p?.rw}</td>
    </tr>
    <tr>
      <td>Penghasilan sebelum pandemi</td>
      <td>:</td>
      <td>{p?.penghasilansbp}</td>
    </tr>
    <tr>
      <td>Penghasilan sesudah pandemi</td>
      <td>:</td>
      <td>{p?.penghasilanstp}</td>
    </tr>
    <tr>
      <td>Alasan</td>
      <td>:</td>
      <td>{p?.alasan}</td>
    </tr>
      </table>
  ))
)}

    </div>
  )
}
