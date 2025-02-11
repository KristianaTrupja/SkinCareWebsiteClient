"use client";

import { useState } from "react";
import Link from "next/link";
import AboutUsEditor from "./components/AboutUsEditor";
import StageEditor from "./components/StageEditor";
import ServicesEditor from "./components/ServicesEditor";
import ProductEditor from "./components/ProductEditor";
import BrandsEditor from "./components/BrandsEditor";

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
        return <BrandsEditor/>
      default:
        return <StageEditor />;
    }
  };

  return (
    <div className="min-h-screen flex bg-warmBeige">
      {/* Sidebar Navigation */}
      <aside className="w-1/5 bg-lightBlush shadow-lg p-5 hidden lg:block">
        <h2 className="text-xl font-semibold text-softCoral mb-6">Dashboard</h2>
        <ul className="space-y-4">
          {[
            { id: "stage", label: "Stage" },
            { id: "about-us", label: "About Us" },
            { id: "services", label: "Services" },
            { id: "products", label: "Products" },
            { id: "brands", label: "Brands" },
          ].map((tab) => (
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
        <div className="mt-10">
          <Link href={"/home"}>
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
