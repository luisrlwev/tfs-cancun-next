import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";

export default function Formulario({ show, onClose }) {
    if (!show) {
        return null;
    }

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [condiciones, setCondiciones] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('/api/form-modal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, tel, mensaje, condiciones }),
      });
      if (respuesta.ok) {
        console.log("Correo enviado con éxito");
        // Aquí puedes manejar una respuesta exitosa, como limpiar el formulario o mostrar un mensaje
      } else {
        console.log("Error al enviar el correo");
        // Manejar errores
      }
    } catch (error) {
      console.error("Hubo un error al enviar el correo: ", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-40" onClick={onClose}>
      <div className="grid grid-cols-2 max-lg:grid-cols-1 relative top-60 max-lg:top-40 mx-auto p-5 border w-modal shadow-lg bg-modal" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-0 right-0 mt-2 mr-2"><FaXmark className="text-2xl text-red-600"/></button>
        <div className="p-4">
            <h2 className='uppercase text-4xl text-secondary font-bold letter-spacing-25 text-center pb-3'>¿Dudas?</h2>
            <form className="w-full pb-5 max-lg:pb-8 text-black" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-3">
                <div className="col-span-1">
                  <input type="text" name="nombre" id="nombre" placeholder="Nombre: Ej. John Doe" className="w-full rounded-md bg-decimo text-secondary placeholder:text-gray-600 p-3" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                </div>
                <div className="col-span-1">
                  <input type="email" name="email" id="email" placeholder="Email: Ej. hola@dominio.com" className="w-full rounded-md bg-decimo text-secondary placeholder:text-gray-600 p-3" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="col-span-1">
                  <input type="tel" name="tel" id="tel" placeholder="Teléfono: Ej. +52 984 123 4567" className="w-full rounded-md bg-decimo text-secondary placeholder:text-gray-600 p-3" value={tel} onChange={(e) => setTel(e.target.value)} required/>
                </div>
                <div className="col-span-1">
                  <textarea name="mensaje" id="mensaje" cols="30" rows="1" placeholder="¿Qué tipo de propiedad buscas?" className="w-full rounded-md bg-decimo text-secondary placeholder:text-gray-600 p-3" value={mensaje} onChange={(e) => setMensaje(e.target.value)} required></textarea>
                </div>
                <div className="col-span-1 text-secondary">
                  <input type="checkbox" name="condiciones" id="condiciones" value={condiciones} onChange={(e) => setCondiciones(e.target.value)} checked required/> Acepto los <Link href="/aviso-de-privacidad" target="_blank" className="text-tfs hover">términos y condiciones</Link>
                </div>
                <div className="col-span-1 text-center">
                  <input type="submit" name="submit" id="submit" className="py-2 px-12 bg-tfs uppercase text-white font-bold letter-spacing-25 rounded-md hover-bg cursor-pointer"/>
                </div>
              </div>
            </form>
          <h4 className="uppercase letter-spacing-25 text-tfs text-center font-bold pb-4">¡Síguenos!</h4>
          <p className="text-center text-secondary font-bold text-sm">@tulumfromsky</p>
        </div>
        <div className="flex max-lg:hidden">
            <Image src={'/img/portada-modal.webp'} width={415} height={490} alt="imagen modal" />
        </div>
      </div>
    </div>
  )
}