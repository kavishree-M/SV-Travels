import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, Send, Check, MessageSquare } from 'lucide-react';
import { COMPANY_CONTACT } from '../data/travelData';
import { useLanguage } from '../context/LanguageContext';

interface ContactSectionProps {
  onBookTrip: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onBookTrip }) => {
  const { t } = useLanguage();
  const [quickMessageSent, setQuickMessageSent] = useState(false);
  const [quickContact, setQuickContact] = useState({ name: '', email: '', message: '' });

  const handleQuickContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickContact.name || !quickContact.email) return;
    setQuickMessageSent(true);
    setTimeout(() => {
      setQuickMessageSent(false);
      setQuickContact({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-widest text-sky-700 dark:text-sky-400 uppercase mb-2">
            {t('contact.sectionTag')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {t('contact.sectionTitle')}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {t('contact.sectionDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Official Contact Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900/90 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 space-y-6">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-3">
                {t('contact.officeHeader')}
              </h3>

              <div className="space-y-5 text-sm">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">{t('contact.phoneSupport')}</div>
                    <a
                      href={`tel:${COMPANY_CONTACT.phone}`}
                      className="text-neutral-900 dark:text-white font-bold hover:text-sky-700 dark:hover:text-sky-400 transition-colors text-base"
                    >
                      {COMPANY_CONTACT.phone}
                    </a>
                    <div className="text-[11px] text-neutral-500 mt-0.5">{t('contact.phoneNote')}</div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">{t('contact.whatsAppEnquiry')}</div>
                    <a
                      href={COMPANY_CONTACT.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline transition-colors block text-sm"
                    >
                      {t('contact.whatsAppChatAction')}
                    </a>
                    <div className="text-[11px] text-neutral-500 mt-0.5">{t('contact.whatsAppNote')}</div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">{t('contact.officialEmail')}</div>
                    <a
                      href={`mailto:${COMPANY_CONTACT.email}`}
                      className="text-neutral-900 dark:text-white font-bold hover:text-sky-700 dark:hover:text-sky-400 transition-colors break-all"
                    >
                      {COMPANY_CONTACT.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">{t('contact.businessAddress')}</div>
                    <p className="text-neutral-800 dark:text-neutral-300 mt-0.5 leading-relaxed font-medium">
                      {COMPANY_CONTACT.address}
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">{t('contact.operatingHours')}</div>
                    <p className="text-neutral-800 dark:text-neutral-300 mt-0.5">
                      {COMPANY_CONTACT.operatingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Call, WhatsApp, Book */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${COMPANY_CONTACT.phone}`}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
                    <span>{t('contact.callBtn')}</span>
                  </a>

                  <a
                    href={COMPANY_CONTACT.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-750 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{t('common.whatsApp')}</span>
                  </a>
                </div>

                <button
                  onClick={onBookTrip}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-900 dark:bg-sky-600 dark:hover:bg-sky-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
                >
                  <span>{t('contact.bookTripBtn')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick General Message / Direct Enquiry Prompt */}
          <div className="lg:col-span-7 bg-neutral-50 dark:bg-neutral-900/90 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
              {t('contact.quickEnquiryHeader')}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
              {t('contact.quickEnquiryDesc')}
            </p>

            {quickMessageSent ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-900 dark:text-emerald-200 flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="text-sm">
                  {t('contact.thankYou')}
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuickContact} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      {t('contact.yourName')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('contact.namePlaceholder')}
                      value={quickContact.name}
                      onChange={(e) => setQuickContact({ ...quickContact, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      {t('contact.emailAddress')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t('contact.emailPlaceholder')}
                      value={quickContact.email}
                      onChange={(e) => setQuickContact({ ...quickContact, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={t('contact.messagePlaceholder')}
                    value={quickContact.message}
                    onChange={(e) => setQuickContact({ ...quickContact, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {t('contact.quickFormNote')}
                  </span>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-neutral-900 dark:text-neutral-100 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 active:bg-neutral-400 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>{t('contact.sendMessage')}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
