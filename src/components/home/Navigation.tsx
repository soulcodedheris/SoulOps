"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  Heart,
  Menu,
  X,
  Globe,
  Users,
  BookOpen,
  Video,
  LogOut,
  User,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Features", href: "/#features" },
    { name: "Community", href: "/#community" },
    { name: "Contact", href: "/#contact" },
  ];

  const quickActions = [
    { name: "Get Started", href: "/auth", icon: Globe },
    { name: "Dashboard", href: "/dashboard", icon: Users },
    { name: "Learn", href: "/dashboard/learn", icon: BookOpen },
    { name: "Consultation", href: "/dashboard/consultation", icon: Video },
  ];

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SoulOps</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.displayName || user.firstName || user.email}
                  </span>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                    >
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button size="sm" className="btn-primary">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors duration-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              {/* User Info */}
              {user && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {user.displayName || user.firstName || user.email}
                      </p>
                      <p className="text-sm text-gray-600">Welcome back!</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="space-y-2 mb-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="space-y-2 mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Quick Actions
                </h3>
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center py-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                  >
                    <action.icon className="w-4 h-4 mr-3" />
                    {action.name}
                  </Link>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                {user ? (
                  <>
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button className="w-full btn-primary">Dashboard</Button>
                    </Link>
                    <button onClick={handleLogout} className="w-full">
                      <Button variant="outline" className="w-full">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth" onClick={() => setIsOpen(false)}>
                      <Button className="w-full btn-primary">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
