'use client';

import { useEffect, useState } from 'react';
import type { CartItem } from '@/lib/types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: string;
}

export default function CheckoutModal({ isOpen, onClose, items, total }: CheckoutModalProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const parseBRLToNumber = (txt: string) =>
      parseFloat(txt.replace(/[R$\s]/g, '').replace(/\./g, '').replace(',', '.')) || 0;

    function emv(id: string, value: string) {
      const len = String(value.length).padStart(2, '0');
      return id + len + value;
    }
    function sanitize(txt: string, max: number) {
      return txt.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9 \-&]/g, ' ')
        .substring(0, max).trim();
    }
    function crc16(str: string) {
      let crc = 0xFFFF;
      for (let i = 0; i < str.length; i++) {
        crc ^= (str.charCodeAt(i) << 8);
        for (let j = 0; j < 8; j++) {
          if (crc & 0x8000) crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
          else crc = (crc << 1) & 0xFFFF;
        }
      }
      return crc.toString(16).toUpperCase().padStart(4, '0');
    }
    interface PixPayload {
  name: string;
  city: string;
  amount: number;
  txid: string;
}

function buildPixPayload({ name, city, amount, txid }: PixPayload) {
  // chave Pix fixa
  const key = '16999614758';

  const gui = emv('00', 'BR.GOV.BCB.PIX');
  const k = emv('01', key);
  const mai = emv('26', gui + k);
  const mcc = emv('52', '0000');
  const curr = emv('53', '986');
  const amt = (amount > 0) ? emv('54', String(amount)) : '';
  const ctry = emv('58', 'BR');
  const mname = emv('59', sanitize(name, 25) || 'LOJA');
  const mcity = emv('60', sanitize(city, 15) || 'BRASIL');
  const add = emv('62', emv('05', txid || '***'));

  const base = '000201' + mai + mcc + curr + amt + ctry + mname + mcity + add + '6304';
  return base + crc16(base);
}

    }

    const amount = parseBRLToNumber(total).toFixed(2);
    const payload = buildPixPayload({
      key: '16999614758', // SUA CHAVE PIX
      name: 'Acai Fruit King',
      city: 'SAO PAULO',
      amount,
      txid: 'CHECKOUT' + Date.now().toString().slice(-6),
    });

    QRCode.toDataURL(payload, { width: 220, margin: 1 })
      .then(setQrCodeDataUrl)
      .catch(console.error);
  }, [isOpen, total]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[400px] p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 text-xl">&times;</button>
        <h2 className="text-xl font-semibold text-acai-primary text-center mb-4">Checkout - Açaí Fruit King</h2>

        <div className="max-h-40 overflow-y-auto mb-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-1 text-sm">
              <span>{item.name}</span>
              <span>{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
          ))}
        </div>

        <div className="text-right font-bold text-acai-primary mb-4">Total: {total}</div>

        <div className="flex flex-col items-center">
          {qrCodeDataUrl && <img src={qrCodeDataUrl} alt="Pix QR Code" className="w-56 h-56" />}
          <p className="text-sm text-gray-600 mt-2">Escaneie o QR Code para pagar com Pix</p>
        </div>
      </div>
    </div>
  );
}
