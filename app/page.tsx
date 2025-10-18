import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center content-center h-dvh p-3">
      <ModeToggle />
      <h1 className="text-6xl font-semibold">Hello World</h1>
      <p className="text-sm pt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam impedit repudiandae ex, temporibus magni voluptate quod similique suscipit nobis beatae voluptatibus commodi ipsum debitis labore eius nihil ducimus laborum! Cum?</p>
    </div>
  );
}
