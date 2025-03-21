import { useState, useEffect } from 'react';
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {
  // Inicializar el estado con los datos del localStorage si existen
  const [pacientes, setPacientes] = useState(() => {
    return JSON.parse(localStorage.getItem('pacientes')) ?? [];
  });

  const [paciente, setPaciente] = useState({});

  // Guardar en localStorage cuando cambia 'pacientes', pero solo si no está vacío
  useEffect(() => {
    if (pacientes.length > 0) {
      localStorage.setItem('pacientes', JSON.stringify(pacientes));
    }
  }, [pacientes]);

  // Función para eliminar un paciente
  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id);
    setPacientes(pacientesActualizados);
  };

  return (
    <div className="container mx-auto mt-20">
      <Header />

      <div className="mt-12 md:flex">
        <Formulario 
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />

        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  );
}

export default App;
