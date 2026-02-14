import React, { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [notas, setNotas] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error("Error en el backend");

      const data = await res.json();
      // Filtramos solo notas válidas: letra de A-G + número de octava
      const notasValidas = data.notas.filter((n) => /^[A-G][0-9]$/.test(n));
      setNotas(notasValidas);
    } catch (err) {
      console.error(err);
      alert("Error al procesar la URL");
    }
  };

  return (
    <div className="App">
      <h1>Bajosterr</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingresa URL de YouTube"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Procesar</button>
      </form>

      {notas.length > 0 && (
        <div className="notas">
          <h2>Notas a tocar:</h2>
          <p>{notas.join(" - ")}</p>
        </div>
      )}
    </div>
  );
}

export default App;
