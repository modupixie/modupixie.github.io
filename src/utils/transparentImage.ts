import { useState, useEffect } from 'react';

export function useTransparentImage(imgSrc: string, targetColor: 'white' | 'black' = 'white') {
  const [transparentSrc, setTransparentSrc] = useState<string>('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (!imgSrc) {
      setIsReady(true);
      return;
    }

    let active = true;
    setIsReady(false);

    const processImage = (useCrossOrigin = true) => {
      const img = new Image();
      if (useCrossOrigin) {
        img.crossOrigin = "anonymous";
      }
      img.src = imgSrc;
      
      img.onload = () => {
        if (!active) return;
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            setTransparentSrc(imgSrc);
            setIsReady(true);
            return;
          }

          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;
          const w = canvas.width;
          const h = canvas.height;

          const visited = new Uint8Array(w * h);
          const queue: number[] = [];

          // Read color at top-left corner (0,0) to get seed background color
          const baseR = data[0];
          const baseG = data[1];
          const baseB = data[2];

          const isBackground = (idx: number) => {
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            
            if (targetColor === 'white') {
              // Standard near-white check for the white guitar
              if (r > 185 && g > 185 && b > 185) return true;
            } else {
              // Standard near-black check for the jigsaw guitar background
              if (r < 50 && g < 50 && b < 50) return true;
            }

            // Check if near top-left seed color (very reliable for solid studio backgrounds)
            const diffR = Math.abs(r - baseR);
            const diffG = Math.abs(g - baseG);
            const diffB = Math.abs(b - baseB);
            if (diffR < 35 && diffG < 35 && diffB < 35) return true;

            return false;
          };

          const pushPixel = (x: number, y: number) => {
            if (x < 0 || x >= w || y < 0 || y >= h) return;
            const idx = y * w + x;
            if (visited[idx]) return;
            visited[idx] = 1;

            if (isBackground(idx * 4)) {
              queue.push(idx);
            }
          };

          // Push all outer border pixels as starting seeds for the flood fill
          for (let x = 0; x < w; x++) {
            pushPixel(x, 0);
            pushPixel(x, h - 1);
          }
          for (let y = 0; y < h; y++) {
            pushPixel(0, y);
            pushPixel(w - 1, y);
          }

          let qHead = 0;
          while (qHead < queue.length) {
            const curr = queue[qHead++];
            const cx = curr % w;
            const cy = Math.floor(curr / w);

            // Make the connected background pixel 100% transparent
            const dataIdx = curr * 4;
            data[dataIdx + 3] = 0; // Alpha = 0

            // Check neighbor pixels and soften transition edges
            const checkAndEdgeSoften = (nx: number, ny: number) => {
              if (nx < 0 || nx >= w || ny < 0 || ny >= h) return;
              const nIdx = ny * w + nx;
              if (!visited[nIdx]) {
                if (isBackground(nIdx * 4)) {
                  pushPixel(nx, ny);
                } else {
                  // Border transition pixel decoration
                  const nDataIdx = nIdx * 4;
                  data[nDataIdx + 3] = Math.min(data[nDataIdx + 3], 120);
                }
              }
            };

            checkAndEdgeSoften(cx - 1, cy);
            checkAndEdgeSoften(cx + 1, cy);
            checkAndEdgeSoften(cx, cy - 1);
            checkAndEdgeSoften(cx, cy + 1);
          }

          ctx.putImageData(imgData, 0, 0);
          setTransparentSrc(canvas.toDataURL('image/png'));
          setIsReady(true);
        } catch (err) {
          console.error("Transparent canvas rendering error, retrying without anonymous CORS:", err);
          if (useCrossOrigin) {
            processImage(false);
          } else {
            setTransparentSrc(imgSrc);
            setIsReady(true);
          }
        }
      };

      img.onerror = () => {
        if (!active) return;
        if (useCrossOrigin) {
          processImage(false);
        } else {
          setTransparentSrc(imgSrc);
          setIsReady(true);
        }
      };
    };

    processImage(true);

    return () => {
      active = false;
    };
  }, [imgSrc, targetColor]);

  return { src: transparentSrc, isReady };
}
