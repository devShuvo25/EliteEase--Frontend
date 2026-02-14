import React from 'react'
import { Country }  from 'country-state-city';
import RegisterPhone from '@/components/test';
export default function page() {
    console.log("Country", Country.getAllCountries())
  return (
    <div>
        <h1><RegisterPhone/></h1>
    </div>
  )
}
