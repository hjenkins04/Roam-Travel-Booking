"use client";

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarIcon, UserIcon, PlusIcon, MinusIcon } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

const SearchBox = () => {
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [passengers, setPassengers] = useState([{ class: 'Economy' }])

  const addPassenger = () => {
    setPassengers([...passengers, { class: 'Economy' }])
  }

  const removePassenger = () => {
    if (passengers.length > 1) {
      setPassengers(passengers.slice(0, -1))
    }
  }

  const updatePassengerClass = (index: number, newClass: 'Business' | 'Economy') => {
    const updatedPassengers = [...passengers]
    updatedPassengers[index].class = newClass
    setPassengers(updatedPassengers)
  }

  const getPassengerButtonText = () => {
    const count = passengers.length
    const allBusiness = passengers.every(p => p.class === 'Business')
    const allEconomy = passengers.every(p => p.class === 'Economy')

    if (allBusiness) return `${count} Business`
    if (allEconomy) return `${count} Economy`
    return `${count} Varying`
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span>One Way</span>
          <Switch />
          <span>Round Trip</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Input placeholder="YYZ Toronto Pearson International" />
        <Input placeholder="HNL Honolulu Daniel K. Inouye International" />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${!departureDate && "text-muted-foreground"}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {departureDate ? format(departureDate, "PPP") : <span>Departure Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${!returnDate && "text-muted-foreground"}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {returnDate ? format(returnDate, "PPP") : <span>Return Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <UserIcon className="mr-2 h-4 w-4" />
              {getPassengerButtonText()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Passengers</span>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" onClick={removePassenger} disabled={passengers.length === 1}>
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span>{passengers.length}</span>
                  <Button size="sm" variant="outline" onClick={addPassenger}>
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {passengers.map((passenger, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>Passenger {index + 1}</span>
                  <Select
                    value={passenger.class}
                    onValueChange={(value: 'Business' | 'Economy') => updatePassengerClass(index, value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Economy">Economy</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600">Search Flights</Button>
    </div>
  );
}

export default SearchBox;
