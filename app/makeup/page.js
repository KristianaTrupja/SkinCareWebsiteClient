"use client";

import { useState } from "react";
import Link from "next/link";
import Cushions from "./categories/Cushions";
import Eyes from "./categories/Eyes";
import Foundation from "./categories/Foundation";
import LipsProducts from "./categories/LipsProducts";
import Paletes from "./categories/Paletes";

const Makeup = () => {
  const [selectedTab, setSelectedTab] = useState("cushions");

  const renderEditor = () => {
    switch (selectedTab) {
      case "cushions":
        return <Cushions />;
      case "eyes":
        return <Eyes />;
      case "foundation":
        return <Foundation />;
      case "lips-products":
        return <LipsProducts />;
      case "paletes":
        return <Paletes />;
      default:
        return <Cushions />;
    }
  };

  const tabs = [
    { id: "cushions", label: "Cushions" },
    { id: "eyes", label: "Syte" },
    { id: "foundation", label: "Fondatina" },
    { id: "lips-products", label: "Produkte per buzet" },
    { id: "paletes", label: "Palete" },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Mobile Dashboard (Top Navigation) */}
      <div className="lg:hidden w-full bg-lightBlush shadow-lg p-4 flex overflow-x-auto space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 whitespace-nowrap rounded-md transition ${
              selectedTab === tab.id
                ? "bg-softCoral text-white shadow-md"
                : "text-softCoral hover:bg-rosy/20"
            }`}
            onClick={() => setSelectedTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Desktop Sidebar Navigation */}
      <aside className="hidden lg:flex lg:flex-col lg:w-1/5 bg-lightBlush shadow-lg p-5">
        <h2 className="text-xl font-semibold text-softCoral mb-6">Dashboard</h2>
        <ul className="space-y-4">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                className={`w-full text-left px-4 py-2 rounded-md transition ${
                  selectedTab === tab.id
                    ? "bg-softCoral text-white shadow-md"
                    : "text-softCoral hover:bg-rosy/20"
                }`}
                onClick={() => setSelectedTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <Link href="/home">
            <button className="w-full bg-softCoral text-white py-2 rounded-lg shadow-md transition hover:bg-peach">
              Go Home
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div>
          {renderEditor()}
        </div>
      </main>
    </div>
  );
};

export default Makeup;
