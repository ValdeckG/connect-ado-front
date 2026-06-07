import {
  Typography,
  Grid,
  Card,
  CardContent,
  AspectRatio,
  Button,
  Stack,
} from "@mui/joy";
import { Camera, Heart, BookOpen, MessageSquare } from "lucide-react";
import { AdopterPostsModal } from "./modal/AdopterPosts";
import { useState } from "react";
import { ChildPersonalManualModal } from "./modal/ChildPersonalManualModal";

export default function HomeAdopter() {
  const [openAdopterPostsModal, setOpenAdopterPostsModal] = useState(false);
  const [openChildPersonalManualModal, setOpenChildPersonalManualModal] =
    useState(false);
  return (
    <div
      className="container"
      style={{ alignItems: "flex-start", paddingTop: "40px" }}
    >
      <div
        className="home-content"
        style={{ width: "100%", maxWidth: "1000px", margin: "0 auto" }}
      >
        <header style={{ marginBottom: "32px" }}>
          <Typography level="h2">
            Olá, sua ponte para uma nova história começa aqui!
          </Typography>
        </header>

        <Stack
          sx={{
            mb: 4,
            py: 3,
            px: 2,
            backgroundColor: "#e5e8ee",
            borderRadius: "12px",
            borderLeft: "5px solid #528BDE",
            textAlign: "left",
          }}
        >
          <Typography
            level="h4"
            sx={{
              color: "#2d4a53",
              fontSize: "1.2rem",
              fontWeight: "500",
              lineHeight: "1.4",
            }}
          >
            "Cada detalhe que você prepara hoje constrói a confiança de quem
            chegará amanhã."
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card
              variant="white"
              sx={{
                height: "100%",
                cursor: "pointer",
                "&:hover": { transform: "scale(1.02)" },
                transition: "0.3s",
              }}
            >
              <AspectRatio ratio="2/1">
                <div
                  style={{
                    background: "linear-gradient(45deg, #4a90e2, #de318d)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Camera size={48} color="white" />
                </div>
              </AspectRatio>
              <CardContent>
                <Typography level="title-lg">Guia do Novo Lar</Typography>
                <Typography level="body-sm">
                  Apresente a casa, os pets e a rotina da família para reduzir a
                  ansiedade da criança.
                </Typography>
                <Button
                  variant="plain"
                  endDecorator="→"
                  sx={{ mt: 2, p: 0 }}
                  onClick={() => setOpenAdopterPostsModal(true)}
                >
                  Atualizar Guia
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={6}>
            <Card
              variant="white"
              sx={{
                height: "100%",
                cursor: "pointer",
                "&:hover": { transform: "scale(1.02)" },
                transition: "0.3s",
              }}
            >
              <AspectRatio ratio="2/1">
                <div
                  style={{
                    background: "linear-gradient(45deg, #de318d, #ffcc33)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Heart size={48} color="white" />
                </div>
              </AspectRatio>
              <CardContent>
                <Typography level="title-lg">Manual de Mim Mesmo</Typography>
                <Typography level="body-sm">
                  Descubra o que a criança gosta de comer, seus medos e as
                  músicas favoritas para dormir.
                </Typography>
                <Button
                  variant="plain"
                  endDecorator="→"
                  sx={{ mt: 2, p: 0 }}
                  onClick={() => setOpenChildPersonalManualModal(true)}
                >
                  Ler Manual
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography level="title-md" startDecorator={<BookOpen />}>
                  Histórico Escolar/Saúde
                </Typography>
                <Typography level="body-xs">
                  Acesse vacinas, alergias e nível escolar validados pela
                  instituição.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography level="title-md" startDecorator={<MessageSquare />}>
                  Acompanhamento
                </Typography>
                <Typography level="body-xs">
                  Conte para a instituição como está sendo a adaptação e o que
                  mudou.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <AdopterPostsModal
        open={openAdopterPostsModal}
        setOpen={setOpenAdopterPostsModal}
      />
      <ChildPersonalManualModal
        open={openChildPersonalManualModal}
        setOpen={setOpenChildPersonalManualModal}
      />
    </div>
  );
}
