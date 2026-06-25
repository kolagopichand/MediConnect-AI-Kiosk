import React, { useState } from "react";
import { ActiveTab, Language, UserRole } from "../types";
import { LANGUAGES, TRANSLATIONS } from "../data";
import { Activity, Menu, X, ShieldAlert, User, Globe, LayoutDashboard } from "lucide-react";

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  userRole,
  setUserRole,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const navigationItems: { tab: ActiveTab; label: string }[] = [
    { tab: "home", label: t.aboutUs || "Home" },
    { tab: "about", label: "About" },
    { tab: "solutions", label: "Solutions" },
    { tab: "technology", label: "AI Tech" },
    { tab: "kiosk", label: "Interactive Kiosk" },
    { tab: "services", label: "Services" },
    { tab: "pricing", label: "Pricing" },
    { tab: "casestudies", label: "Case Studies" },
    { tab: "blog", label: "Blog" },
    { tab: "contact", label: "Book Demo" },
  ];

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case "patient":
        return "Patient Access";
      case "doctor":
        return "Tele-Physician";
      case "admin":
        return "System Admin";
      case "org_manager":
        return "Org Manager";
      default:
        return "Auth Role";
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "patient":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "doctor":
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "admin":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "org_manager":
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-100 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => setActiveTab("home")}
          className="flex items-center space-x-2 cursor-pointer group"
          id="header-logo-container"
        >
          <div className="bg-gradient-to-tr from-blue-600 to-teal-400 p-2 rounded-xl text-white shadow-md shadow-blue-100 group-hover:scale-105 transition-transform duration-200">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg md:text-xl text-gray-900 leading-none">
              MediConnect <span className="text-blue-600 font-normal">AI</span>
            </h1>
            <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase font-medium">
              Kiosk Systems
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1" id="desktop-nav-menu">
          {navigationItems.map((item) => (
            <button
              key={item.tab}
              id={`nav-tab-${item.tab}`}
              onClick={() => {
                setActiveTab(item.tab);
                setMobileMenuOpen(false);
              }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                activeTab === item.tab
                  ? "bg-blue-500/10 text-blue-700 font-semibold border border-blue-500/20"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/40 hover:backdrop-blur-xs"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Controls (Language & Role Switcher & Portal) */}
        <div className="hidden sm:flex items-center space-x-3" id="header-right-controls">
          {/* Language Selector */}
          <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
            <Globe className="h-4 w-4 text-gray-400 mr-1" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-xs font-medium text-gray-700 focus:outline-none cursor-pointer pr-1"
              id="language-select"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Role Authenticator Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold shadow-xs hover:bg-gray-50 transition-all ${getRoleBadgeColor(
                userRole
              )}`}
              id="role-dropdown-btn"
            >
              <User className="h-3.5 w-3.5" />
              <span>{getRoleLabel(userRole)}</span>
            </button>
            {roleMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-48 glass border border-white/40 rounded-xl shadow-lg py-1.5 z-50 animate-fade-in"
                id="role-dropdown-menu"
              >
                <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100/10 mb-1">
                  Simulate User Role
                </div>
                {(["patient", "doctor", "admin", "org_manager"] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setUserRole(role);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between ${
                      userRole === role
                        ? "bg-blue-500/10 text-blue-700 font-semibold"
                        : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                    }`}
                  >
                    <span>{getRoleLabel(role)}</span>
                    {userRole === role && (
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Provider/Client Dashboard Direct Access Link */}
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-all ${
              activeTab === "dashboard"
                ? "bg-blue-600 text-white shadow-blue-100"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
            id="provider-portal-btn"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>Portal</span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center space-x-2 lg:hidden">
          {/* Portable Language switch */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-gray-50 border border-gray-200 rounded-lg p-1 text-xs font-medium focus:outline-none cursor-pointer"
            id="mobile-language-select"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.code.toUpperCase()}
              </option>
            ))}
          </select>

          {/* Portable Portal Button */}
          <button
            onClick={() => setActiveTab("dashboard")}
            className="p-1.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
            id="mobile-portal-btn"
          >
            <LayoutDashboard className="h-4 w-4" />
          </button>

          {/* Hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-gray-150 flex flex-col space-y-1 glass p-2 rounded-xl shadow-xs" id="mobile-nav-drawer">
          {navigationItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => {
                setActiveTab(item.tab);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.tab
                  ? "bg-blue-500/10 text-blue-700 font-semibold border-l-4 border-blue-600 pl-3"
                  : "text-gray-600 hover:bg-white/40"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2 px-3">
            <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
              Simulation Role:
            </span>
            <div className="flex flex-wrap gap-1">
              {(["patient", "doctor", "admin", "org_manager"] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setUserRole(role);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2 py-1 rounded text-[10px] font-bold border transition-all ${
                    userRole === role
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-50 text-gray-600 border-gray-200"
                  }`}
                >
                  {role.toUpperCase().replace("_", " ")}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
