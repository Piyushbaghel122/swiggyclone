import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface CustomPhoneInputProps {
  value: string;
  setValue: (val: string) => void;
  className?: string;
}

export default function CustomPhoneInput({ value, setValue, className }: CustomPhoneInputProps) {
  // Use any since Country is defined in react-phone-number-input
  const [country, setCountry] = useState<any>("IN");

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        if (data.country_code) {
          setCountry(data.country_code);
        }
      } catch (error) {
        console.error("Country detection failed:", error);
        // fallback
        setCountry("IN");
      }
    };

    detectCountry();
  }, []);

  return (
    <div className={className}>
      <PhoneInput
        international
        defaultCountry={country}
        country={country}
        value={value}
        onChange={(val) => setValue(val || "")}
        placeholder="Enter phone number"
        className="w-full flex items-center gap-3"
        numberInputProps={{
          className: "bg-transparent border-none outline-none flex-1 w-full text-sm focus:ring-0 shadow-none p-0"
        }}
        style={{
          '--PhoneInputCountryFlag-height': '1em',
          '--PhoneInputCountrySelectArrow-color': 'currentColor'
        } as React.CSSProperties}
      />
    </div>
  );
}
