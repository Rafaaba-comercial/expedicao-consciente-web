import planetAutoconhecimento from "@/assets/planetas/planet-autoconhecimento.png";
import planetCoragem from "@/assets/planetas/planet-coragem.png";
import planetBomHumor from "@/assets/planetas/planet-bomhumor.png";
import planetAutoestima from "@/assets/planetas/planet-autoestima.png";
import planetPerseveranca from "@/assets/planetas/planet-perseveranca.png";
import planetEmpatia from "@/assets/planetas/planet-empatia.png";
import planetOtimismo from "@/assets/planetas/planet-otimismo.png";
import planetCriatividade from "@/assets/planetas/planet-criatividade.png";

import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import avatar5 from "@/assets/avatar-5.png";

export type Planet = {
  id: string;
  name: string;
  image: string;
  /** Hue color for orbit ring & glow */
  color: string;
};

export const PLANETS: Planet[] = [
  { id: "autoconhecimento", name: "Autoconhecimento", image: planetAutoconhecimento, color: "184 62% 52%" },
  { id: "coragem", name: "Coragem", image: planetCoragem, color: "18 78% 58%" },
  { id: "bomhumor", name: "Bom Humor", image: planetBomHumor, color: "42 88% 60%" },
  { id: "autoestima", name: "Autoestima", image: planetAutoestima, color: "8 82% 68%" },
  { id: "perseveranca", name: "Perseverança", image: planetPerseveranca, color: "260 60% 65%" },
  { id: "empatia", name: "Empatia", image: planetEmpatia, color: "340 70% 65%" },
  { id: "otimismo", name: "Otimismo", image: planetOtimismo, color: "48 90% 62%" },
  { id: "criatividade", name: "Criatividade", image: planetCriatividade, color: "200 75% 60%" },
];

export type Team = {
  id: string;
  name: string;
  avatar: string;
  score: number;
};

export const TEAMS: Team[] = [
  { id: "t1", name: "Helena", avatar: avatar1, score: 50 },
  { id: "t2", name: "Mateus", avatar: avatar2, score: 25 },
  { id: "t3", name: "Aiyana", avatar: avatar3, score: 30 },
  { id: "t4", name: "Joaquim", avatar: avatar4, score: 40 },
  { id: "t5", name: "Sora", avatar: avatar5, score: 40 },
];
