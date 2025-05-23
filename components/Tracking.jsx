"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // ✅ Ambil URL saat ini

const Tracking = () => {
  const [userIP, setUserIP] = useState(null);
  const [location, setLocation] = useState(null);
  const pathname = usePathname(); // ✅ Ambil URL saat ini

  useEffect(() => {
    const trackVisit = async () => {
      try {
        // 🔹 Dapatkan IP pengguna
        const ipResponse = await fetch("https://api64.ipify.org?format=json");
        const ipData = await ipResponse.json();
        const ip = ipData.ip;
        setUserIP(ip);

        // 🔹 Dapatkan tanggal hari ini dalam format YYYY-MM-DD
        const today = new Date().toISOString().split("T")[0];

        // 🔹 Gunakan URL sebagai bagian dari key tracking
        const visitKey = `${ip}_${pathname}`;

        // 🔹 Cek apakah sudah ada data tracking di localStorage
        const storedData = JSON.parse(localStorage.getItem("trackingData")) || {};

        // 🔹 Jika user sudah mengunjungi halaman yang sama hari ini, skip tracking
        if (storedData[visitKey] === today) {
          console.log(`User sudah mengunjungi halaman ${pathname} hari ini, tidak dihitung lagi.`);
          return;
        }

        // 🔹 Simpan data kunjungan per halaman
        localStorage.setItem(
          "trackingData",
          JSON.stringify({ ...storedData, [visitKey]: today })
        );

        // 🔹 Ambil Geolocation dari Browser
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
              sendTrackingData(ip, pathname, today, latitude, longitude);
            },
            async (error) => {
              console.warn("Geolocation error:", error);
              // 🔹 Jika gagal, fallback ke API IP Location
              const locationResponse = await fetch(`https://ip-api.com/json/${ip}`);
              const locationData = await locationResponse.json();
              setLocation({ latitude: locationData.lat, longitude: locationData.lon });
              sendTrackingData(ip, pathname, today, locationData.lat, locationData.lon);
            }
          );
        } else {
          console.warn("Geolocation tidak didukung.");
          sendTrackingData(ip, pathname, today, null, null);
        }
      } catch (error) {
        console.error("Error dalam tracking:", error);
      }
    };

    const sendTrackingData = async (ip, url, date, latitude, longitude) => {
      // 🔹 Kirim data ke backend
      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ip: ip,
          url: window.location.href,
          referrer: document.referrer || "direct",
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          location: latitude && longitude ? { latitude, longitude } : null,
        }),
      });

      console.log(`Tracking data terkirim untuk ${url}:`, { ip, date, location: { latitude, longitude } });
    };

    trackVisit();
  }, [pathname]); // ✅ Jalankan ulang jika URL berubah (berpindah artikel)

  return null;
};

export default Tracking;
