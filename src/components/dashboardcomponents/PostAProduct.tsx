"use client";

import React, { useState } from 'react';
import { createProduct } from '@/lib/actions/productpost';
import {
  FiPlusCircle,
  FiFileText,
  FiImage,
  FiSettings,
  FiCheckCircle,
  FiAlertCircle,
  FiCpu,
  FiHardDrive,
  FiSmartphone,
  FiTv,
  FiCamera,
  FiSliders,
  FiBattery
} from 'react-icons/fi';

type CategoryType = 'Laptop' | 'Phone' | 'Earphone' | 'Camera' | 'Smartphone' | 'Monitor' | 'Tablet' | '';

export default function PostAProduct() {
  const [category, setCategory] = useState<CategoryType>('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Common Fields
  const [commonData, setCommonData] = useState({
    title: '',
    brand: '',
    price: '',
    stock: '',
    imageUrl: '',
    description: '',
  });

  // Dynamic Fields State
  const [dynamicData, setDynamicData] = useState<Record<string, string>>({});

  const handleCommonChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCommonData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value as CategoryType;
    setCategory(selectedCategory);
    setDynamicData({}); // Reset dynamic data on category change
  };

  const handleDynamicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDynamicData((prev) => ({ ...prev, [name]: value }));
  };

  // Check category-specific fields to render
  const renderDynamicFields = () => {
    switch (category) {
      case 'Laptop':
        return (
          <>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Processor (CPU)</label>
              <input
                type="text"
                name="processor"
                placeholder="e.g. Intel Core i7 / AMD Ryzen 7"
                required
                value={dynamicData.processor || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">RAM Capacity</label>
              <input
                type="text"
                name="ram"
                placeholder="e.g. 16GB DDR5"
                required
                value={dynamicData.ram || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Storage</label>
              <input
                type="text"
                name="storage"
                placeholder="e.g. 1TB NVMe SSD"
                required
                value={dynamicData.storage || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Graphics Card (GPU)</label>
              <input
                type="text"
                name="gpu"
                placeholder="e.g. NVIDIA RTX 4060"
                required
                value={dynamicData.gpu || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Display Size</label>
              <input
                type="text"
                name="displaySize"
                placeholder="e.g. 15.6 Inch WQXGA"
                required
                value={dynamicData.displaySize || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Battery Capacity</label>
              <input
                type="text"
                name="batteryCapacity"
                placeholder="e.g. 90Wh"
                required
                value={dynamicData.batteryCapacity || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
          </>
        );

      case 'Phone':
      case 'Smartphone':
        return (
          <>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">RAM Capacity</label>
              <input
                type="text"
                name="ram"
                placeholder="e.g. 8GB"
                required
                value={dynamicData.ram || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Storage</label>
              <input
                type="text"
                name="storage"
                placeholder="e.g. 256GB"
                required
                value={dynamicData.storage || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Battery (mAh)</label>
              <input
                type="text"
                name="battery"
                placeholder="e.g. 5000 mAh"
                required
                value={dynamicData.battery || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Main Camera</label>
              <input
                type="text"
                name="mainCamera"
                placeholder="e.g. 50 MP + 12 MP"
                required
                value={dynamicData.mainCamera || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Front Camera</label>
              <input
                type="text"
                name="frontCamera"
                placeholder="e.g. 32 MP"
                required
                value={dynamicData.frontCamera || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Screen Size</label>
              <input
                type="text"
                name="screenSize"
                placeholder="e.g. 6.7 Inch"
                required
                value={dynamicData.screenSize || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
          </>
        );

      case 'Earphone':
        return (
          <>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Type</label>
              <select
                name="earphoneType"
                required
                value={dynamicData.earphoneType || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              >
                <option value="" disabled className="bg-[#0c0c14] text-gray-400">Select earphone type</option>
                <option value="Wireless Earbuds (TWS)" className="bg-[#0c0c14] text-white">Wireless Earbuds (TWS)</option>
                <option value="Neckband" className="bg-[#0c0c14] text-white">Neckband</option>
                <option value="Over-Ear Headphones" className="bg-[#0c0c14] text-white">Over-Ear Headphones</option>
                <option value="Wired Earphones" className="bg-[#0c0c14] text-white">Wired Earphones</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Battery Life</label>
              <input
                type="text"
                name="batteryLife"
                placeholder="e.g. 30 Hours"
                required
                value={dynamicData.batteryLife || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Active Noise Cancellation (ANC)</label>
              <select
                name="noiseCancelling"
                required
                value={dynamicData.noiseCancelling || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              >
                <option value="" disabled className="bg-[#0c0c14] text-gray-400">Select Noise Cancelling status</option>
                <option value="Yes" className="bg-[#0c0c14] text-white">Yes</option>
                <option value="No" className="bg-[#0c0c14] text-white">No</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Bluetooth Version</label>
              <input
                type="text"
                name="bluetoothVersion"
                placeholder="e.g. v5.3"
                required
                value={dynamicData.bluetoothVersion || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
          </>
        );

      case 'Camera':
        return (
          <>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Megapixels (Resolution)</label>
              <input
                type="text"
                name="resolution"
                placeholder="e.g. 24.2 MP"
                required
                value={dynamicData.resolution || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Sensor Type</label>
              <input
                type="text"
                name="sensorType"
                placeholder="e.g. Full-frame CMOS / APS-C"
                required
                value={dynamicData.sensorType || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Lens Options</label>
              <input
                type="text"
                name="lensIncluded"
                placeholder="e.g. 18-55mm Kit Lens / Body Only"
                required
                value={dynamicData.lensIncluded || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Video Resolution</label>
              <input
                type="text"
                name="videoResolution"
                placeholder="e.g. 4K at 60 fps"
                required
                value={dynamicData.videoResolution || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
          </>
        );

      case 'Monitor':
        return (
          <>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Screen Size</label>
              <input
                type="text"
                name="screenSize"
                placeholder="e.g. 27 Inch / 32 Inch"
                required
                value={dynamicData.screenSize || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Resolution</label>
              <input
                type="text"
                name="resolution"
                placeholder="e.g. 3840 x 2160 (4K UHD) / 2K"
                required
                value={dynamicData.resolution || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Refresh Rate</label>
              <input
                type="text"
                name="refreshRate"
                placeholder="e.g. 144Hz / 240Hz"
                required
                value={dynamicData.refreshRate || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Panel Type</label>
              <select
                name="panelType"
                required
                value={dynamicData.panelType || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              >
                <option value="" disabled className="bg-[#0c0c14] text-gray-400">Select Panel Type</option>
                <option value="IPS" className="bg-[#0c0c14] text-white">IPS</option>
                <option value="VA" className="bg-[#0c0c14] text-white">VA</option>
                <option value="OLED" className="bg-[#0c0c14] text-white">OLED</option>
                <option value="TN" className="bg-[#0c0c14] text-white">TN</option>
              </select>
            </div>
          </>
        );

      case 'Tablet':
        return (
          <>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Screen Size</label>
              <input
                type="text"
                name="screenSize"
                placeholder="e.g. 11 Inch"
                required
                value={dynamicData.screenSize || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">RAM Capacity</label>
              <input
                type="text"
                name="ram"
                placeholder="e.g. 8GB"
                required
                value={dynamicData.ram || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Storage</label>
              <input
                type="text"
                name="storage"
                placeholder="e.g. 128GB"
                required
                value={dynamicData.storage || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Cellular Connectivity</label>
              <select
                name="cellularOption"
                required
                value={dynamicData.cellularOption || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              >
                <option value="" disabled className="bg-[#0c0c14] text-gray-400">Select connection option</option>
                <option value="Wi-Fi Only" className="bg-[#0c0c14] text-white">Wi-Fi Only</option>
                <option value="Wi-Fi + Cellular" className="bg-[#0c0c14] text-white">Wi-Fi + Cellular</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#A78BFA] ml-1">Battery Capacity</label>
              <input
                type="text"
                name="batteryCapacity"
                placeholder="e.g. 8000 mAh"
                required
                value={dynamicData.batteryCapacity || ''}
                onChange={handleDynamicChange}
                className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
              />
            </div>
          </>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-48 border border-dashed border-[#8B5CF6]/15 rounded-2xl p-6 bg-[#111122]/30 text-center">
            <FiSliders className="text-gray-600 animate-pulse text-3xl mb-2" />
            <p className="text-sm font-semibold text-gray-400">Select a category to view dynamic specifications</p>
            <p className="text-xs text-gray-500 mt-1">Different categories will display customized input fields</p>
          </div>
        );
    }
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'Laptop': return <FiCpu className="text-[#EC4899]" />;
      case 'Phone':
      case 'Smartphone': return <FiSmartphone className="text-[#EC4899]" />;
      case 'Earphone': return <FiBattery className="text-[#EC4899]" />;
      case 'Camera': return <FiCamera className="text-[#EC4899]" />;
      case 'Monitor': return <FiTv className="text-[#EC4899]" />;
      case 'Tablet': return <FiSmartphone className="text-[#EC4899]" />;
      default: return <FiSliders className="text-[#8B5CF6]" />;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    if (!category) {
      setErrorMsg("Please select a product category!");
      setLoading(false);
      return;
    }

    const payload = {
      ...commonData,
      price: parseFloat(commonData.price),
      stock: parseInt(commonData.stock, 10),
      category,
      specifications: dynamicData,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await createProduct(payload);
      if (res.success) {
        setSuccessMsg(res.message || "Product created successfully!");
        // Reset states
        setCommonData({
          title: '',
          brand: '',
          price: '',
          stock: '',
          imageUrl: '',
          description: '',
        });
        setCategory('');
        setDynamicData({});
      } else {
        setErrorMsg(res.message || "Failed to create product.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An error occurred during submission.");
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#06060C] text-gray-300 font-sans flex items-start justify-center py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient Neon Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#EC4899]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Main Card Container */}
        <div className="bg-gradient-to-b from-[#111122]/90 to-[#07070F]/95 backdrop-blur-xl border border-[#8B5CF6]/20 rounded-[2.5rem] p-6 md:p-10 shadow-[0_0_50px_rgba(139,92,246,0.05)] relative overflow-hidden">
          
          {/* Neon Top Accent Line */}
          <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-transparent via-[#EC4899] to-transparent"></div>

          {/* Header */}
          <div className="flex items-center justify-between mb-8 border-b border-gray-800/40 pb-5">
            <div>
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#EC4899] to-[#F43F5E] tracking-tight flex items-center gap-2">
                <FiPlusCircle className="text-[#EC4899]" /> Post A Product
              </h2>
              <p className="text-gray-400 text-xs mt-1">Publish a premium electronic device to the store catalog</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-[#16162a]/60 border border-[#8B5CF6]/15 rounded-xl px-3 py-1.5 text-xs text-[#A78BFA]">
              <FiSettings className="animate-spin text-sm" /> Admin Mode
            </div>
          </div>

          {/* Messages */}
          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-sm flex items-center gap-3">
              <FiCheckCircle size={20} className="flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-[#F43F5E]/10 border border-[#F43F5E]/20 text-[#F43F5E] text-sm flex items-center gap-3">
              <FiAlertCircle size={20} className="flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column: Common General Fields */}
              <div className="space-y-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-white border-b border-gray-800/50 pb-2">
                  <FiFileText className="text-[#8B5CF6]" />
                  <span>General Information</span>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#A78BFA] ml-1">Product Title / Name</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={commonData.title}
                    onChange={handleCommonChange}
                    placeholder="e.g. MacBook Pro M3 Max"
                    className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
                  />
                </div>

                {/* Brand & Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#A78BFA] ml-1">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      required
                      value={commonData.brand}
                      onChange={handleCommonChange}
                      placeholder="e.g. Apple / Samsung"
                      className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#A78BFA] ml-1">Category</label>
                    <select
                      name="category"
                      required
                      value={category}
                      onChange={handleCategoryChange}
                      className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
                    >
                      <option value="" disabled className="bg-[#0c0c14] text-gray-400">Select Category</option>
                      <option value="Laptop" className="bg-[#0c0c14] text-white">Laptop</option>
                      <option value="Phone" className="bg-[#0c0c14] text-white">Phone</option>
                      <option value="Smartphone" className="bg-[#0c0c14] text-white">Smartphone</option>
                      <option value="Earphone" className="bg-[#0c0c14] text-white">Earphone</option>
                      <option value="Camera" className="bg-[#0c0c14] text-white">Camera</option>
                      <option value="Monitor" className="bg-[#0c0c14] text-white">Monitor</option>
                      <option value="Tablet" className="bg-[#0c0c14] text-white">Tablet</option>
                    </select>
                  </div>
                </div>

                {/* Price & Stock Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#A78BFA] ml-1">Price ($ USD)</label>
                    <input
                      type="number"
                      name="price"
                      required
                      min="0"
                      step="any"
                      value={commonData.price}
                      onChange={handleCommonChange}
                      placeholder="e.g. 1299.99"
                      className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#A78BFA] ml-1">Stock Qty</label>
                    <input
                      type="number"
                      name="stock"
                      required
                      min="0"
                      value={commonData.stock}
                      onChange={handleCommonChange}
                      placeholder="e.g. 45"
                      className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#A78BFA] ml-1">Product Image URL</label>
                  <div className="relative">
                    <input
                      type="url"
                      name="imageUrl"
                      required
                      value={commonData.imageUrl}
                      onChange={handleCommonChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl pl-4 pr-10 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
                    />
                    <FiImage className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Category Specs & Description */}
              <div className="space-y-5">
                <div className="flex items-center justify-between text-sm font-semibold text-white border-b border-gray-800/50 pb-2">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon()}
                    <span>Dynamic Specifications ({category || 'Select Category'})</span>
                  </div>
                </div>

                {/* Render the category-specific specs inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {renderDynamicFields()}
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#A78BFA] ml-1">Detailed Description</label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={commonData.description}
                    onChange={handleCommonChange}
                    placeholder="Provide a comprehensive product description detailing core selling points..."
                    className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/20 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="pt-4 border-t border-gray-800/40 flex items-center justify-end">
              <button
                type="submit"
                disabled={loading}
                className="h-12 px-8 bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#8B5CF6] hover:brightness-110 text-white font-bold tracking-wide rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(236,72,153,0.25)] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    <span>Posting Gadget...</span>
                  </>
                ) : (
                  <>
                    <FiPlusCircle size={18} />
                    <span>Post Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}