import Image from "next/image";

/**
 * Componente que apila tres imágenes de pisos para formar el edificio corporativo.
 * Las imágenes deben estar en /public y se apilan de abajo hacia arriba.
 * El piso 2 define la altura principal.
 */
export default function EdificioCorporativo() {
  return (
    <div
      className="flex flex-col items-end justify-end h-[85vh] mt-56 select-none relative drop-shadow-lg"
      style={{ pointerEvents: "none" }} // evita que el edificio bloquee clicks
    >
      {/* Piso 3 (arriba) */}
      <Image
        src="/piso-3-min.png"
        alt="Piso 3"
        width={500}
        height={180}
        style={{ objectFit: "contain", width: "auto", maxHeight: "30vh", zIndex: 3 }}
        priority
        className="relative"
      />
      {/* Piso 2 (medio, define altura) */}
      <Image
        src="/piso-2-min.png"
        alt="Piso 2"
        width={500}
        height={340}
        style={{ objectFit: "contain", width: "auto", maxHeight: "45vh", zIndex: 2, marginTop: -30 }}
        priority
        className="relative"
      />
      {/* Piso 2 (medio, define altura) */}
      <Image
        src="/piso-2-min.png"
        alt="Piso 2"
        width={500}
        height={340}
        style={{ objectFit: "contain", width: "auto", maxHeight: "45vh", zIndex: 2, marginTop: -30 }}
        priority
        className="relative"
      />
      {/* Piso 1 (abajo) */}
      <Image
        src="/piso-1-min.png"
        alt="Piso 1"
        width={600}
        height={180}
        style={{ objectFit: "contain", width: "auto", maxHeight: "33vh", zIndex: 1, marginTop: -25 }}
        priority
        className="relative"
      />
    </div>
  );
}
