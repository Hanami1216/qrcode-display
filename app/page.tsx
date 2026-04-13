"use client";

import { useState, useEffect, useCallback } from "react";

interface QRCodeData {
  code: string;
  barcode: string;
  qrcode: string;
}

interface ApiResponse {
  data: {
    code: number;
    data: QRCodeData;
  };
}

// Base64 占位符 - 1x1 透明像素
const PLACEHOLDER_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

export default function Home() {
  const [qrData, setQrData] = useState<QRCodeData>({
    code: "加载中...",
    barcode: PLACEHOLDER_IMAGE,
    qrcode: PLACEHOLDER_IMAGE,
  });
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState(30);

  const fetchQRCode = useCallback(async () => {
    setLoading(true);
    try {
      // 模拟 API 请求 - 实际使用时替换为真实 API 地址
      // const response = await fetch("/api/qrcode");
      // const result: ApiResponse = await response.json();
      
      // 模拟数据 - 实际使用时从 API 获取
      const mockData: QRCodeData = {
        code: "REDIS_SCANNER_IMN6IM093JO",
        barcode: PLACEHOLDER_IMAGE,
        qrcode: PLACEHOLDER_IMAGE,
      };
      
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setQrData(mockData);
      setLastUpdate(new Date());
      setCountdown(30);
    } catch (error) {
      console.error("获取二维码失败:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 初始加载
  useEffect(() => {
    fetchQRCode();
  }, [fetchQRCode]);

  // 自动刷新定时器
  useEffect(() => {
    const interval = setInterval(() => {
      fetchQRCode();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchQRCode]);

  // 倒计时定时器
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const formatTime = (date: Date | null) => {
    if (!date) return "--";
    return date.toLocaleTimeString("zh-CN");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">二维码展示</h1>
          <p className="text-gray-500">扫码获取设备信息</p>
        </div>

        {/* Code 信息 */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
          <span className="text-gray-500 text-sm">设备编号</span>
          <p className="text-xl font-mono font-semibold text-gray-800 mt-1">
            {qrData.code}
          </p>
        </div>

        {/* 图片展示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* 条形码 */}
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-sm mb-3">条形码</span>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <img
                src={qrData.barcode}
                alt="条形码"
                className="w-full h-auto max-w-[200px]"
              />
            </div>
          </div>

          {/* 二维码 */}
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-sm mb-3">二维码</span>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <img
                src={qrData.qrcode}
                alt="二维码"
                className="w-full h-auto max-w-[200px]"
              />
            </div>
          </div>
        </div>

        {/* 状态栏 */}
        <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
          <div className="flex items-center gap-2">
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>更新中...</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>上次更新: {formatTime(lastUpdate)}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span>下次刷新: {countdown}秒</span>
            <button
              onClick={fetchQRCode}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <svg
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              刷新
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
