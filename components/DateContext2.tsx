import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DateContextProps {
  date2: Date;
  setDate2: (date2: Date) => void;
}

export const DateContext2 = createContext<DateContextProps | undefined>(undefined);

export const DateProvider2: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [date2, setDate2] = useState(new Date());

  return (
    <DateContext2.Provider value={{ date2, setDate2 }}>
      {children}
    </DateContext2.Provider>
  );
};

export const useDate2 = () => {
  const context = useContext(DateContext2);
  if (!context) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
};
