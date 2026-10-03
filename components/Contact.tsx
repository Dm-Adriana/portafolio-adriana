'use client';

import React, { useState } from "react";
import { Send } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const WHATSAPP_FALLBACK = '51904431167';

// Funciones de validación y sanitización
// Se limpia mientras se escribe, sin recortar espacios (eso se hace al enviar)
const sanitizeInput = (input: string): string => {
  return input
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
  const { t } = useLanguage();
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

    if (!validateName(formData.name.trim())) {
      newErrors.name = t.contact.errName;
    }

    if (!validateEmail(formData.email.trim())) {
      newErrors.email = t.contact.errEmail;
    }

    if (!validateMessage(formData.message.trim())) {
      newErrors.message = t.contact.errMessage;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Si la variable de entorno no está configurada se usa el número público de la página
    const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || WHATSAPP_FALLBACK).replace(/\D/g, '');

    const whatsappMessage = `${t.contact.waIntro} ${formData.name.trim()}. ${formData.message.trim()}. ${t.contact.waEmail} ${formData.email.trim()}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Si el navegador bloquea la ventana emergente, se abre en la misma pestaña
    // (sin 'noopener' en las opciones: con él window.open siempre devuelve null)
    const popup = window.open(whatsappUrl, '_blank');
    if (popup) {
      popup.opener = null;
    } else {
      window.location.href = whatsappUrl;
    }

    setSubmitted(true);

    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <section className="min-h-screen bg-[#f6f8fc] dark:bg-gradient-to-br dark:from-[#0a0e27] dark:via-[#1a1f3a] dark:to-[#0a0e27] flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          <span className="text-gradient">{t.contact.title}</span>
        </h2>

        <p className="text-center text-slate-700 dark:text-[#a0a8c0] mb-12 text-lg leading-relaxed max-w-2xl mx-auto">
          {t.contact.intro}
        </p>

        <div className="bg-white dark:bg-[#1a1f3a] border border-gray-200/80 dark:border-[#2a3f5f] rounded-2xl p-6 sm:p-8 lg:p-12 shadow-[0_10px_40px_-15px_rgba(15,23,42,0.15)] dark:shadow-none">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-800 dark:text-[#e0e6f7]">
                {t.contact.name}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-invalid={!!errors.name}
                className={`w-full px-4 py-3 bg-slate-50 dark:bg-[#0a0e27] text-slate-900 dark:text-[#e0e6f7] placeholder:text-slate-400 dark:placeholder:text-[#7c86a6] outline-none focus:border-[#0084ff] transition-colors border ${
                  errors.name
                    ? 'border-red-500'
                    : 'border-gray-200 dark:border-[#2a3f5f]'
                } rounded-lg focus:ring-2 focus:ring-[#0084ff]/30`}
                placeholder={t.contact.namePlaceholder}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-800 dark:text-[#e0e6f7]">
                {t.contact.email}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-invalid={!!errors.email}
                className={`w-full px-4 py-3 bg-slate-50 dark:bg-[#0a0e27] text-slate-900 dark:text-[#e0e6f7] placeholder:text-slate-400 dark:placeholder:text-[#7c86a6] outline-none focus:border-[#0084ff] transition-colors border ${
                  errors.email
                    ? 'border-red-500'
                    : 'border-gray-200 dark:border-[#2a3f5f]'
                } rounded-lg focus:ring-2 focus:ring-[#0084ff]/30`}
                placeholder={t.contact.emailPlaceholder}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-800 dark:text-[#e0e6f7]">
                {t.contact.message}
              </label>
              <textarea
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                aria-invalid={!!errors.message}
                className={`w-full px-4 py-3 resize-none leading-relaxed bg-slate-50 dark:bg-[#0a0e27] text-slate-900 dark:text-[#e0e6f7] placeholder:text-slate-400 dark:placeholder:text-[#7c86a6] outline-none focus:border-[#0084ff] transition-colors border ${
                  errors.message
                    ? 'border-red-500'
                    : 'border-gray-200 dark:border-[#2a3f5f]'
                } rounded-lg focus:ring-2 focus:ring-[#0084ff]/30`}
                placeholder={t.contact.messagePlaceholder}
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
              {submitted ? t.contact.sent : isLoading ? t.contact.sending : (
                <>
                  <Send className="w-5 h-5" />
                  {t.contact.send}
                </>
              )}
            </button>

            {submitted && (
              <p className="text-center text-[#0066cc] dark:text-[#00d4ff] font-semibold">
                {t.contact.thanks}
              </p>
            )}
          </form>
        </div>

        {/* Contacto rápido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            [t.contact.emailLabel, 'diazmendoadriana04@gmail.com'],
            [t.contact.phoneLabel, '+51 904 431 167'],
            [t.contact.locationLabel, 'Chiclayo, Lambayeque'],
          ].map(([title, value]) => (
            <div
              key={title}
              className="bg-white dark:bg-[#1a1f3a] border border-gray-200 dark:border-[#2a3f5f] shadow-sm dark:shadow-none rounded-lg p-6 text-center hover:border-[#0084ff] hover:shadow-md hover:shadow-[#0084ff]/20 transition-all"
            >
              <h4 className="text-[#0066cc] dark:text-[#0084ff] text-xl font-bold mb-2">
                {title}
              </h4>
              <p className="text-slate-700 dark:text-[#a0a8c0] text-sm break-words">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
