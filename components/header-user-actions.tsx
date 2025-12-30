"use client";

import { User, ShoppingCart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@tern-secure/nextjs";
import { clearNextSessionCookie } from "@/app/action";
import { authHandlerOptions } from "@/lib/auth";

function Cart() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-10 w-10">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[420px] p-0" align="end">
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="rounded-full bg-muted p-4 mb-3">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h4 className="font-medium mb-1">Your cart is empty</h4>
          <p className="text-sm text-muted-foreground text-pretty">
            Browse available numbers and add them to your cart
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function Profile() {
  const { signOut } = useAuth();
  const createSignOut = () => {
    signOut({
      async onBeforeSignOut() {
        await clearNextSessionCookie({
          cookies: authHandlerOptions.cookies,
          revokeRefreshTokensOnSignOut:
            authHandlerOptions.revokeRefreshTokensOnSignOut,
        });
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
          <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-900 dark:text-white font-medium">
              Admin
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={createSignOut}
          className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 focus:bg-red-50 dark:focus:bg-red-950 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function HeaderUserActions() {
  return (
    <div className="flex items-center gap-3">
      <Cart />
      <Profile />
    </div>
  );
}
