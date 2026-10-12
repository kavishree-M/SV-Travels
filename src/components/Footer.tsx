import React from 'react';
import { MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_CONTACT, getLocalizedServices } from '../data/travelData';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenBooking: () => void;
  onSelectService: (serviceName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onSelectService,
}) => {
  const { t, language } = useLanguage();
  const services = getLocalizedServices(language);

  const navLinks = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.whyUs'), href: '#why-us' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Organisation Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-black text-base shadow-sm">
                SV
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                {t('common.brand')}
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              {t('footer.desc')}
            </p>

            <div className="text-xs text-neutral-400">
              <span className="text-neutral-300 font-semibold block mb-0.5">{t('footer.mottoLabel')}</span>
              <span>{t('footer.mottoVal')}</span>
            </div>

            {/* Quick WhatsApp Action */}
            <div className="pt-2">
              <a
                href={COMPANY_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>{t('common.whatsApp')}: {COMPANY_CONTACT.phone}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footer.quickLinksHeader')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footer.servicesHeader')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
              {services.map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => onSelectService(srv.name)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {srv.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Coordinates */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footer.contactHeader')}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <span>{COMPANY_CONTACT.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
                <a href={`tel:${COMPANY_CONTACT.phone}`} className="hover:text-white font-medium">
                  {COMPANY_CONTACT.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                <a href={`mailto:${COMPANY_CONTACT.email}`} className="hover:text-white break-all">
                  {COMPANY_CONTACT.email}
                </a>
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-sm transition-colors"
                >
                  {t('footer.submitEnquiryBtn')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Privacy Notice & Copyright */}
        <div className="mt-14 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} {t('footer.copyright')}
          </div>

          <div className="flex items-center gap-6 text-neutral-500">
            <span>{t('footer.privacyNotice')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
