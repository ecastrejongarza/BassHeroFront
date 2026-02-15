import React, { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return alert("Ingresa una URL de YouTube");
    
    setLoading(true);
    setNotas([]); // limpiar notas previas

    try {
      const res = await fetch("http://localhost:8080/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error("Error en el backend");

      const data = await res.json();

      // Nueva salida: notas con cuerda y traste
      // data.notas es un array de strings tipo "C#4 (Cuerda 4, Traste 6)"
      // ya no filtramos con regex rígido
      setNotas(data.notas);

    } catch (err) {
      console.error(err);
      alert("Error al procesar la URL");
    } finally {
      setLoading(false);
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

      {loading && <p>Procesando la canción, por favor espera...</p>}

      {notas.length > 0 && (
        <div className="notas">
          <h2>Notas a tocar:</h2>
          <p>{notas.join(" → ")}</p> {/* Flechas tipo tablatura */}
        </div>
      )}
    </div>
  );
}

export default App;
