"use client";

import { useEffect, useState } from "react";

const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <>
      {!isInstalled && deferredPrompt && (
        <button
          onClick={handleInstall}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition"
        >
          Install Aplikasi
        </button>
      )}
    </>
  );
};

export default InstallPWAButton;
