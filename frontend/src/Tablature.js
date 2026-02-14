import React from "react";
import "./Tablature.css"; // Para estilos opcionales

const strings = ["E", "A", "D", "G", "B", "e"]; // Desde la más grave a la más aguda

export default function Tablature({ notes }) {
  if (!notes || notes.length === 0) return null;

  // Inicializa la tablatura
  const tablature = strings.map(() => []);

  // Coloca las notas en las cuerdas correspondientes
  notes.forEach(note => {
    const match = note.match(/^([A-Ga-g])(\d)$/); // Ej: E1, C2
    if (match) {
      const [_, string, fret] = match;
      // Mapea las cuerdas según tu preferencia (EADGBe)
      const index = strings.findIndex(s => s.toUpperCase() === string.toUpperCase());
      if (index !== -1) {
        tablature[index].push(fret);
      }
    }
  });

  // Asegura que todas las cuerdas tengan la misma longitud
  const maxLength = Math.max(...tablature.map(t => t.length));
  tablature.forEach((t, i) => {
    while (t.length < maxLength) t.push("-");
  });

  return (
    <div className="tablature">
      {tablature.map((t, i) => (
        <div key={i} className="string">
          <span className="string-name">{strings[i]}|</span>
          {t.map((fret, j) => (
            <span key={j} className="fret">{fret}-</span>
          ))}
        </div>
      ))}
    </div>
  );
}
