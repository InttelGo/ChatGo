import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Política de Privacidad</h1>
      <p className="mb-2">
        Bienvenido/a a nuestra Política de Privacidad. Tu privacidad es
        importante para nosotros.
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Información Recopilada</h2>
      <p className="mb-2">
        Recopilamos datos personales como nombre, correo electrónico y
        credenciales de acceso cuando usas nuestros servicios.
      </p>

      <h2 className="text-xl font-semibold mt-4">2. Uso de la Información</h2>
      <p className="mb-2">
        Usamos la información para mejorar tu experiencia, personalizar el
        servicio y garantizar la seguridad de la plataforma.
      </p>

      <h2 className="text-xl font-semibold mt-4">3. Protección de Datos</h2>
      <p className="mb-2">
        Implementamos medidas de seguridad para proteger tu información contra
        accesos no autorizados.
      </p>

      <h2 className="text-xl font-semibold mt-4">4. Cambios en la Política</h2>
      <p className="mb-2">
        Nos reservamos el derecho de actualizar esta política. Te notificaremos
        sobre cambios importantes.
      </p>

      <p className="mt-4">Última actualización: 25 de Febrero de 2025</p>
    </div>
  );
};

export default PrivacyPolicyPage;