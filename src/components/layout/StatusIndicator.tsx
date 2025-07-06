'use client';

import { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { storeInfo } from '@/lib/data/mock-data';

export default function StatusIndicator() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState<string>('');

  useEffect(() => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const now = new Date();
    const dayName = days[now.getDay()];
    setCurrentDay(dayName);

    // Check if store is open based on current time
    if (storeInfo.openingHours[dayName]) {
      const { open, close } = storeInfo.openingHours[dayName];
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      const [openHour, openMinute] = open.split(':').map(Number);
      const [closeHour, closeMinute] = close.split(':').map(Number);

      const currentTimeInMinutes = currentHour * 60 + currentMinute;
      const openTimeInMinutes = openHour * 60 + openMinute;
      const closeTimeInMinutes = closeHour * 60 + closeMinute;

      setIsOpen(currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes <= closeTimeInMinutes);
    } else {
      setIsOpen(false);
    }
  }, []);

  return (
    <div className="flex items-center">
      <div className={`status-badge ${isOpen ? 'status-open' : 'status-closed'}`}>
        <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${isOpen ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
        {isOpen ? 'Aberto' : 'Fechado'}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
            <Info className="h-4 w-4" />
            <span className="sr-only">Informações de horário</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Horário de funcionamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-4">
            {Object.entries(storeInfo.openingHours).map(([day, hours]) => (
              <div key={day} className="flex justify-between items-center py-1 border-b">
                <span className={day === currentDay ? 'font-bold text-acai-primary' : ''}>{day}</span>
                <span>{hours.open} às {hours.close}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
