'use client';

import React from "react"

import { useState } from 'react';
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
  return name.length >= 2 && name.length <= 100 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name);
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
  const [errors, setErrors] = useState<{name?: string; email?: string; message?: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeInput(value),
    }));
    // Limpiar errores del campo actual
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
      newErrors.name = 'El nombre debe tener entre 2 y 100 caracteres y solo contener letras.';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor, ingresa un email válido.';
    }

    if (!validateMessage(formData.message)) {
      newErrors.message = 'El mensaje debe tener entre 5 y 1000 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Obtener variables de entorno
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    
    // Format the message with form data
    const whatsappMessage = `Hola, mi nombre es ${formData.name}. ${formData.message}. Mi correo es: ${formData.email}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success message
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

        <p className="text-center text-gray-700 dark:text-[#a0a8c0] mb-12 text-lg">
          Tengo interés en oportunidades freelance, proyectos innovadores y colaboraciones. 
          Si tienes algo interesante en mente, ¡envíame un mensaje!
        </p>

        <div className="bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-[#2a3f5f] rounded-2xl p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-[#e0e6f7] mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-[#0a0e27] border ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-200 dark:border-[#2a3f5f]'} rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#4a5a7a] focus:outline-none focus:border-[#0084ff] focus:ring-2 focus:ring-[#0084ff]/30 transition-all duration-300`}
                placeholder="Tu nombre"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-[#e0e6f7] mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-[#0a0e27] border ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-200 dark:border-[#2a3f5f]'} rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#4a5a7a] focus:outline-none focus:border-[#0084ff] focus:ring-2 focus:ring-[#0084ff]/30 transition-all duration-300`}
                placeholder="tu@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900 dark:text-[#e0e6f7] mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className={`w-full px-4 py-3 bg-gradient-to-br from-white/30 dark:from-white/5 to-white/10 dark:to-white/5 backdrop-blur-md border ${errors.message ? 'border-red-500 dark:border-red-500' : 'border-white/30 dark:border-white/10'} rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#4a5a7a] focus:outline-none focus:border-[#0084ff]/50 focus:ring-2 focus:ring-[#0084ff]/20 transition-all duration-300 resize-none shadow-[0_4px_16px_0_rgba(31,38,135,0.05)]`}
                placeholder="Cuéntame sobre tu proyecto o consulta..."
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-gradient-to-r from-[#0084ff] to-[#00d4ff] hover:from-[#0066cc] hover:to-[#00b8ff]'} text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-[#0084ff]/50 flex items-center justify-center gap-2 group disabled:cursor-not-allowed disabled:hover:scale-100`}
            >
              {submitted ? (
                <>
                  <span>✓ Enviado</span>
                </>
              ) : isLoading ? (
                <>
                  <span className="inline-block animate-spin">⏳</span>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>Enviar Mensaje</span>
                </>
              )}
            </button>

            {submitted && (
              <div className="text-center text-[#00d4ff] text-sm font-semibold">
                Gracias por tu mensaje. Te responderé pronto.
              </div>
            )}
          </form>
        </div>

        {/* Quick Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-[#2a3f5f] rounded-lg p-6 text-center hover:border-[#0084ff] transition-colors">
            <div className="text-[#0084ff] dark:text-[#00d4ff] text-2xl font-bold mb-2">Email</div>
            <p className="text-gray-700 dark:text-[#a0a8c0] text-sm">diazmendoadriana04@gmail.com</p>
          </div>
          <div className="bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-[#2a3f5f] rounded-lg p-6 text-center hover:border-[#0084ff] transition-colors">
            <div className="text-[#0084ff] dark:text-[#00d4ff] text-2xl font-bold mb-2">Teléfono</div>
            <p className="text-gray-700 dark:text-[#a0a8c0] text-sm">+51 904 431 167</p>
          </div>
          <div className="bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-[#2a3f5f] rounded-lg p-6 text-center hover:border-[#0084ff] transition-colors">
            <div className="text-[#0084ff] dark:text-[#00d4ff] text-2xl font-bold mb-2">Ubicación</div>
            <p className="text-gray-700 dark:text-[#a0a8c0] text-sm">Chiclayo, Lambayeque</p>
          </div>
        </div>
      </div>
    </section>
  );
}
