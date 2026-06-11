import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    id: "1",
    title: "Contacto",
    tag: "Diagnóstico",
    content:
      "Primera reunión para conocer tu proyecto, entender tus necesidades y definir el alcance del trabajo.",
  },
  {
    id: "2",
    title: "Briefing",
    tag: "Estrategia",
    content:
      "Entiendo tu negocio, objetivos reales y el cliente que quieres atraer. Sin suposiciones — empezamos con preguntas.",
  },
  {
    id: "3",
    title: "Diseño",
    tag: "UX / UI",
    content:
      "Wireframes y mockups funcionales para validar la visión antes de escribir código. Lo que ves es lo que construimos.",
  },
  {
    id: "4",
    title: "Desarrollo",
    tag: "Código",
    content:
      "Construcción con las tecnologías adecuadas al proyecto: velocidad, SEO y escalabilidad desde el primer día.",
  },
  {
    id: "5",
    title: "Testeo",
    tag: "QA",
    content:
      "Pruebas exhaustivas en dispositivos reales para garantizar que todo funcione correctamente antes del lanzamiento.",
  },
  {
    id: "6",
    title: "Entrega",
    tag: "Lanzar",
    content:
      "Deploy, testing final, capacitación y soporte post-lanzamiento. Entregado — y funcionando.",
  },
];

export function Accordion05() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-14">
      <Accordion type="single" defaultValue="3" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="last:border-b">
            <AccordionTrigger className="text-left overflow-hidden duration-200 hover:no-underline cursor-pointer -space-y-6 data-[state=open]:space-y-0 [&>svg]:hidden">
              <div className="flex flex-1 items-start gap-4">
                <p className="text-xs font-bold text-[var(--orange)]">{item.id}</p>
                <h1 className="uppercase relative text-3xl md:text-5xl text-[var(--teal)]">
                  {item.title}
                </h1>
              </div>
            </AccordionTrigger>

            <AccordionContent className="text-muted-foreground text-base leading-snug pb-10">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
