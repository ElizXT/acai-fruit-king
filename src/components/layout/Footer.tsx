'use client';

import {
  MapPin,
  Phone,
  Clock,
  CreditCard,
  Info,
  ExternalLink
} from 'lucide-react';
import { storeInfo } from '@/lib/data/mock-data';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Store Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Informações da loja
            </h3>

            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-acai-primary shrink-0 mt-0.5 mr-2" />
                <span className="text-sm">
                  {storeInfo.address}
                </span>
              </div>

              <div className="flex items-center">
                <Phone className="h-5 w-5 text-acai-primary shrink-0 mr-2" />
                <a href={`tel:${storeInfo.phone}`} className="text-sm hover:underline">
                  {storeInfo.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Horário
            </h3>

            <div className="space-y-1">
              {Object.entries(storeInfo.openingHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between text-sm">
                  <span>{day}</span>
                  <span>{hours.open} às {hours.close}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Pagamento
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {storeInfo.paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-acai-primary rounded-full mr-2"></div>
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} {storeInfo.name}. Todos os direitos reservados.</p>

          <div className="flex items-center mt-4 md:mt-0">
            <a
              href="https://alfalabs.com.br/politicaprivacidade.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline mr-4 flex items-center"
            >
              Política de privacidade e termos de uso
            </a>

            <a
              href="https://alfalabs.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center"
            >
              Desenvolvido por <strong className="ml-1">alfalabs.com.br</strong>
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
