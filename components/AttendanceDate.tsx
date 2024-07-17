import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DateContextProps {
  date: Date;
  setDate: (date: Date) => void;
}

export const DateContext = createContext<DateContextProps | undefined>(undefined);

export const DateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [date, setDate] = useState(new Date());

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDate = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
};
