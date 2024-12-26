import React, { useState } from 'react';

interface Usuario {
  nombre: string;
  apellido: string;
  edad: number;
  correo: string;
}

const UsuarioForm = () => {
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: '',
    apellido: '',
    edad: 0,
    correo: '',
  });

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsuarios([...usuarios, usuario]);
    setUsuario({
      nombre: '',
      apellido: '',
      edad: 0,
      correo: '',
    });
  };

  const handleExport = () => {
    const csvContent = usuarios.map((usuario) => {
      return [
        usuario.nombre,
        usuario.apellido,
        usuario.edad,
        usuario.correo,
      ].join(',');
    }).join('\n');

    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const csvLink = document.createElement('a');
    csvLink.href = csvUrl;
    csvLink.download = 'usuarios.csv';
    csvLink.click();
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Ingrese datos de usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="nombre"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
            Apellido
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="apellido"
            name="apellido"
            value={usuario.apellido}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edad">
            Edad
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="edad"
            name="edad"
            value={usuario.edad}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo">
            Correo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="correo"
            name="correo"
            value={usuario.correo}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Agregar
        </button>
      </form>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        onClick={handleExport}
      >
        Exportar a CSV
      </button>
      <ul className="list-none mt-4">
        {usuarios.map((usuario, index) => (
          <li key={index} className="bg-gray-100 p-4 mb-2 rounded-md shadow-md">
            <p>Nombre: {usuario.nombre}</p>
            <p>Apellido: {usuario.apellido}</p>
            <p>Edad: {usuario.edad}</p>
            <p>Correo: {usuario.correo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsuarioForm;