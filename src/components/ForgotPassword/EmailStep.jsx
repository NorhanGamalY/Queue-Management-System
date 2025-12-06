"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from 'flowbite-react';
import Link from 'next/link';
import { MdOutlineMailLock } from 'react-icons/md';

export default function EmailStep({ email, setEmail, onSendCode }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <Label htmlFor="email" className="flex items-center gap-2">
          <MdOutlineMailLock />
          Email Address
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#ECECF0] dark:bg-[#37332f] dark:text-white"
          placeholder="email@example.com"
          required
        />
      </div>

      <Button className="w-full" onClick={onSendCode}>
        Send Reset Code
      </Button>

      <div className="text-center">
        <Link href="/login" className="text-sm text-[#29b7a4] hover:underline font-medium flex items-center justify-center gap-2">
          <span>←</span> Back to Login
        </Link>
      </div>
    </div>
  );
}
