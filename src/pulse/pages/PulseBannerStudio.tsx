import React, { useRef, useState, useEffect } from 'react';
import {
  Download,
  Copy,
  Check,
  Moon,
  Sun,
  Monitor,
  ArrowRight,
  Shield,
  Sparkles,
} from 'lucide-react';

type BannerFormat = 'linkedin-cover' | 'twitter-header' | 'social-post' | 'instagram-square';
type BannerConcept = 'horizon-dark' | 'swiss-light' | 'hardware-studio';

interface FormatConfig {
  id: BannerFormat;
  label: string;
  platform: string;
  width: number;
  height: number;
  aspect: string;
  note: string;
}

const FORMATS: FormatConfig[] = [
  {
    id: 'linkedin-cover',
    label: 'LinkedIn Cover Banner',
    platform: 'LinkedIn Company / Personal',
    width: 1584,
    height: 396,
    aspect: '4:1',
    note: 'Safe zone: avatar sits on bottom-left on desktop and center on mobile.',
  },
  {
    id: 'twitter-header',
    label: 'Twitter / X Header',
    platform: 'X / Twitter Profile',
    width: 1500,
    height: 500,
    aspect: '3:1',
    note: 'Safe zone: profile photo sits at bottom-left corner.',
  },
  {
    id: 'social-post',
    label: 'Landscape Feed Post / Ad',
    platform: 'LinkedIn & Facebook Feed',
    width: 1200,
    height: 628,
    aspect: '1.91:1',
    note: 'Optimal for corporate link previews and feed announcements.',
  },
  {
    id: 'instagram-square',
    label: 'Square Post / Carousel Cover',
    platform: 'Instagram & LinkedIn Square',
    width: 1080,
    height: 1080,
    aspect: '1:1',
    note: 'High-impact 1:1 format for social carousels and feed covers.',
  },
];

interface BannerStudioProps {
  isPublic?: boolean;
}

