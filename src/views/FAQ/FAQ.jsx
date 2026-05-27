import { useState } from "react";
import {
  Typography,
  Sheet,
  Box,
  Stack,
  Input,
  AccordionGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/joy";
import {
  HelpCircle,
  Search as SearchIcon,
  HelpCircle as FaqIcon,
} from "lucide-react";
import { faqData } from "./mock/faqData";

export function FAQ() {
  const [search, setSearch] = useState("");

  const filteredFaq = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="home-container">
      <div className="home-content">
        <header className="home-header" style={{ marginBottom: "24px" }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                p: 1,
                bgcolor: "primary.softBg",
                borderRadius: "md",
                display: "flex",
              }}
            >
              <FaqIcon size={28} color="var(--joy-palette-primary-solidBg)" />
            </Box>
            <div>
              <Typography level="h2">Central de Ajuda & FAQ</Typography>
              <Typography level="body-lg">
                Tire suas dúvidas sobre o sistema connectAdo, transição para o
                novo lar e fase final da adoção.
              </Typography>
            </div>
          </Stack>
        </header>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Input
            placeholder="Digite uma palavra-chave ou dúvida..."
            startDecorator={<SearchIcon size={20} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
        </Stack>

        <Sheet
          variant="outlined"
          sx={{
            borderRadius: "md",
            p: 3,
            bgcolor: "background.surface",
            boxShadow: "sm",
          }}
        >
          {filteredFaq.length === 0 ? (
            <Typography
              level="body-md"
              sx={{ textAlign: "center", color: "neutral.500", py: 4 }}
            >
              Nenhuma pergunta correspondente à sua pesquisa foi encontrada.
            </Typography>
          ) : (
            <AccordionGroup
              variant="plain"
              size="lg"
              sx={{
                maxWidth: "100%",
                transition: "0.2s",
                "& .MuiAccordion-root": {
                  borderRadius: "sm",
                  mb: 1.5,
                  border: "1px solid",
                  borderColor: "neutral.outlinedBorder",
                  bgcolor: "background.body",
                  "&[data-expanded]": {
                    borderColor: "primary.outlinedBorder",
                    bgcolor: "primary.softBg",
                    boxShadow: "sm",
                  },
                },
              }}
            >
              {filteredFaq.map((item) => (
                <Accordion key={item.id}>
                  <AccordionSummary
                    slotProps={{
                      button: {
                        sx: { fontWeight: "md" },
                      },
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <HelpCircle size={18} style={{ opacity: 0.7 }} />
                      <Typography level="title-md" component="span">
                        {item.question}
                      </Typography>
                    </Stack>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Box sx={{ p: 1, pt: 0 }}>
                      <Typography
                        level="body-md"
                        sx={{ color: "neutral.700", lineHeight: "1.6" }}
                      >
                        {item.answer}
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionGroup>
          )}
        </Sheet>
      </div>
    </div>
  );
}
