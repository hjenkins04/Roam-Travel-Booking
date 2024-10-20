"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface PaymentFormProps {
  onSubmit: (event: React.FormEvent) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Render form when component is mounted
  if (!isMounted) {
    return null;
  }

  return (
    <Card className="p-6 shadow-md relative">
      <CardContent>
        <form className="space-y-6 relative z-10" onSubmit={onSubmit}>
          <h3 className="text-xl font-semibold">Personal Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Cardholder&apos;s Name</Label>
              <Input id="name" placeholder="Enter the cardholder's name" />
            </div>
            <div>
              <Label htmlFor="address">Address Line</Label>
              <Input id="address" placeholder="Enter your address" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Enter your city" />
            </div>
            <div>
              <Label htmlFor="province">Province</Label>
              <Input id="province" placeholder="Enter your province" />
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input id="postalCode" placeholder="Enter your postal code" />
            </div>
          </div>

          <h3 className="text-xl font-semibold">Payment Details</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <div className="flex items-center">
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9123 4567"
                    className="pl-12"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input id="expiryDate" placeholder="MM/YY" />
              </div>
              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="CVC" />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
