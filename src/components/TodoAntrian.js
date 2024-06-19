import { useState, useEffect } from "react";

export function TodoAntrian() {
  const [antrian, setAntrian] = useState([]);

  useEffect(() => {
    const storedAntrian = getAntrianFromLocalStorage();
    if (storedAntrian) {
      setAntrian(storedAntrian);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const namaInput = document.getElementById("nama");
    const emailInput = document.getElementById("email");
    const nomorInput = document.getElementById("nomor");
    const alamatInput = document.getElementById("alamat");

    const nama = namaInput.value.trim();
    const email = emailInput.value.trim();
    const nomor = nomorInput.value.trim();
    const alamat = alamatInput.value.trim();
    const data = {
      id: Date.now(),
      nama,
      email,
      nomor,
      alamat,
    };

    if (nama !== "" || email !== "" || nomor !== "" || alamat !== "") {
      const antrian = getAntrianFromLocalStorage();
      antrian.push(data);
      setAntrian([...antrian]);
      simpanAntrianToLocalStorage(antrian);
    }
    document.forms["form"].reset();
  };

  function getAntrianFromLocalStorage() {
    let antrianJSON = localStorage.getItem("antrian");
    return antrianJSON ? JSON.parse(antrianJSON) : [];
  }

  function simpanAntrianToLocalStorage(antrian) {
    localStorage.setItem("antrian", JSON.stringify(antrian));
  }

  return (
    <div>
      <h1>Remidial React</h1>
      <form
        onSubmit={handleSubmit}
        id="form"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <label for="nama" style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="Masukkan nama"
            id="nama"
            name="nama"
            style={{
              width: "80%",
              padding: "8px 13px",
              borderRadius: "4px",
              border: "1px solid gray",
            }}
          />
        </label>
        <label for="email">
          <input
            type="email"
            placeholder="Masukkan email"
            id="email"
            name="email"
            style={{
              width: "80%",
              padding: "8px 13px",
              borderRadius: "4px",
              border: "1px solid gray",
            }}
          />
        </label>
        <label for="nomor">
          <input
            type="number"
            placeholder="Masukkan nomor"
            id="nomor"
            name="nomor"
            style={{
              width: "80%",
              padding: "8px 13px",
              borderRadius: "4px",
              border: "1px solid gray",
            }}
          />
        </label>
        <label for="nama">
          <textarea
            id="alamat"
            name="alamat"
            placeholder="Masukkan alamat"
            style={{
              width: "80%",
              padding: "8px 13px",
              borderRadius: "4px",
              border: "1px solid gray",
            }}
          ></textarea>
        </label>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="submit"
            value="Tambahkan Antrian"
            style={{
              width: "82%",
              padding: "8px 13px",
              textAlign: "center",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#4CAF50",
              color: "white",
            }}
          />
        </div>
      </form>
      <hr style={{ width: "80%" }} />
      <h1>Formulir Register</h1>
      <div
        style={{
          display: "flex",
          width: "80%",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {antrian.map((item, index) => (
          <div
            style={{
              width: "20%",
              border: "1px solid grey",
              textAlign: "left",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>ID: {item.id}</span>
            <span>Nama: {item.nama}</span>
            <span>Email: {item.email}</span>
            <span>Nomor: {item.nomor}</span>
            <span>Alamat: {item.alamat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
