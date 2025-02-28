"use client";

import { useState } from "react";
import Link from "next/link";
import AboutUsEditor from "./components/AboutUsEditor";
import StageEditor from "./components/StageEditor";
import ServicesEditor from "./components/ServicesEditor";
import ProductEditor from "./components/ProductEditor";
import BrandsEditor from "./components/BrandsEditor";
import CushionsEditor from "./components/makeup/CushionsEditor";
import EyesEditor from "./components/makeup/EyesEditor";
import FoundationEditor from "./components/makeup/FoundationEditor";
import LipsProductsEditor from "./components/makeup/LipsProductsEditor";
import PaletesEditor from "./components/makeup/PaletesEditor";
import AccessoriesEditor from "./components/AcessoriesEditor";

const ContentEditor = () => {
  const [selectedTab, setSelectedTab] = useState("stage");

  const renderEditor = () => {
    switch (selectedTab) {
      case "stage":
        return <StageEditor />;
      case "about-us":
        return <AboutUsEditor />;
      case "services":
        return <ServicesEditor />;
      case "products":
        return <ProductEditor />;
      case "brands":
        return <BrandsEditor />;
      case "cushions":
        return <CushionsEditor />;
      case "eyes":
        return <EyesEditor />;
      case "foundation":
        return <FoundationEditor />;
      case "lips":
        return <LipsProductsEditor />;
      case "paletes":
        return <PaletesEditor />;
      case "accessories":
        return <AccessoriesEditor />;
      default:
        return <StageEditor />;
    }
  };

  const tabs = [
    { id: "stage", label: "Stage" },
    { id: "about-us", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "products", label: "Products" },
    { id: "brands", label: "Brands" },
    { id: "cushions", label: "Cushions" },
    { id: "eyes", label: "Eyes" },
    { id: "foundation", label: "Foundation" },
    { id: "lips", label: "Lips" },
    { id: "paletes", label: "Paletes" },
    { id: "accessories", label: "Accessories" },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-warmBeige">
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
        <div className="bg-white p-6 rounded-lg shadow-md border border-goldenYellow">
          {renderEditor()}
        </div>
      </main>
    </div>
  );
};

export default ContentEditor;
