"use client";

import supabase from "@/utils/supabase";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  //crud form utility
  const [message,setMessage] = useState("");
  const [loading,setLoading] = useState(false);

  //isi form
  const [provForm, setProvForm] = useState("");
  const [kabKotForm, setKabKotForm] = useState("");
  const [kecForm, setKectForm] = useState("");
  const [kelForm, setKelForm] = useState("");

  //isian form text
  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [nkk, setNkk] = useState("");
  const [ktp, setKtp] = useState("");
  const [kk, setKK] = useState("");
  const [umur, setUmur] = useState("");
  const [jk, setJk] = useState("Laki-Laki");
  const [alamat, setAlamat] = useState("");
  const [rt, setRt] = useState("");
  const [rw, setRw] = useState("");
  const [penghasilansbp, setPenghasilansbp] = useState("");
  const [penghasilanstp, setPenghasilanstp] = useState("");
  const [alasan, setAlasan] = useState("");
  const [centang, setCentang] = useState(false);


  const [alesanForm, setAlesanForm] = useState("");

  
  const [fileKtp, setFileKtp] = useState("");
  const [fileKK, setFileKK] = useState("");

  
  const [provinsi, setProvinsi] = useState([]);
  const [kabKot, setKabKot] = useState([]);
  const [kec, setKec] = useState([]);
  const [kel, setKel] = useState([]);
  const getProvinsi = () => {
    fetch(
      `https://aqmallauzit.github.io/api-wilayah-indonesia/api/provinces.json`
    )
      .then((response) => response.json())
      .then((provinces) => setProvinsi(provinces));
  };

  const getKabKot = async (provinceId) => {
    let kota = await axios.get(
      `https://aqmallauzit.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`
    );
    setKabKot(kota.data);
  };
  useEffect(() => {
    getProvinsi();
  }, []);

  const getKec = async (kotaId) => {
    let kec = await axios.get(
      `https://aqmallauzit.github.io/api-wilayah-indonesia/api/districts/${kotaId}.json`
    );
    console.log("kec : ", kec.data);
    setKec(kec.data);
  };

  const getKel = async (districtId) => {
    let kel = await axios.get(
      `https://aqmallauzit.github.io/api-wilayah-indonesia/api/villages/${districtId}.json`
    );
    console.log("kel : ", kel.data);
    setKel(kel.data);
  };

  const handleKec = async (v) => {
    let isiV = v.target.value.split("-");
    console.log("split hasil : ", isiV);
    setKectForm(v.target.value);
    await getKel(isiV[0]);
  };

  const handleProv = async (v) => {
    let isiV = v.target.value.split("-");
    console.log("split hasil : ", isiV);
    setProvForm(v.target.value);
    await getKabKot(isiV[0]);
  };

  const handleKota = async (v) => {
    let isiV = v.target.value.split("-");
    console.log("split hasil kota : ", isiV);
    setKabKotForm(v.target.value);
    await getKec(isiV[0]);
  };

  const addKtp = async(e) => {
    const file = e.target.files[0];
    console.log(file);
    if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/bmp') {
      setMessage('Your files is not an image. please try again');
      e.target.value = null
      return;
    } 

    if (file.size > 2000000) {
      setMessage('file lebih besari dari 2mb');
      e.target.value = null
      return;
    }
    setKtp(Date.now() + file.name);
    setFileKtp(file);
  }

  const addKk = async(e) => {
    const file = e.target.files[0];
    console.log(file);
    if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/bmp') {
      setMessage('Your files is not an image. please try again');
      e.target.value = null
      return;
    } 

    if (file.size > 2000000) {
      setMessage('file lebih besari dari 2mb');
      e.target.value = null
      return;
    }
    setKK(Date.now() + file.name);
    setFileKK(file);
  }








  const handelSubmit = async(e) => {
    e.preventDefault();
    console.log("tersubmit");
    setMessage("");
    setLoading(true);

    let isiProv,isiKabKot,isiKec,isiKel;
    isiProv = provForm.split("-")[1];
    isiKabKot = kabKotForm.split("-")[1];
    isiKec = kecForm.split("-")[1];
    isiKel = kelForm.split("-")[1];

    console.log(isiKel);
    



    

    if(centang === false) {
      setMessage('Mohon centang "Saya menyatakan.." yang berada di paling bawah');
      setLoading(false);
      return;
    }

    if(nama === "") {
      setMessage('Mohon isi formulir nama');
      setLoading(false);
      return;
    }

    if(nik === "") {
      setMessage('Mohon isi formulir nik');
      setLoading(false);
      return;
    }

    if(nkk === "") {
      setMessage('Mohon isi formulir nomor kartu keluarga');
      setLoading(false);
      return;
    }

    if(umur === "") {
      setMessage('Mohon isi formulir umur');
      setLoading(false);
      return;
    }

    if (umur < 25) {
      setMessage('Umur anda dibawah 25 tahun');
      setLoading(false);
      return;
    }

    if(jk === "") {
      setMessage('Mohon isi formulir jenis kelamin');
      setLoading(false);
      return;
    }

    if(alamat === "") {
      setMessage('Mohon isi formulir alamat');
      setLoading(false);
      return;
    }

    if(alamat.length > 255) {
      setMessage('Alamat melebihi 255 karakter');
      setLoading(false);
      return;
    }

    if(rt === "") {
      setMessage('Mohon isi formulir rt');
      setLoading(false);
      return;
    }

    if(rw === "") {
      setMessage('Mohon isi formulir rw');
      setLoading(false);
      return;
    }

    if(penghasilansbp === "") {
      setMessage('Mohon isi formulir penghasilan sebelum pandemi');
      setLoading(false);
      return;
    }

    if(penghasilanstp === "") {
      setMessage('Mohon isi formulir penghasilan sesudah pandemi');
      setLoading(false);
      return;
    }

    if(alasan === "") {
      setMessage('Mohon isi formulir alasan');
      setLoading(false);
      return;
    }

    if(ktp === "") {
      setMessage('Mohon isi formulir ktp');
      setLoading(false);
      return;
    } else {
      await supabase.storage.from('photos').upload(ktp,fileKtp);
    }

    if(kk === "") {
      setMessage('Mohon isi formulir kk');
      setLoading(false);
      return;
    } else {
      await supabase.storage.from('photos').upload(kk,fileKK);
    }

    if(provForm === "") {
      setMessage('Mohon isi formulir provinsi');
      setLoading(false);
      return;
    }

    if(kabKotForm === "") {
      setMessage('Mohon isi formulir Kota');
      setLoading(false);
      return;
    }

    if(kecForm === "") {
      setMessage('Mohon isi formulir kecamatan');
      setLoading(false);
      return;
    }

    if(kelForm === "") {
      setMessage('Mohon isi formulir kelurahan');
      setLoading(false);
      return;
    }

    // upload

    

    try {
      const res = await supabase.from("tbl_bansos").insert({
        nama,
        nik,
        nkk,
        ktp,
        kk,
        umur,
        jk,
        alamat,
        rt,
        rw,
        penghasilansbp,
        penghasilanstp,
        alasan,
        provinsi : isiProv,
        kabkot: isiKabKot,
        kec: isiKec,
        kel: isiKel
      });
      if(res.status == 201) {  
        setNama("")
setNik("")
setNkk("")
setKtp("")
setKK("")
setUmur("")
setJk("")
setAlamat("")
setRt("")
setRw("")
setPenghasilansbp("")
setPenghasilanstp("")
setAlasan("")
setCentang("")
setFileKtp("")
setFileKK("")
setProvinsi([])
setKabKot([])
setKec([])
setKel([])
        router.push('/preview');
    setLoading(false);
      } else {
        setMessage(res.error.message );
          setLoading(false);
          true;
      }
     
    } catch (error) {
      console.log(error);
    }



    

    setLoading(false);
  }





  const handleAlsesanForm = (e) => {
     
     if(e.target.value === "lainya") {
      setAlesanForm(e.target.value)
      setAlasan("")
     } else {
      setAlesanForm(e.target.value)
    setAlasan(e.target.value)
     }
  }
  return (
    <main className="bg-bantuansosial bg-login">
      <div
        className="bgLogin position-absolute d-flex justify-content-center align-items-center "
        style={{
          width: "100% !important",
          height: "100%",
          zIndex: 2,
          top: 0,
        }}
      >
        <div
          className="border border-2 rounded p-5 bg-white position-absolute container"
          style={{
            zIndex: 10,
          }}
        >
          <div
            className="position-relative mb-2"
            style={{
              width: "100%",
              height: "",
            }}
          ></div>
          <form onSubmit={handelSubmit}>
            <h2 className="text-center">Bantuan sosial</h2>
            <p className="text-danger">{message}</p>
            {loading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
            <div className="row">
              <div className="col-md-4">
                <div className="">
                  {/* form untuk data diri */}
                  <p>Data diri</p>

                  <div className="form-floating mb-3 overflow-hidden">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="nama"
                      name="nama"
                      value={nama}
                      onChange={e => setNama(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Nama lengkap</label>
                  </div>

                  <div className="form-floating mb-3 overflow-hidden">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="nik"
                      name="nik"
                      value={nik}
                      onChange={e => setNik(e.target.value)}
                    />
                    <label htmlFor="floatingInput">
                      Nomor Induk Kependudukan
                    </label>
                  </div>

                  <div className="form-floating mb-3 overflow-hidden">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="nkk"
                      name="nkk"
                      value={nkk}
                      onChange={e => setNkk(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Nomor Kartu keluarga</label>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      Foto KTP
                    </label>
                    <input className="form-control" type="file" id="formFile" onChange={addKtp} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      Foto KK
                    </label>
                    <input className="form-control" type="file" id="formFile" onChange={addKk} />
                  </div>

                  <div className="form-floating mb-3 overflow-hidden">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="umur"
                      name="umur"
                      value={umur}
                      onChange={e => setUmur(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Umur</label>
                  </div>

                  <div className="mb-3">
                    <p>Jenis Kelamin</p>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        defaultChecked={jk}
                        onChange={e => setJk(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Perempuan
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        defaultChecked={jk}
                        onChange={e => setJk(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Laki laki
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                Alamat detail
                <div className="mb-3 mt-1">
                  <label htmlFor="namajurusan" className="form-label">
                    Provinsi
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue={provForm}
                    onChange={handleProv}
                  >
                    <option value={""}>Pilih Provinsi</option>
                    {provinsi.length !== 0 &&
                      provinsi.map((p) => (
                        <option key={p.id} value={`${p.id}-${p.name}`}>
                          {p.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="namajurusan" className="form-label">
                    Kota
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue={kabKotForm}
                    onChange={handleKota}
                  >
                    <option value={""}>Pilih Kota</option>
                    {kabKot.length !== 0 &&
                      kabKot.map((p) => (
                        <option key={p.id} value={`${p.id}-${p.name}`}>
                          {p.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="namajurusan" className="form-label">
                    Kecamatan
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue={kecForm}
                    onChange={handleKec}
                  >
                    <option value={""}>Pilih Kecamatan</option>
                    {kec.length !== 0 &&
                      kec.map((p) => (
                        <option key={p.id} value={`${p.id}-${p.name}`}>
                          {p.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="namajurusan" className="form-label">
                    Kelurahaan
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue={kelForm}
                    onChange={(e) => setKelForm(e.target.value)}
                  >
                    <option value={""}>Pilih Kelurahan</option>
                    {kel.length !== 0 &&
                      kel.map((p) => (
                        <option key={p.id} value={`${p.id}-${p.name}`}>
                          {p.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Alamat
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows={3}
                    name="alamat"
                      value={alamat}
                      onChange={e => setAlamat(e.target.value)}
                  />
                </div>

                <div className="mb-3 row">
                        <div className="col-5">
                        <div className="form-floating ">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="rt"
                      name="rt"
                      value={rt}
                      onChange={e => setRt(e.target.value)}
                    />
                    <label htmlFor="floatingInput">
                      RT
                    </label>
                  </div>
                        </div>
                        <div className="col-5">
                        <div className="form-floating ">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="rw"
                      name="rw"
                      value={rw}
                      onChange={e => setRw(e.target.value)}
                    />
                    <label htmlFor="floatingInput">
                      RW
                    </label>
                  </div>
                        </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="">
                  {/* form untuk data diri */}
                  <p>Penghasilan</p>

                  

                  <div className="form-floating mb-3 overflow-hidden">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="penghasilansbp"
                      name="penghasilansbp"
                      value={penghasilansbp}
                      onChange={e => setPenghasilansbp(e.target.value)}
                    />
                    <label htmlFor="floatingInput">
                      Penghasilan sebelum pandemi
                    </label>
                  </div>

                  <div className="form-floating mb-3 overflow-hidden">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="penghasilanstp"
                      name="penghasilanstp"
                      value={penghasilanstp}
                      onChange={e => setPenghasilanstp(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Penghasilan sesudah pandemi</label>
                  </div>

                  <div className="mb-3">
                  <label htmlFor="namajurusan" className="form-label">
                    Alasan
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue={alesanForm}
                    onChange={handleAlsesanForm}
                  >
                    <option value={""}>Pilih Alasan</option>
                    <option value={"Kehilangan pekerjaan"}>Kehilangan pekerjaan</option>
                    <option value={"Kepala keluarga terdampak atau korban Covid-19 "}>Kepala keluarga terdampak atau korban Covid-19 </option>
                    <option value={"Tergolong fakir/miskin semenjak sebelum Covid-19"}>Tergolong fakir/miskin semenjak sebelum Covid-19</option>
                    <option value={"lainya"}>lainya</option>
                    
                  </select>
                </div>

{alesanForm === 'lainya' && (

                  <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Alasan Membutuhkan bantuan
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows={3}
                    placeholder="alasan"
                      name="alasan"
                      value={alasan}
                      onChange={e => setAlasan(e.target.value)}
                  />
                </div>
)}

                  
                </div>
              </div>
            </div>

            <div className="form-check mt-2">
  <input
    className="form-check-input"
    type="checkbox"
    defaultValue={centang}
    onChange={() => setCentang(!centang)}
    id="flexCheckDefault"
  />
  <label className="form-check-label" htmlFor="flexCheckDefault">
  Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut.
  </label>
</div>

            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-primary" type="submit">
                Kirim
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
