export type WorkCategory = "character" | "scene" | "series" | "objects";

export type PortfolioWork = {
  id: string;
  title: string;
  category: WorkCategory;
  year: string;
  client: string;
  palette: string;
  summary: string;
  detail: string;
  tags: string[];
};

export const categories: { id: "all" | WorkCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "character", label: "Character" },
  { id: "scene", label: "Scene" },
  { id: "series", label: "Series" },
  { id: "objects", label: "Objects" },
];

export const works: PortfolioWork[] = [
  {
    id: "neon-investigator",
    title: "Neon Investigator",
    category: "character",
    year: "2026",
    client: "Archive",
    palette: "#c9a36d",
    summary: "夜を歩くキャラクタースタディ。",
    detail:
      "コート、眼鏡、小さな荷物。街灯の下で性格が少し見えるようにまとめた習作です。",
    tags: ["character", "night", "study"],
  },
  {
    id: "sunny-archive",
    title: "Sunny Archive",
    category: "scene",
    year: "2026",
    client: "Archive",
    palette: "#8aa9ad",
    summary: "古書館と午後の光。",
    detail:
      "本、紙、窓辺の明るさ。静かな場所にだけ残る違和感を置いています。",
    tags: ["scene", "books", "light"],
  },
  {
    id: "dice-party",
    title: "Dice Party",
    category: "series",
    year: "2025",
    client: "Archive",
    palette: "#b8759b",
    summary: "複数人の空気を一枚に。",
    detail:
      "距離感、視線、手元。並んだ時の関係性が読めるように配置したビジュアルです。",
    tags: ["group", "mood", "visual"],
  },
  {
    id: "mystery-stickers",
    title: "Mystery Stickers",
    category: "objects",
    year: "2025",
    client: "Archive",
    palette: "#99d85b",
    summary: "小物だけのミニシリーズ。",
    detail:
      "鍵、カップ、紙片、ダイス。キャラクターの周辺にあるものを軽く描いたシリーズです。",
    tags: ["objects", "dice", "mini"],
  },
  {
    id: "cozy-occult-club",
    title: "Cozy Occult Club",
    category: "character",
    year: "2024",
    client: "Archive",
    palette: "#8ca8ff",
    summary: "オカルトクラブのキャラクター。",
    detail:
      "不穏なモチーフを、丸いシルエットと淡い色で中和したデザインです。",
    tags: ["character", "club", "soft"],
  },
  {
    id: "summer-ritual",
    title: "Summer Ritual",
    category: "scene",
    year: "2024",
    client: "Archive",
    palette: "#b98572",
    summary: "夏の気配と影。",
    detail:
      "夕方の温度感と、画面奥へ向かう小さな不安を同居させたシーンです。",
    tags: ["scene", "summer", "shadow"],
  },
];
