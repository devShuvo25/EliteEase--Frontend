"use client";
import { Country } from 'country-state-city';
import { useState, useRef, useEffect, useMemo } from 'react';

const RegisterPhone = () => {
  const allCountries = useMemo(() => Country.getAllCountries(), []);
  
  // State Management
  const [selectedCountry, setSelectedCountry] = useState('BD');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Derived Data
  const countryData = useMemo(() => 
    Country.getCountryByCode(selectedCountry), 
  [selectedCountry]);

  const phoneCode = countryData?.phonecode.startsWith('+') 
    ? countryData?.phonecode 
    : `+${countryData?.phonecode}`;

  // Filtered Countries based on Search
  const filteredCountries = allCountries.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phonecode.includes(searchTerm) ||
    c.isoCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-md mx-auto p-6" ref={dropdownRef}>
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-900 ml-1">
          Phone Number <span className="text-red-500">*</span>
        </label>

        <div className={`
          flex items-stretch bg-white border-2 rounded-xl transition-all duration-200
          ${isOpen ? 'border-blue-500 ring-4 ring-blue-50/50' : 'border-gray-200 hover:border-gray-300'}
        `}>
          
          {/* Custom Select Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 h-full px-4 border-r border-gray-200 hover:bg-gray-50 transition-colors rounded-l-lg"
            >
              <img 
                src={`https://flagcdn.com/w40/${selectedCountry.toLowerCase()}.png`} 
                alt={selectedCountry}
                className="w-6 h-4 object-cover rounded-sm shadow-sm"
              />
              <span className="font-bold text-gray-700">{selectedCountry}</span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-150">
                {/* Search Bar inside dropdown */}
                <div className="p-2 border-b border-gray-100 bg-gray-50">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search country or code..."
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                    />
                    <svg className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Country List */}
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <button
                        key={country.isoCode}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country.isoCode);
                          setIsOpen(false);
                          setSearchTerm('');
                        }}
                        className={`
                          w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors text-left
                          ${selectedCountry === country.isoCode ? 'bg-blue-50/50' : ''}
                        `}
                      >
                        <img 
                          src={`https://flagcdn.com/w20/${country.isoCode.toLowerCase()}.png`} 
                          alt="" 
                          className="w-5 h-3.5 object-cover rounded-sm shadow-xs"
                        />
                        <span className="flex-1 text-sm font-medium text-gray-700 truncate">{country.name}</span>
                        <span className="text-xs font-semibold text-gray-400">+{country.phonecode}</span>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">No results found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Phone Number Input Area */}
          <div className="flex items-center flex-1 px-4">
            <span className="text-gray-500 font-semibold mr-2 pointer-events-none">
              {phoneCode}
            </span>
            <input
              type="tel"
              autoComplete="tel"
              placeholder="1700 000 000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
              className="w-full py-3 outline-none text-gray-900 font-medium placeholder:text-gray-300 bg-transparent"
            />
          </div>
        </div>

        {/* Professional Footer Info */}
        <div className="flex items-center justify-between px-1">
          <p className="text-[11px] text-gray-400 font-medium">
            Format: <span className="text-gray-600">{phoneCode} {phoneNumber || 'XXXXXXXXX'}</span>
          </p>
          {phoneNumber.length > 0 && (
            <span className="flex items-center gap-1 text-[11px] text-green-600 font-bold">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Input detected
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPhone;