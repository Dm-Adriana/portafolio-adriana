'use client';

import React, { useState } from "react";
import { Send } from 'lucide-react';

// Funciones de validación y sanitización
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 500);
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateName = (name: string): boolean => {
  return (
    name.length >= 2 &&
    name.length <= 100 &&
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)
  );
};

const validateMessage = (message: string): boolean => {
  return message.length >= 5 && message.length <= 1000;
};

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeInput(value),
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!validateName(formData.name)) {
      newErrors.name =
        'El nombre debe tener entre 2 y 100 caracteres y solo contener letras.';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor, ingresa un email válido.';
    }

    if (!validateMessage(formData.message)) {
      newErrors.message =
        'El mensaje debe tener entre 5 y 1000 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

    if (!whatsappNumber) {
      alert('El contacto no está disponible en este momento.');
      setIsLoading(false);
      return;
    }

    const whatsappMessage = `Hola, mi nombre es ${formData.name}. ${formData.message}. Mi correo es: ${formData.email}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappUrl, '_blank');

    setSubmitted(true);

    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <section className="min-h-screen bg-[#f5f8ff] dark:bg-gradient-to-br dark:from-[#0a0e27] dark:via-[#1a1f3a] dark:to-[#0a0e27] flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          <span className="bg-gradient-to-r from-[#0084ff] to-[#00d4ff] bg-clip-text text-transparent">
            Contáctame
          </span>
        </h2>

        <p className="text-center text-gray-700 dark:text-[#a0a8c0] mb-12 text-lg leading-relaxed">
          Estoy abierta a proyectos freelance, colaboraciones tecnológicas y
          desafíos innovadores.  
          Si tienes una idea o proyecto en mente, conversemos.
        </p>

        <div className="bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-[#2a3f5f] rounded-2xl p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-invalid={!!errors.name}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-[#0a0e27] border ${
                  errors.name
                    ? 'border-red-500'
                    : 'border-gray-200 dark:border-[#2a3f5f]'
                } rounded-lg focus:ring-2 focus:ring-[#0084ff]/30`}
                placeholder="Tu nombre"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-invalid={!!errors.email}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-[#0a0e27] border ${
                  errors.email
                    ? 'border-red-500'
                    : 'border-gray-200 dark:border-[#2a3f5f]'
                } rounded-lg focus:ring-2 focus:ring-[#0084ff]/30`}
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Mensaje
              </label>
              <textarea
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                aria-invalid={!!errors.message}
                className={`w-full px-4 py-3 resize-none leading-relaxed bg-gradient-to-br from-white/30 dark:from-white/5 to-white/10 dark:to-white/5 border ${
                  errors.message
                    ? 'border-red-500'
                    : 'border-white/30 dark:border-white/10'
                } rounded-lg focus:ring-2 focus:ring-[#0084ff]/20`}
                placeholder="Cuéntame sobre tu proyecto o consulta..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#0084ff] to-[#00d4ff] text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#0084ff]/40 transition-all"
            >
              {submitted ? '✓ Enviado' : isLoading ? 'Enviando...' : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar Mensaje
                </>
              )}
            </button>

            {submitted && (
              <p className="text-center text-[#00d4ff] font-semibold">
                Gracias por tu mensaje. Te responderé pronto.
              </p>
            )}
          </form>
        </div>

        {/* Contacto rápido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            ['Email', 'diazmendoadriana04@gmail.com'],
            ['Teléfono', '+51 904 431 167'],
            ['Ubicación', 'Chiclayo, Lambayeque'],
          ].map(([title, value]) => (
            <div
              key={title}
              className="bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-[#2a3f5f] rounded-lg p-6 text-center hover:border-[#0084ff] hover:shadow-md hover:shadow-[#0084ff]/20 transition-all"
            >
              <h4 className="text-[#0084ff] text-xl font-bold mb-2">
                {title}
              </h4>
              <p className="text-gray-700 dark:text-[#a0a8c0] text-sm">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
