import ObjectDetection from "@/components/object-detection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="gradient-title font-extrabold text-3xl md:text-6xl lg:text-8xl tracking-tighter md:px-6 text-center">
        Object Detector
      </h1>

      <ObjectDetection />

      <h2 className="gradient-title p-8 text-3xl md:text-4xl lg:text-5xl tracking-tighter md:px-6">
        Objects it can detect - <a href="https://github.com/anish2210/Object-Detector?tab=readme-ov-file#display-names">Click to know</a>
      </h2>
    </main>
  );
}