export const PulseBannerStudio: React.FC<BannerStudioProps> = ({ isPublic = false }) => {
  const [format, setFormat] = useState<BannerFormat>('linkedin-cover');
  const [concept, setConcept] = useState<BannerConcept>('horizon-dark');
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCache = useRef<{
    icon?: HTMLImageElement;
    hero?: HTMLImageElement;
    ess?: HTMLImageElement;
  }>({});

  const currentFormat = FORMATS.find((f) => f.id === format) || FORMATS[0];

  // Preload all assets once on mount
  useEffect(() => {
    let isMounted = true;

    const loadSingle = (src: string): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
      });
    };

    const preload = async () => {
      const [icon, hero, ess] = await Promise.all([
        loadSingle('/solikos-icon.png'),
        loadSingle('/assets/hero.jpg'),
        loadSingle('/products/all-in-one-12kw-30kwh-ess.png'),
      ]);

      if (isMounted) {
        imageCache.current = {
          icon: icon || undefined,
          hero: hero || undefined,
          ess: ess || undefined,
        };
        setImagesLoaded(true);
      }
    };

    preload();
    return () => {
      isMounted = false;
    };
  }, []);

  // Synchronous, rock-solid render function
  const renderBanner = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const targetW = currentFormat.width;
    const targetH = currentFormat.height;

    // Retina 2x scale
    const scale = 2;
    canvas.width = targetW * scale;
    canvas.height = targetH * scale;

    ctx.save();
    ctx.scale(scale, scale);

    const iconImg = imageCache.current.icon;
    const heroImg = imageCache.current.hero;
    const essImg = imageCache.current.ess;

    // ========================================================
    // CONCEPT 1: THE SOLAR HORIZON (EXECUTIVE DARK OBSIDIAN)
    // ========================================================
    if (concept === 'horizon-dark') {
      // 1. Solid deep space black
      ctx.fillStyle = '#070A11';
      ctx.fillRect(0, 0, targetW, targetH);

      // 2. Solar array background photo
      if (heroImg) {
        ctx.save();
        ctx.globalAlpha = 0.38;

        const imgAspect = heroImg.width / heroImg.height;
        const minW = targetW * 0.65;
        const minH = targetH;
        let drawW = minW;
        let drawH = drawW / imgAspect;
        if (drawH < minH) {
          drawH = minH;
          drawW = drawH * imgAspect;
        }

        const drawX = targetW - drawW;
        const drawY = (targetH - drawH) / 2;
        ctx.drawImage(heroImg, drawX, drawY, drawW, drawH);
        ctx.restore();

        // Smooth dark blend mask from solid black on left to subtle photo on right
        const blendGrad = ctx.createLinearGradient(targetW * 0.2, 0, targetW * 0.8, 0);
        blendGrad.addColorStop(0, '#070A11');
        blendGrad.addColorStop(0.3, 'rgba(7, 10, 17, 0.98)');
        blendGrad.addColorStop(0.65, 'rgba(7, 10, 17, 0.4)');
        blendGrad.addColorStop(1, 'rgba(7, 10, 17, 0.12)');
        ctx.fillStyle = blendGrad;
        ctx.fillRect(0, 0, targetW, targetH);
      }

      // 3. Golden sunrise horizon flare
      const glowGrad = ctx.createRadialGradient(
        targetW * 0.75,
        targetH * 0.85,
        10,
        targetW * 0.75,
        targetH * 0.85,
        targetW * 0.6
      );
      glowGrad.addColorStop(0, 'rgba(245, 158, 11, 0.22)');
      glowGrad.addColorStop(0.35, 'rgba(217, 119, 6, 0.1)');
      glowGrad.addColorStop(1, 'rgba(7, 10, 17, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, targetW, targetH);

      // Top edge dark vignette
      const topGrad = ctx.createLinearGradient(0, 0, 0, targetH * 0.4);
      topGrad.addColorStop(0, 'rgba(7, 10, 17, 0.7)');
      topGrad.addColorStop(1, 'rgba(7, 10, 17, 0)');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, targetW, targetH);

      // 4. Hairline architectural grid & corner crosshairs
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 1;

      const padX = targetW > 1400 ? 90 : targetW > 1100 ? 70 : 54;
      const padY = targetH > 800 ? 70 : targetH > 450 ? 50 : 36;
      ctx.strokeRect(padX, padY, targetW - padX * 2, targetH - padY * 2);

      const crossSize = 6;
      const drawCross = (cx: number, cy: number) => {
        ctx.beginPath();
        ctx.moveTo(cx - crossSize, cy);
        ctx.lineTo(cx + crossSize, cy);
        ctx.moveTo(cx, cy - crossSize);
        ctx.lineTo(cx, cy + crossSize);
        ctx.stroke();
      };
      drawCross(padX, padY);
      drawCross(targetW - padX, padY);
      drawCross(padX, targetH - padY);
      drawCross(targetW - padX, targetH - padY);

      // 5. Brand Header
      let brandY = padY + (targetH > 500 ? 50 : 38);
      const brandX = padX + (targetW === 1584 ? 40 : 32);

      if (iconImg) {
        const iconSize = targetH > 800 ? 54 : targetH > 450 ? 46 : 38;
        ctx.drawImage(iconImg, brandX, brandY - iconSize * 0.72, iconSize, iconSize);

        ctx.font = `700 ${targetH > 800 ? 22 : 18}px 'Outfit', 'Inter', sans-serif`;
        ctx.fillStyle = '#FFFFFF';
        ctx.letterSpacing = '-0.02em';
        ctx.fillText('SOLIKOS', brandX + iconSize + 14, brandY - 4);

        ctx.font = `600 ${targetH > 800 ? 10 : 9}px 'Outfit', 'Inter', sans-serif`;
        ctx.fillStyle = '#F59E0B';
        ctx.letterSpacing = '0.3em';
        ctx.fillText('ENERGY', brandX + iconSize + 15, brandY + 11);
      }

      // 6. Main Headline
      let titleY = brandY + (targetH > 800 ? 140 : targetH > 500 ? 100 : targetH > 350 ? 80 : 70);
      const titleX = brandX;

      ctx.font = `500 ${targetH > 800 ? 12 : 10.5}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = '#D97706';
      ctx.letterSpacing = '0.18em';
      ctx.fillText('[ 01 // COMMERCIAL & INDUSTRIAL SOLAR ]', titleX, titleY - (targetH > 800 ? 24 : 18));

      ctx.fillStyle = '#FFFFFF';
      ctx.letterSpacing = '-0.03em';

      if (format === 'linkedin-cover' || format === 'twitter-header') {
        ctx.font = `700 ${targetH > 450 ? 44 : 36}px 'Outfit', 'Inter', sans-serif`;
        ctx.fillText('Renewable Energy for Enterprise.', titleX, titleY + 16);

        ctx.font = `400 ${targetH > 450 ? 16 : 14}px 'Inter', sans-serif`;
        ctx.fillStyle = '#94A3B8';
        ctx.letterSpacing = '-0.01em';
        ctx.fillText('Your Power, Our Priority · Bankable solar hybrid infrastructure across Nigeria.', titleX, titleY + (targetH > 450 ? 52 : 44));
      } else if (format === 'social-post') {
        ctx.font = "700 48px 'Outfit', 'Inter', sans-serif";
        ctx.fillText('Renewable Energy for the', titleX, titleY + 10);
        ctx.fillText('Clean Energy Revolution.', titleX, titleY + 62);

        ctx.font = "400 16px 'Inter', sans-serif";
        ctx.fillStyle = '#94A3B8';
        ctx.letterSpacing = '-0.01em';
        ctx.fillText('Transition from grid volatility to predictable, bankable clean power.', titleX, titleY + 114);
      } else {
        // Square 1080x1080
        ctx.font = "700 58px 'Outfit', 'Inter', sans-serif";
        ctx.fillText('Renewable Energy', titleX, titleY + 10);
        ctx.fillText('for the Clean Energy', titleX, titleY + 74);
        ctx.fillText('Revolution.', titleX, titleY + 138);

        ctx.font = "400 18px 'Inter', sans-serif";
        ctx.fillStyle = '#94A3B8';
        ctx.fillText('Transitioning commercial enterprise from grid instability', titleX, titleY + 200);
        ctx.fillText('to 24/7 predictable, bankable solar power.', titleX, titleY + 228);
      }

      // 7. Bottom Specs
      const bottomY = targetH - padY - (targetH > 800 ? 30 : 20);

      ctx.font = `500 ${targetH > 800 ? 11 : 9.5}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = '#64748B';
      ctx.letterSpacing = '0.08em';

      if (format === 'linkedin-cover' || format === 'twitter-header') {
        ctx.fillText('HYBRID INVERTERS  ·  LIFEPO4 STORAGE  ·  TIER-1 BIFACIAL ARRAYS', brandX, bottomY);

        ctx.fillStyle = '#F59E0B';
        ctx.textAlign = 'right';
        ctx.fillText('SOLIKOSENERGYLTD.COM', targetW - padX - 32, bottomY);
        ctx.textAlign = 'left';
      } else if (format === 'social-post') {
        ctx.fillText('10-YEAR WARRANTY  ·  TIER-1 CELLS  ·  ZERO DOWNTIME', brandX, bottomY);

        ctx.fillStyle = '#F59E0B';
        ctx.textAlign = 'right';
        ctx.fillText('SOLIKOSENERGYLTD.COM  ·  LAGOS, NIGERIA', targetW - padX - 32, bottomY);
        ctx.textAlign = 'left';
      } else {
        ctx.fillText('10-YR LIFEPO4 WARRANTY  ·  TIER-1 HARDWARE  ·  C&I SOLAR', brandX, bottomY - 30);
        ctx.fillStyle = '#F59E0B';
        ctx.font = "600 13px 'JetBrains Mono', monospace";
        ctx.fillText('SOLIKOSENERGYLTD.COM  ·  YOUR POWER, OUR PRIORITY', brandX, bottomY);
      }
    }

    // ========================================================
    // CONCEPT 2: SWISS MODERNIST (ARCHITECTURAL CREAM LIGHT)
    // ========================================================
    else if (concept === 'swiss-light') {
      ctx.fillStyle = '#F8F7F4';
      ctx.fillRect(0, 0, targetW, targetH);

      const padX = targetW > 1400 ? 90 : targetW > 1100 ? 70 : 54;
      const padY = targetH > 800 ? 70 : targetH > 450 ? 50 : 36;

      ctx.strokeStyle = '#E5E4E0';
      ctx.lineWidth = 1;
      ctx.strokeRect(padX, padY, targetW - padX * 2, targetH - padY * 2);

      const crossSize = 6;
      const drawCross = (cx: number, cy: number) => {
        ctx.beginPath();
        ctx.moveTo(cx - crossSize, cy);
        ctx.lineTo(cx + crossSize, cy);
        ctx.moveTo(cx, cy - crossSize);
        ctx.lineTo(cx, cy + crossSize);
        ctx.stroke();
      };
      drawCross(padX, padY);
      drawCross(targetW - padX, padY);
      drawCross(padX, targetH - padY);
      drawCross(targetW - padX, targetH - padY);

      let brandY = padY + (targetH > 500 ? 50 : 38);
      const brandX = padX + (targetW === 1584 ? 40 : 32);

      if (iconImg) {
        const iconSize = targetH > 800 ? 54 : targetH > 450 ? 46 : 38;
        ctx.drawImage(iconImg, brandX, brandY - iconSize * 0.72, iconSize, iconSize);

        ctx.font = `700 ${targetH > 800 ? 22 : 18}px 'Outfit', 'Inter', sans-serif`;
        ctx.fillStyle = '#0A0E17';
        ctx.letterSpacing = '-0.02em';
        ctx.fillText('SOLIKOS', brandX + iconSize + 14, brandY - 4);

        ctx.font = `600 ${targetH > 800 ? 10 : 9}px 'Outfit', 'Inter', sans-serif`;
        ctx.fillStyle = '#B45309';
        ctx.letterSpacing = '0.3em';
        ctx.fillText('ENERGY', brandX + iconSize + 15, brandY + 11);
      }

      ctx.textAlign = 'right';
      ctx.font = `500 ${targetH > 800 ? 11 : 9.5}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = '#8E8D88';
      ctx.letterSpacing = '0.08em';
      ctx.fillText('VICTORIA ISLAND, LAGOS · 6.4281° N, 3.4219° E', targetW - padX - 32, brandY);
      ctx.textAlign = 'left';

      const ruleY = brandY + 28;
      ctx.strokeStyle = '#EBEAE5';
      ctx.beginPath();
      ctx.moveTo(brandX, ruleY);
      ctx.lineTo(targetW - padX - 32, ruleY);
      ctx.stroke();

      let titleY = ruleY + (targetH > 800 ? 100 : targetH > 500 ? 70 : targetH > 350 ? 55 : 48);

      ctx.fillStyle = '#0A0E17';
      ctx.letterSpacing = '-0.03em';

      if (format === 'linkedin-cover' || format === 'twitter-header') {
        ctx.font = `700 ${targetH > 450 ? 42 : 34}px 'Outfit', 'Inter', sans-serif`;
        ctx.fillText('Predictable power for enterprise.', brandX, titleY + 10);

        ctx.font = `400 ${targetH > 450 ? 15 : 13.5}px 'Inter', sans-serif`;
        ctx.fillStyle = '#5A5852';
        ctx.letterSpacing = '-0.01em';
        ctx.fillText('Your Power, Our Priority · Bankable C&I solar hybrid infrastructure & energy storage.', brandX, titleY + (targetH > 450 ? 48 : 40));
      } else if (format === 'social-post') {
        ctx.font = "700 48px 'Outfit', 'Inter', sans-serif";
        ctx.fillText('Predictable Power for', brandX, titleY + 10);
        ctx.fillText("Nigeria's Leading Industries.", brandX, titleY + 62);

        ctx.font = "400 16px 'Inter', sans-serif";
        ctx.fillStyle = '#5A5852';
        ctx.fillText('High-efficiency hybrid inverters, Tier-1 solar arrays, and 10-year warranty storage.', brandX, titleY + 114);
      } else {
        ctx.font = "700 56px 'Outfit', 'Inter', sans-serif";
        ctx.fillText('Predictable', brandX, titleY + 10);
        ctx.fillText('Power for', brandX, titleY + 70);
        ctx.fillText('Enterprise.', brandX, titleY + 130);

        ctx.font = "400 18px 'Inter', sans-serif";
        ctx.fillStyle = '#5A5852';
        ctx.fillText('Transition from diesel volatility to high-performance', brandX, titleY + 190);
        ctx.fillText('commercial solar and smart energy storage.', brandX, titleY + 218);
      }

      const bottomY = targetH - padY - (targetH > 800 ? 30 : 20);

      ctx.font = `500 ${targetH > 800 ? 11 : 9.5}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = '#787670';
      ctx.fillText('10-YEAR WARRANTY · TIER-1 ARRAYS · 24/7 MONITORING', brandX, bottomY);

      ctx.fillStyle = '#0A0E17';
      ctx.textAlign = 'right';
      ctx.font = `600 ${targetH > 800 ? 12 : 10.5}px 'JetBrains Mono', monospace`;
      ctx.fillText('SOLIKOSENERGYLTD.COM', targetW - padX - 32, bottomY);
      ctx.textAlign = 'left';
    }

    // ========================================================
    // CONCEPT 3: INDUSTRIAL HARDWARE & ESS (STUDIO PRODUCT SHOWCASE)
    // ========================================================
    else if (concept === 'hardware-studio') {
      ctx.fillStyle = '#0B0F19';
      ctx.fillRect(0, 0, targetW, targetH);

      const padX = targetW > 1400 ? 90 : targetW > 1100 ? 70 : 54;
      const padY = targetH > 800 ? 70 : targetH > 450 ? 50 : 36;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(padX, padY, targetW - padX * 2, targetH - padY * 2);

      // Hardware showcase inside an elegant architectural white pedestal frame
      if (essImg) {
        ctx.save();
        const frameW = targetW > 1400 ? 360 : targetW > 1100 ? 300 : targetW > 800 ? 260 : 220;
        const frameH = targetH - padY * 2 - 40;
        const frameX = targetW - padX - frameW - 20;
        const frameY = padY + 20;

        // White studio pedestal box
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.roundRect(frameX, frameY, frameW, frameH, 12);
        ctx.fill();

        // Hardware image inside pedestal
        const imgAspect = essImg.width / essImg.height;
        const imgH = frameH * 0.76;
        const imgW = imgH * imgAspect;
        const imgX = frameX + (frameW - imgW) / 2;
        const imgY = frameY + (frameH - imgH) / 2 - 10;
        ctx.drawImage(essImg, imgX, imgY, imgW, imgH);

        // Hardware label under photo inside pedestal
        ctx.textAlign = 'center';
        ctx.font = "700 11px 'Outfit', sans-serif";
        ctx.fillStyle = '#0A0E17';
        ctx.fillText('All-in-One 12KW / 30KWh ESS', frameX + frameW / 2, frameY + frameH - 24);

        ctx.font = "500 9px 'JetBrains Mono', monospace";
        ctx.fillStyle = '#D97706';
        ctx.fillText('10-YEAR LIFEPO4 WARRANTY', frameX + frameW / 2, frameY + frameH - 10);
        ctx.textAlign = 'left';

        ctx.restore();
      }

      // Brand Lockup
      let brandY = padY + (targetH > 500 ? 50 : 38);
      const brandX = padX + 36;

      if (iconImg) {
        const iconSize = targetH > 800 ? 54 : targetH > 450 ? 46 : 38;
        ctx.drawImage(iconImg, brandX, brandY - iconSize * 0.72, iconSize, iconSize);

        ctx.font = `700 ${targetH > 800 ? 22 : 18}px 'Outfit', sans-serif`;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('SOLIKOS', brandX + iconSize + 14, brandY - 4);

        ctx.font = `600 ${targetH > 800 ? 10 : 9}px 'Outfit', sans-serif`;
        ctx.fillStyle = '#F59E0B';
        ctx.letterSpacing = '0.3em';
        ctx.fillText('ENERGY', brandX + iconSize + 15, brandY + 11);
      }

      // Title & Specifications
      let titleY = brandY + (targetH > 800 ? 120 : targetH > 500 ? 90 : 70);

      ctx.font = `500 ${targetH > 800 ? 12 : 10.5}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = '#D97706';
      ctx.letterSpacing = '0.18em';
      ctx.fillText('[ SMART ENERGY STORAGE SYSTEM ]', brandX, titleY - 18);

      ctx.fillStyle = '#FFFFFF';
      ctx.letterSpacing = '-0.03em';

      if (format === 'linkedin-cover' || format === 'twitter-header') {
        ctx.font = `700 ${targetH > 450 ? 44 : 34}px 'Outfit', sans-serif`;
        ctx.fillText('Energy Independence, Engineered.', brandX, titleY + 14);

        ctx.font = `400 ${targetH > 450 ? 15 : 13.5}px 'Inter', sans-serif`;
        ctx.fillStyle = '#94A3B8';
        ctx.fillText('All-in-One Solar ESS · 10-Year LiFePO4 Warranty · Auto-Adaptive Frequency', brandX, titleY + 48);
      } else if (format === 'social-post') {
        ctx.font = "700 48px 'Outfit', sans-serif";
        ctx.fillText('Energy Independence,', brandX, titleY + 10);
        ctx.fillText('Engineered.', brandX, titleY + 62);

        ctx.font = "400 16px 'Inter', sans-serif";
        ctx.fillStyle = '#94A3B8';
        ctx.fillText('Industrial hybrid inverters & high-density lithium storage for zero downtime.', brandX, titleY + 114);
      } else {
        ctx.font = "700 56px 'Outfit', sans-serif";
        ctx.fillText('Clean Power.', brandX, titleY + 10);
        ctx.fillText('Industrial', brandX, titleY + 70);
        ctx.fillText('Reliability.', brandX, titleY + 130);

        ctx.font = "400 18px 'Inter', sans-serif";
        ctx.fillStyle = '#94A3B8';
        ctx.fillText('12kW Inverter · 30.72kWh Battery · 10-Yr Warranty', brandX, titleY + 190);
      }

      // Bottom
      const bottomY = targetH - padY - (targetH > 800 ? 30 : 20);
      ctx.font = `500 ${targetH > 800 ? 11 : 9.5}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = '#64748B';
      ctx.fillText('PARALLEL UP TO 9 UNITS · 6000W MPPT CHARGING', brandX, bottomY);

      ctx.fillStyle = '#F59E0B';
      ctx.textAlign = 'right';
      ctx.fillText('SOLIKOSENERGYLTD.COM', targetW - padX - 32, bottomY);
      ctx.textAlign = 'left';
    }

    ctx.restore();
  };

  useEffect(() => {
    if (imagesLoaded) {
      renderBanner();
    }
  }, [format, concept, imagesLoaded]);

  // Download high-res PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setExporting(true);
    canvas.toBlob((blob) => {
      if (!blob) {
        setExporting(false);
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `solikos-${concept}-${format}-${currentFormat.width}x${currentFormat.height}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExporting(false);
    }, 'image/png');
  };

  // Copy PNG image to clipboard
  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob,
          }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }, 'image/png');
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      handleDownload();
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECECEB]">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#111111]">
            Social Media Banner Studio
          </h1>
          <p className="text-xs text-[#737373] mt-1">
            Agency-grade banners for LinkedIn, Twitter / X, and Instagram. Export at 2× Retina resolution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyImage}
            className="px-3.5 py-2 rounded-lg border border-[#ECECEB] bg-white hover:bg-[#F4F4F3] text-xs font-medium text-[#111111] transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy image'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={exporting}
            className="px-4 py-2 rounded-lg bg-[#111111] hover:bg-[#222222] text-white text-xs font-medium transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Download size={14} />
            <span>{exporting ? 'Rendering...' : 'Download High-Res PNG (2×)'}</span>
          </button>
        </div>
      </div>

      {/* Format Selector Pills */}
      <div className="space-y-2">
        <label className="text-[11px] font-medium uppercase tracking-wider text-[#737373] block">
          Platform format
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {FORMATS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFormat(f.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                format === f.id
                  ? 'border-[#111111] bg-white shadow-xs'
                  : 'border-[#ECECEB] bg-[#FAFAFA] hover:bg-white text-[#737373]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-semibold ${format === f.id ? 'text-[#111111]' : 'text-[#555555]'}`}>
                  {f.label}
                </span>
                <span className="text-[10px] font-mono text-[#A3A3A3]">{f.aspect}</span>
              </div>
              <p className="text-[11px] font-mono text-[#888888]">
                {f.width} × {f.height} px
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Concept Selector Tabs */}
      <div className="space-y-2">
        <label className="text-[11px] font-medium uppercase tracking-wider text-[#737373] block">
          Design Concept
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setConcept('horizon-dark')}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
              concept === 'horizon-dark'
                ? 'border-[#111111] bg-white shadow-xs'
                : 'border-[#ECECEB] bg-[#FAFAFA] hover:bg-white text-[#737373]'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#070A11] border border-white/20 flex items-center justify-center text-amber-500 shrink-0">
              <Moon size={15} />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#111111]">The Solar Horizon</div>
              <p className="text-[11px] text-[#737373] mt-0.5">
                Executive Obsidian dark with warm dusk solar arrays and golden sunrise glow.
              </p>
            </div>
          </button>

          <button
            onClick={() => setConcept('swiss-light')}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
              concept === 'swiss-light'
                ? 'border-[#111111] bg-white shadow-xs'
                : 'border-[#ECECEB] bg-[#FAFAFA] hover:bg-white text-[#737373]'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#F8F7F4] border border-[#E5E4E0] flex items-center justify-center text-[#B45309] shrink-0">
              <Sun size={15} />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#111111]">Swiss Modernist</div>
              <p className="text-[11px] text-[#737373] mt-0.5">
                Architectural cream and deep obsidian typography with refined grid lines.
              </p>
            </div>
          </button>

          <button
            onClick={() => setConcept('hardware-studio')}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
              concept === 'hardware-studio'
                ? 'border-[#111111] bg-white shadow-xs'
                : 'border-[#ECECEB] bg-[#FAFAFA] hover:bg-white text-[#737373]'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#0B0F19] border border-white/20 flex items-center justify-center text-amber-400 shrink-0">
              <Monitor size={15} />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#111111]">Engineered ESS</div>
              <p className="text-[11px] text-[#737373] mt-0.5">
                Studio product showcase of the 12KW All-in-One ESS and LiFePO4 battery.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Main Canvas Preview Container */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-[#ECECEB] space-y-3">
        <div className="flex items-center justify-between text-xs text-[#737373]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#111111]">{currentFormat.label}</span>
            <span className="text-[#CCCCCC]">·</span>
            <span className="font-mono">{currentFormat.width} × {currentFormat.height} px</span>
          </div>
          <span className="text-[11px] text-[#888888] hidden sm:inline">
            {currentFormat.note}
          </span>
        </div>

        {/* Live Canvas Viewport */}
        <div className="w-full bg-[#14171F] rounded-lg p-2 sm:p-4 flex items-center justify-center overflow-hidden border border-[#ECECEB]/60 shadow-inner">
          <canvas
            ref={canvasRef}
            className="max-w-full h-auto rounded shadow-lg object-contain transition-all"
            style={{
              aspectRatio: `${currentFormat.width} / ${currentFormat.height}`,
            }}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#737373] pt-2 gap-2">
          <span>Renders at 2× Retina resolution ({currentFormat.width * 2} × {currentFormat.height * 2} px) for razor-sharp social media display.</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="font-medium text-[#111111] hover:underline inline-flex items-center gap-1"
            >
              <span>Download PNG</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulseBannerStudio;
