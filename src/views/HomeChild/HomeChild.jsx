import {
  Typography,
  Grid,
  Card,
  CardContent,
  AspectRatio,
  Button,
  Stack,
} from "@mui/joy";
import {
  Sparkles,
  Home as HomeIcon,
  Heart,
  Gamepad2,
  Camera,
} from "lucide-react";
import { useState } from "react";
import { ChildPersonalManualModal } from "./modal/ChildPersonalManualModal";
import { AdopterPostsModal } from "./modal/AdopterPosts";

export default function HomeChild() {
  const [openPersonalManualModal, setOpenPersonalManualModal] = useState(false);
  const [openAdopterPostsModal, setOpenAdopterPostsModal] = useState(false);

  const getId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.id;
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <header className="home-header">
          <div>
            <Typography
              level="h2"
              startDecorator={<Sparkles color="#FFD700" />}
            >
              Olá, sua jornada para um novo lar está cheia de novidades.
            </Typography>
          </div>
        </header>

        <Stack
          sx={{
            mb: 4,
            py: 3,
            px: 3,
            background: "linear-gradient(90deg, #FFF5F7 0%, #F0F7FF 100%)",
            borderRadius: "20px",
            border: "2px dashed #B8D8FF",
            textAlign: "left",
          }}
        >
          <Typography
            level="h4"
            sx={{
              color: "#4A5568",
              fontSize: "1.1rem",
              fontWeight: "500",
            }}
          >
            "O seu futuro está sendo preparado com muito carinho. Que tal
            conhecer um pouco mais sobre quem está te esperando?"
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          <Grid xs={12} md={6}>
            <Card
              variant="plain"
              sx={{
                height: "100%",
                boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                overflow: "hidden",
                "&:hover": { transform: "translateY(-5px)" },
                transition: "0.3s",
              }}
            >
              <AspectRatio ratio="21/9">
                <div
                  style={{
                    background: "linear-gradient(45deg, #528BDE, #8ECAE6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <HomeIcon size={64} color="white" />
                </div>
              </AspectRatio>
              <CardContent sx={{ p: 3 }}>
                <Typography level="title-lg" sx={{ fontSize: "1.5rem" }}>
                  Conheça sua Nova Família
                </Typography>
                <Typography level="body-md">
                  Veja fotos da casa, do seu futuro quarto, conheça os pets da
                  Família aqui!
                </Typography>
                <Button
                  variant="solid"
                  color="primary"
                  endDecorator="→"
                  sx={{ mt: 2, borderRadius: "md" }}
                  onClick={() => setOpenAdopterPostsModal(true)}
                >
                  Abrir Postagens
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={6}>
            <Card
              variant="plain"
              sx={{
                height: "100%",
                boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                overflow: "hidden",
                "&:hover": { transform: "translateY(-5px)" },
                transition: "0.3s",
              }}
            >
              <AspectRatio ratio="21/9">
                <div
                  style={{
                    background: "linear-gradient(45deg, #e91e63, #ff80ab)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Heart size={64} color="white" />
                </div>
              </AspectRatio>
              <CardContent sx={{ p: 3 }}>
                <Typography level="title-lg" sx={{ fontSize: "1.5rem" }}>
                  Diário de Mim Mesmo
                </Typography>
                <Typography level="body-md">
                  Conte para sua nova família quais são suas atividades e
                  comidas favoritas.
                </Typography>
                <Button
                  variant="solid"
                  color="danger"
                  endDecorator="→"
                  sx={{ mt: 2, borderRadius: "md" }}
                  onClick={() => setOpenPersonalManualModal(true)}
                >
                  Escrever no Diário
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card variant="outlined" color="primary">
              <CardContent>
                <Typography level="title-md" startDecorator={<Camera />}>
                  Fotos da Semana
                </Typography>
                <Typography level="body-xs">
                  Veja os momentos divertidos que sua nova família compartilhou
                  com você.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card variant="outlined" color="warning">
              <CardContent>
                <Typography level="title-md" startDecorator={<Gamepad2 />}>
                  Minha Rotina
                </Typography>
                <Typography level="body-xs">
                  Entenda como vai ser o seu dia a dia e seus horários.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card variant="outlined" color="success">
              <CardContent>
                <Typography level="title-md" startDecorator={<Sparkles />}>
                  Mensagens
                </Typography>
                <Typography level="body-xs">
                  Leia os recados enviados pela instituição e família.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <ChildPersonalManualModal
          open={openPersonalManualModal}
          setOpen={setOpenPersonalManualModal}
          childId={getId}
        />
        <AdopterPostsModal
          open={openAdopterPostsModal}
          setOpen={setOpenAdopterPostsModal}
        />
      </div>
    </div>
  );
}
