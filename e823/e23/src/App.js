import React, { useState } from 'react';
import './componentes/styles.css'; 

function ContadorSimple() {
  const [contador, setContador] = useState(0);
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [mensajeLimpieza, setMensajeLimpieza] = useState('');

  const incrementarContador = () => {
    setContador(contador + 1);
  };

  const decrementarContador = () => {
    setContador(contador - 1);
  };

  const agregarTarea = () => {
    if (nuevaTarea.trim() !== '') {
      setTareas([...tareas, { texto: nuevaTarea, completada: false }]);
      setNuevaTarea('');
    }
  };

  const completarTarea = (indice) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[indice].completada = true;
    setTareas(nuevasTareas);
  };

  const eliminarTarea = (indice) => {
    const nuevasTareas = tareas.filter((_, i) => i !== indice);
    setTareas(nuevasTareas);
  };

  const limpiarCampos = () => {
    setNombre('');
    setEmail('');
    setPassword('');
    setMensajeLimpieza('Se ha limpiado el contenido ingresado');
    setSubmittedData(null);
  };

  const validarFormulario = () => {
    const newErrors = {};

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    }

    if (!password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmittedData({ nombre, email, password });
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    return now.toLocaleString('es-ES', options);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Rudy Griffin - REACTJS</h1>
      </header>

      <h1>Contador Simple</h1>
      <p>Valor del contador: {contador}</p>
      <button onClick={incrementarContador}>Incrementar</button>
      <button onClick={decrementarContador}>Decrementar</button>

      <hr />

      <h2>Lista de Tareas</h2>
      <input
        type="text"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button onClick={agregarTarea}>Agregar</button>
      <ul>
        {tareas.map((tarea, indice) => (
          <li key={indice}>
            {tarea.texto}
            {!tarea.completada && (
              <>
                <button onClick={() => completarTarea(indice)}>Completar Tarea</button>
                <button onClick={() => eliminarTarea(indice)}>Eliminar</button>
              </>
            )}
            {tarea.completada && <p>Tarea completada</p>}
          </li>
        ))}
      </ul>

      <hr />

      <div className="form-container">
        <h2>Formulario de Registro</h2>
        <div className="form-input-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        {errors.nombre && <p className="error">{errors.nombre}</p>}

        <div className="form-input-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && <p className="error">{errors.email}</p>}

        <div className="form-input-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors.password && <p className="error">{errors.password}</p>}

        <button onClick={limpiarCampos}>Limpiar</button>
        <button onClick={validarFormulario}>Registrar</button>
        {mensajeLimpieza && (
          <div className="card">
            <p>{mensajeLimpieza}</p>
          </div>
        )}

        {submittedData && (
          <div className="card">
            <h3>Datos Registrados:</h3>
            <p>Nombre: {submittedData.nombre.toUpperCase()}</p>
            <p>Correo Electrónico: {submittedData.email}</p>
            <p>Contraseña: {submittedData.password}</p>
          </div>
        )}
      </div>

      <div className="form-separator" />

      <footer className="app-footer">
        <p>Rudy Griffin</p>
        <p>{getCurrentDateTime()}</p>
      </footer>
    </div>
  );
}

export default ContadorSimple;
