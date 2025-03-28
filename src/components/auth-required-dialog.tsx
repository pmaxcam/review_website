"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

interface AuthRequiredDialogProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  redirectUrl?: string;
}

export function AuthRequiredDialog({
  trigger,
  title = "Authentication Required",
  description = "Please log in or create an account to continue",
  children,
  redirectUrl,
}: AuthRequiredDialogProps) {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleTriggerClick = () => {
    if (isAuthenticated) {
      if (redirectUrl) {
        router.push(redirectUrl);
      }
      return;
    }
    
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={handleTriggerClick}>
        {trigger}
      </div>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children || (
          <div className="flex flex-col space-y-4 py-4">
            <Button asChild>
              <Link href="/auth/login">Log in</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/auth/signup">Create account</Link>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 