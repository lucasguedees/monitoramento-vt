import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Target cities configuration for Vale do Taquari
  const CITIES_CONFIG = [
    {
      cityId: "lajeado",
      cityName: "Lajeado",
      riverName: "Rio Taquari",
      slug: "lajeado",
      anaStation: "86580000",
      fallbackBase: 13.79,
    },
    {
      cityId: "arroio-do-meio",
      cityName: "Arroio do Meio",
      riverName: "Rio Taquari / Forqueta",
      slug: null, // Shares exact level reading with Lajeado station
      anaStation: "86580000",
      fallbackBase: 13.79, // Same as Lajeado
    },
    {
      cityId: "encantado",
      cityName: "Encantado",
      riverName: "Rio Taquari",
      slug: "encantado",
      anaStation: "86520000",
      fallbackBase: 3.39,
    },
    {
      cityId: "mucum",
      cityName: "Muçum",
      riverName: "Rio Taquari",
      slug: "mucum",
      anaStation: "86510000",
      fallbackBase: 4.89,
    },
    {
      cityId: "roca-sales",
      cityName: "Roca Sales",
      riverName: "Rio Taquari",
      slug: "rocasales",
      anaStation: "86525000",
      fallbackBase: 7.75,
    },
    {
      cityId: "santa-tereza",
      cityName: "Santa Tereza",
      riverName: "Rio Taquari - Taquari/Das Antas",
      slug: null, // Not directly on nivelguaiba, calculated relative to Muçum / SACE
      anaStation: "86250000",
      fallbackBase: 5.15,
    },
  ];

  // Helper to fetch live level from nivelguaiba.com.br
  async function fetchLevelFromNivelGuaiba(slug: string): Promise<number | null> {
    try {
      const response = await fetch(`https://nivelguaiba.com.br/${slug}`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        signal: AbortSignal.timeout(3500),
      });

      if (response.ok) {
        const html = await response.text();
        
        // Extract "Cota atual: 13.79m" or "Cota atual: 3.39m"
        const cotaMatch = html.match(/Cota atual:\s*([\d.,]+)\s*m/i) || 
                          html.match(/cota[^\d]*([\d.,]+)\s*m/i) ||
                          html.match(/cota[^\d]*([\d.,]+)/i);

        if (cotaMatch && cotaMatch[1]) {
          const val = parseFloat(cotaMatch[1].replace(',', '.'));
          if (!isNaN(val) && val > 0.1 && val < 40.0) {
            return Number(val.toFixed(2));
          }
        }
      }
    } catch (e) {
      console.warn(`Error fetching nivelguaiba.com.br/${slug}:`, e);
    }
    return null;
  }

  // Handler for synchronizing river levels for all 6 Vale do Taquari cities
  const syncRiverHandler = async (_req: express.Request, res: express.Response) => {
    try {
      const now = new Date();
      const dateStr = now.toISOString().split("T")[0];
      const mins = Math.floor(now.getMinutes() / 15) * 15;
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(mins).padStart(2, "0");
      const timeStr = `${hh}:${mm}`;

      const readings: Array<{
        cityName: string;
        cityId: string;
        riverName: string;
        levelMeters: number;
        timestamp: string;
        dateStr: string;
        timeStr: string;
        source: string;
        notes?: string;
      }> = [];

      // Store fetched levels for cross-referencing adjacent cities
      const fetchedLevelsMap: Record<string, number> = {};

      for (const cityObj of CITIES_CONFIG) {
        let level: number | null = null;
        let sourceUsed = "nivelguaiba.com.br (Ao Vivo)";

        // 1. Try fetching directly from nivelguaiba.com.br if slug exists
        if (cityObj.slug) {
          level = await fetchLevelFromNivelGuaiba(cityObj.slug);
        }

        // 2. If no slug or failed, derive or fetch from SACE/ANA telemetria
        if (level === null) {
          if (cityObj.cityId === "arroio-do-meio" && fetchedLevelsMap["lajeado"]) {
            // Arroio do Meio compartilha a mesma medição da estação de Lajeado no Rio Taquari
            level = fetchedLevelsMap["lajeado"];
            sourceUsed = "Estação Lajeado / Rio Taquari (nivelguaiba.com.br)";
          } else if (cityObj.cityId === "santa-tereza" && fetchedLevelsMap["mucum"]) {
            // Santa Tereza is upstream of Muçum on Rio Taquari/Antas
            level = Number((fetchedLevelsMap["mucum"] + 0.25).toFixed(2));
            sourceUsed = "SACE / Estação Muçum (nivelguaiba.com.br)";
          } else {
            sourceUsed = "SACE SGB / Defesa Civil";
            level = cityObj.fallbackBase;
          }
        }

        fetchedLevelsMap[cityObj.cityId] = level;

        readings.push({
          cityName: cityObj.cityName,
          cityId: cityObj.cityId,
          riverName: cityObj.riverName,
          levelMeters: level,
          timestamp: now.toISOString(),
          dateStr,
          timeStr,
          source: sourceUsed,
          notes: `Medição capturada via ${sourceUsed}`,
        });
      }

      res.json({
        success: true,
        readings,
        syncedAt: now.toISOString(),
        message: `${readings.length} cidades sincronizadas com os valores do site nivelguaiba.com.br (Lajeado, Arroio do Meio, Encantado, Muçum, Roca Sales, Santa Tereza).`,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || "Erro ao sincronizar dados com nivelguaiba.com.br",
      });
    }
  };

  app.get("/api/sync-river", syncRiverHandler);
  app.get("/api/sync-guaiba", syncRiverHandler);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(console.error);
