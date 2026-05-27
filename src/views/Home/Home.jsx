import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
  AspectRatio,
  Container,
  Box,
  IconButton,
} from "@mui/joy";
import {
  Heart,
  ShieldCheck,
  Users,
  Home as HomeIcon,
  ChevronRight,
  Sparkles,
  Check,
  HelpCircle, // Importado para o ícone do bloco de FAQ
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "background.body", minHeight: "100vh" }}>
      <Box
        sx={{
          pt: { xs: 10, md: 15 },
          pb: { xs: 8, md: 10 },
          background:
            "radial-gradient(circle at top right, #fdf2f8, #f0f7ff, #ffffff)",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <img
            src="/images/icon.png"
            alt="connectAdo"
            style={{ height: "60px", marginBottom: "24px" }}
          />

          <Typography
            level="h1"
            sx={{
              fontSize: { xs: "2.6rem", md: "3.8rem" },
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 3,
              color: "#242424",
            }}
          >
            A tecnologia a serviço do{" "}
            <span style={{ color: "#de318d" }}>afeto</span>.
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              mb: 5,
              color: "text.secondary",
              fontSize: "1.2rem",
              maxWidth: "700px",
              mx: "auto",
            }}
          >
            O <strong>connectAdo</strong> facilita a troca de informações e
            rotinas entre instituições, adotantes and crianças, tornando o
            processo de adoção mais humano e transparente.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              size="lg"
              variant="solid"
              sx={{
                bgcolor: "#528BDE",
                px: 4,
                borderRadius: "md",
                "&:hover": { bgcolor: "#3d6fb3" },
              }}
              onClick={() => navigate("/login")}
            >
              Começar minha jornada
            </Button>
            <Button
              size="lg"
              variant="outlined"
              color="neutral"
              sx={{ borderRadius: "md" }}
              onClick={() =>
                document
                  .getElementById("funcionalidades")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Conhecer o portal
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container id="funcionalidades" sx={{ py: 10 }}>
        <Typography
          level="h2"
          textAlign="center"
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Um ambiente preparado para todos
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Instituições",
              desc: "Controle sobre o histórico de saúde, educação e o progresso da harmonização.",
              icon: <HomeIcon size={32} />,
              color: "primary",
              features: [
                "Gestão de Acolhidos",
                "Prontuário Digital",
                "Match de Famílias",
              ],
            },
            {
              title: "Adotantes",
              desc: "Prepare o lar compartilhando rotinas e recebendo orientações da instituição.",
              icon: <Users size={32} />,
              color: "danger",
              features: [
                "Guia do Novo Lar",
                "Diário de Adaptação",
                "Acesso a Manuais",
              ],
            },
            {
              title: "Crianças",
              desc: "Espaço lúdico para conhecer o novo ambiente e as pessoas que as esperam.",
              icon: <Sparkles size={32} />,
              color: "warning",
              features: [
                "Postagens da família",
                "Diário de Mim Mesmo",
                "Mensagens de Carinho",
              ],
            },
          ].map((item, i) => (
            <Grid xs={12} md={4} key={i}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  borderRadius: "xl",
                  transition: "0.3s",
                  "&:hover": { boxShadow: "lg", transform: "translateY(-4px)" },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 2 }}>
                  <IconButton
                    variant="soft"
                    color={item.color}
                    size="lg"
                    sx={{ mb: 2, borderRadius: "lg" }}
                  >
                    {item.icon}
                  </IconButton>
                  <Typography level="title-lg" sx={{ mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography level="body-sm" sx={{ mb: 3 }}>
                    {item.desc}
                  </Typography>
                  <Divider inset="none" sx={{ my: 2 }} />
                  <Stack spacing={1.5}>
                    {item.features.map((f, idx) => (
                      <Stack
                        key={idx}
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Check size={16} color="#528BDE" />
                        <Typography level="body-xs" sx={{ fontWeight: 600 }}>
                          {f}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: "#2d4a53", py: 10, color: "white" }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid xs={12} md={6}>
              <Typography
                level="h2"
                sx={{ color: "white", mb: 3, fontWeight: 700 }}
              >
                Segurança é nossa base, <br /> Afeto é nosso guia.
              </Typography>
              <Stack spacing={4}>
                <Box>
                  <Typography
                    level="title-md"
                    startDecorator={<ShieldCheck color="#528BDE" />}
                    sx={{ color: "white", mb: 1 }}
                  >
                    Privacidade Total
                  </Typography>
                  <Typography
                    level="body-sm"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Dados criptografados e acesso restrito a perfis validados
                    pelas instituições.
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    level="title-md"
                    startDecorator={<Heart color="#de318d" />}
                    sx={{ color: "white", mb: 1 }}
                  >
                    Foco na Criança
                  </Typography>
                  <Typography
                    level="body-sm"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Interface lúdica pensada para reduzir a ansiedade durante a
                    transição.
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              {/* Imagem de Harmonização */}
              <AspectRatio
                ratio="4/3"
                sx={{
                  borderRadius: "24px",
                  boxShadow: "2xl",
                  overflow: "hidden",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1200"
                  alt="Processo de Harmonização Familiar"
                  style={{ objectFit: "cover" }}
                />
              </AspectRatio>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          bgcolor: "background.surface",
          py: 8,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Stack spacing={2} alignItems="center">
            <Box
              sx={{
                p: 1.5,
                borderRadius: "full",
                display: "inline-flex",
              }}
            >
              <HelpCircle size={28} className="btn-submit" />
            </Box>
            <Typography level="h3" sx={{ fontWeight: 700 }}>
              Ficou com alguma dúvida?
            </Typography>
            <Typography
              level="body-md"
              sx={{ color: "text.secondary", maxW: "450px", mx: "auto", mb: 1 }}
            >
              Preparamos uma central completa com perguntas frequentes sobre o
              connectAdo, o estágio de convivência e a transição do acolhido
              para o novo lar.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              size="md"
              onClick={() => navigate("/faq")}
              endDecorator={<ChevronRight size={18} />}
              sx={{ borderRadius: "md", px: 3 }}
            >
              Acessar nossa Central de FAQ
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* --- CTA Final --- */}
      <Container sx={{ py: 12, textAlign: "center" }}>
        <Typography level="h2" sx={{ mb: 4 }}>
          Pronto para fazer parte dessa história?
        </Typography>
        <Button
          size="lg"
          variant="solid"
          sx={{
            bgcolor: "#de318d",
            px: 6,
            borderRadius: "md",
            "&:hover": { bgcolor: "#c21a73" },
          }}
          onClick={() => navigate("/login")}
          endDecorator={<ChevronRight />}
        >
          Acessar o connectAdo
        </Button>
      </Container>
    </Box>
  );
}
